import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { saveBookmark, getBookmarks } from '../utils/bookmarkNews'; // Modify the utils to handle AsyncStorage
import Share from 'react-native-share'; 
import Icon from 'react-native-vector-icons/Ionicons'; 
import AsyncStorage from '@react-native-async-storage/async-storage';
import { OfflineBanner } from '../components/OfflineBanner/OfflineBanner';
type NewsItem = {
  title: string;
  description: string;
  url: string;
  image: string | null;
  publishedAt: string;
};

type NewsDetailProps = {
  route: any;
  navigation: any;
};

const NewsDetail: React.FC<NewsDetailProps> = ({ route, navigation }) => {
  const { item } = route.params;
  const [bookmarked, setBookmarked] = useState<boolean>(false);

  // Check if the item is already bookmarked
  useEffect(() => {
    const checkBookmark = async () => {
      const bookmarks = await getBookmarks();
      const isBookmarked = bookmarks.some((bookmark: NewsItem) => bookmark.url === item.url);
      setBookmarked(isBookmarked);
    };
    checkBookmark();
  }, [item]);

  const handleBookmark = async () => {
    try {
      const bookmarks = await getBookmarks();
      const isAlreadyBookmarked = bookmarks.some((bookmark: NewsItem) => bookmark.url === item.url);

      if (isAlreadyBookmarked) {
        // Remove from bookmarks
        const updatedBookmarks = bookmarks.filter((bookmark: NewsItem) => bookmark.url !== item.url);
        await AsyncStorage.setItem('bookmarks', JSON.stringify(updatedBookmarks));
        setBookmarked(false);
      } else {
        // Add to bookmarks
        const updatedBookmarks = [...bookmarks, item];
        await AsyncStorage.setItem('bookmarks', JSON.stringify(updatedBookmarks));
        setBookmarked(true);
      }
    } catch (error) {
      console.error("Error handling bookmark:", error);
    }
  };

  const handleShare = async () => {
    try {
      const shareOptions = {
        title: item.title,
        message: `${item.title}\n\n${item.description}`,
        url: item.url,
        social: Share.Social.EMAIL,
        failOnCancel: false,
      };
      if (item.image) {
        shareOptions['url'] = item.image;
      }
      await Share.open(shareOptions);
    } catch (error) {
      console.error("Error sharing article:", error);
    }
  };

  return (
    <View style={styles.container}>
        <OfflineBanner/>
      <Image source={{ uri: item.image || 'https://placehold.jp/150x150.png' }} style={styles.image} />
      <Text style={styles.date}>{item.publishedAt}</Text>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>{item.description}</Text>

      <View style={styles.actionButtons}>
        <TouchableOpacity
          style={[styles.button, bookmarked ? styles.buttonBookmarked : {}]}
          onPress={handleBookmark}
        >
          <Icon name={bookmarked ? 'bookmark' : 'bookmark-outline'} size={24} color="#FF8C32" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleShare}>
          <Icon name="share-social-outline" size={24} color="#FF8C32" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 8,
  },
  date: {
    fontSize: 12,
    color: '#626262',
    marginTop: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2C3131',
    marginTop: 16,
  },
  description: {
    fontSize: 16,
    color: '#626262',
    marginTop: 8,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#F4F4F4',
    alignItems: 'center',
    justifyContent: 'center',
    width: '48%',
  },
  buttonBookmarked: {
    backgroundColor: '#FF8C32',
  },
});

export default NewsDetail;
