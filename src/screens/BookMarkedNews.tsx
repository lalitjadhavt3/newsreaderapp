import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { getBookmarks } from '../utils/bookmarkNews'; // Utility to fetch bookmarked news
import { RootStackParamList } from '../types/navigationParams';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { OfflineBanner } from '../components/OfflineBanner/OfflineBanner';
import { Alert } from 'react-native';

type NewsItem = {
  title: string;
  description: string;
  url: string;
  image: string | null;
  publishedAt: string;
};

type BookmarkedNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Bookmarks'>;

const BookmarkedNews: React.FC = () => {
  const [bookmarks, setBookmarks] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const navigation = useNavigation<BookmarkedNavigationProp>();

  const fetchBookmarkedNews = async () => {
    try {
      setLoading(true);
      const savedBookmarks = await getBookmarks();
      setBookmarks(savedBookmarks);
    } catch (error) {
      Alert.prompt('Error fetching bookmarked news:');
    } finally {
      setLoading(false);
    }
  };

  // Use `useFocusEffect` to trigger fetch when the screen is focused
  useFocusEffect(
    useCallback(() => {
      fetchBookmarkedNews();
    }, [])
  );

  const renderNewsItem = ({ item }: { item: NewsItem }) => (
    <TouchableOpacity
      style={styles.newsCard}
      onPress={() => navigation.navigate('NewsDetail', { item })}
    >
      <View style={styles.newsItem}>
        <Image
          source={{ uri: item.image || 'https://placehold.jp/150x150.png' }}
          style={styles.newsImage}
        />
        <View style={styles.newsContent}>
          <Text style={styles.newsTitle}>
            {item.title.length > 45 ? `${item.title.substring(0, 45)}...` : item.title}
          </Text>
          <Text style={styles.newsDescription}>
            {item.description.length > 100
              ? `${item.description.substring(0, 100)}...`
              : item.description}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
        <OfflineBanner/>
      <Text style={styles.header}>Bookmarked News</Text>
      {loading ? (
        <Text style={styles.loadingText}>Loading...</Text>
      ) : bookmarks.length > 0 ? (
        <FlatList
          data={bookmarks}
          keyExtractor={(item) => item.url}
          renderItem={renderNewsItem}
          contentContainerStyle={styles.newsList}
        />
      ) : (
        <Text style={styles.noBookmarksText}>No bookmarks yet!</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: '#626262',
    textAlign: 'center',
    marginTop: 16,
  },
  noBookmarksText: {
    fontSize: 16,
    color: '#626262',
    textAlign: 'center',
    marginTop: 16,
  },
  newsList: {
    paddingBottom: 16,
  },
  newsCard: {
    marginBottom: 12,
  },
  newsItem: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#E9E9E9',
    borderRadius: 8,
  },
  newsImage: {
    width: '30%',
    height: 100,
    borderRadius: 8,
    marginRight: 16,
  },
  newsContent: {
    width: '70%',
  },
  newsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2C3131',
    flexShrink: 1,
  },
  newsDescription: {
    fontSize: 14,
    marginTop: 8,
    color: '#626262',
    flexShrink: 1,
  },
});

export default BookmarkedNews;
