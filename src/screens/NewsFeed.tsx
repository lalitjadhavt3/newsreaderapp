import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {SOURCES} from '../constants/sources';
import {getHeadlinesBySource} from '../api/fetchNews';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../types/navigationParams';
import {OfflineContext} from '../context/OfflineContext';
import {getCachedNews, saveNewsCache} from '../utils/cachedNews';
import {OfflineBanner} from '../components/OfflineBanner/OfflineBanner';
export type NewsItem = {
  title: string;
  description: string;
  url: string;
  image: string | null;
  publishedAt: string;
};

type Source = {
  name: string;
  image: any;
  title: string;
};
export type NewsFeedNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'NewsFeed'
>;

const NewsFeed: React.FC = () => {
  const [selectedSource, setSelectedSource] = useState<string>('');
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false); // For pull to refresh
  const navigation = useNavigation<NewsFeedNavigationProp>();
  const isOffline = useContext(OfflineContext);
  const fetchNews = async (source: string) => {
    try {
      setLoading(true);
      const response = await getHeadlinesBySource(source || '');
      await saveNewsCache(response);
      setNews(response);
    } catch (error) {
      console.error('Error fetching news:', error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    const fetchNews = async () => {
      if (isOffline) {
        // Fetch cached news if offline
        const cachedNews = await getCachedNews();
        const modifiedNews = cachedNews.map((item: any) => ({
          ...item,
          image: '../assets/placeholder.png',
        }));
        setNews(modifiedNews);
        setLoading(false);
      } else {
        // Fetch live news if online
        try {
          const response = await getHeadlinesBySource('general');
          setNews(response);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching news:', error);
        }
      }
    };

    fetchNews();
  }, [isOffline]);
  const onRefresh = () => {
    setRefreshing(true);
    fetchNews(selectedSource); // Fetch the news again
    setRefreshing(false);
    setLoading(false);
  };
  useEffect(() => {
    fetchNews(selectedSource);
  }, [selectedSource]);

  const renderNewsItem = ({item}: {item: NewsItem}) => {
    return (
      <TouchableOpacity
        style={styles.newsCard}
        onPress={() => navigation.navigate('NewsDetail', {item})}>
        <View style={styles.newsItem}>
          {isOffline ? (
            <Image
              source={require('../assets/images/placeholder.png')}
              style={styles.newsImage}
            />
          ) : (
            <Image
              source={{
                uri: item.image
                  ? item.image
                  : 'https://placehold.jp/150x150.png',
              }}
              style={styles.newsImage}
            />
          )}

          <View style={styles.newsContent}>
            <Text style={styles.newsTitle}>
              {item.title.length > 45
                ? item.title.substring(0, 45) + '...'
                : item.title}
            </Text>
            <Text style={styles.newsDescription}>
              {item.description.length > 100
                ? item.description.substring(0, 100) + '...'
                : item.description}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const renderSourceItem = (sourceKey: string, source: Source) => (
    <TouchableOpacity
      style={[
        styles.sourceButton,
        selectedSource === sourceKey ? styles.selectedSource : {},
      ]}
      onPress={() => setSelectedSource(source.name)}
      key={sourceKey}>
      <View style={styles.imageContainer}>
        <Image source={source.image} style={styles.sourceIcon} />
      </View>
      <Text style={styles.sourceName}>{source.title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {isOffline && (
        <>
          <OfflineBanner />
          {news?.length > 0 ? (
            <FlatList
              data={news}
              keyExtractor={item => item.url}
              renderItem={renderNewsItem}
              contentContainerStyle={styles.newsList}
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          ) : (
            <View style={styles.container}>
              <Text style={styles.header}>
                There are no contents to display
              </Text>
            </View>
          )}
        </>
      )}
      {loading ? (
        <ActivityIndicator
          size="large"
          color="#FF8C32"
          style={styles.loadingIndicator}
        />
      ) : (
        <View>
          <Text style={styles.header}>Select News Source</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.sourcesContainer}>
            {Object.keys(SOURCES).map(key => {
              const source = SOURCES[key as keyof typeof SOURCES];
              return renderSourceItem(key, source);
            })}
          </ScrollView>
          <FlatList
            data={news}
            keyExtractor={item => item.url}
            renderItem={renderNewsItem}
            contentContainerStyle={styles.newsList}
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        </View>
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
  sourcesContainer: {
    paddingVertical: 8,
    marginBottom: 16,
    minHeight: 150,
  },
  sourceButton: {
    alignItems: 'center',
    marginHorizontal: 10,
  },
  selectedSource: {
    borderWidth: 2,
    borderColor: '#FF8C32',
    padding: 5,
    borderRadius: 8,
  },
  imageContainer: {
    width: 80,
    height: 80,

    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sourceIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderColor: 'red',
    borderWidth: 2,
  },
  sourceName: {
    fontSize: 14,
    color: '#2C3131',
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
  loadingIndicator: {
    marginTop: 16,
    alignSelf: 'center',
  },
});

export default NewsFeed;
