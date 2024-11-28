import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ScrollView, TouchableOpacity, Image, StyleSheet, ActivityIndicator } from 'react-native';
import { useNavigation, RouteProp } from '@react-navigation/native'; // For navigation
import CATEGORY_MAPPING from '../constants/categories';
import { getCategories } from '../api/fetchCategories';
import { NewsFeedNavigationProp, NewsItem } from './NewsFeed';
import { OfflineBanner } from '../components/OfflineBanner/OfflineBanner';

interface CategoryNewsProps {
  route: RouteProp<{ params: { category: string } }, 'params'>;
}

const CategoryNews = ({ route }: CategoryNewsProps) => {
  const { category: initialCategory } = route.params;
  const navigation = useNavigation<NewsFeedNavigationProp>();
  const [state, setState] = useState<{
    selectedCategory: string;
    news: NewsItem[];
    loading: boolean;
    error: string | null;
  }>({
    selectedCategory: initialCategory || '',
    news: [],
    loading: true,
    error: null,
  });

  const fetchNews = async (category: string) => {
    try {
      setState((prevState) => ({ ...prevState, loading: true, error: null }));
      const response = await getCategories(category); // Assuming response is an array of NewsItem
      setState((prevState) => ({
        ...prevState,
        news: response || [],
        loading: false,
      }));
    } catch (error) {
      setState((prevState) => ({ ...prevState, error: 'Failed to load news.', loading: false }));
    }
  };

  useEffect(() => {
    fetchNews(state.selectedCategory);
  }, [state.selectedCategory]);

  const handleCategoryPress = (category: string) => {
    if (category !== state.selectedCategory) {
      setState((prevState) => ({ ...prevState, selectedCategory: category }));
    }
  };



  const renderNewsItem = ({ item }: { item: NewsItem }) => (
    <TouchableOpacity onPress={() =>navigation.navigate('NewsDetail', { item })}>
      <View style={styles.newsCard}>
        <View style={styles.newsImageContainer}>
          <Image
            source={{ uri: item.image || 'https://placehold.jp/150x150.png' }}
            style={styles.newsImage}
          />
        </View>
        <View style={styles.newsTextContainer}>
          <Text style={styles.newsTitle}>
            {item.title.length > 45 ? item.title.substring(0, 45) + '...' : item.title}
          </Text>
          <Text style={styles.newsDescription}>
            {item.description.length > 100 ? item.description.substring(0, 100) + '...' : item.description}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const { selectedCategory, news, loading, error } = state;

  return (
    <View style={styles.container}>
        <OfflineBanner/>
      <ScrollView horizontal style={styles.categoryScroll} showsHorizontalScrollIndicator={false}>
        {Object.keys(CATEGORY_MAPPING).map((cat) => (
          <TouchableOpacity
            key={cat}
            style={[styles.categoryButton, cat === selectedCategory && styles.activeCategory]}
            onPress={() => handleCategoryPress(cat)}
          >
            <Text style={[styles.categoryButtonText, cat === selectedCategory && styles.activeCategoryText]}>
              {CATEGORY_MAPPING[cat]}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {loading && !error ? (
        <ActivityIndicator size="large" color="#FF8C32" style={styles.loadingIndicator} />
      ) : error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : (
        <FlatList
          data={news}
          keyExtractor={(item) => item.url}
          renderItem={renderNewsItem}
          contentContainerStyle={styles.newsList}
          initialNumToRender={5}
          removeClippedSubviews={true}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  categoryScroll: {
    paddingVertical: 8,
    backgroundColor: '#FFB165',
    maxHeight:55,
    minHeight:55,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginHorizontal: 4,
    borderRadius: 20,
    backgroundColor: '#FFF1D6',
  },
  activeCategory: {
    backgroundColor: '#FF8C32',
  },
  categoryButtonText: {
    fontSize: 14,
    color: '#2C3131',
  },
  activeCategoryText: {
    color: '#FFFFFF',
  },
  newsList: {
    padding: 16,
  },
  newsCard: {
    flexDirection: 'row',
    padding: 16,
    marginBottom: 12,
    backgroundColor: '#E9E9E9',
    borderRadius: 8,
  },
  newsImageContainer: {
    flex: 1,
    marginRight: 12,
  },
  newsImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    resizeMode: 'cover',
  },
  newsTextContainer: {
    flex: 3,
  },
  newsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2C3131',
  },
  newsDescription: {
    fontSize: 14,
    marginTop: 8,
    color: '#626262',
  },
  loadingIndicator: {
    marginTop: 16,
  },
  errorText: {
    textAlign: 'center',
    marginTop: 16,
    fontSize: 16,
    color: '#E25C5C',
  },
});

export default CategoryNews;
