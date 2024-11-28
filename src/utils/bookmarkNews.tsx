// utils/bookmarkNews.ts

import AsyncStorage from '@react-native-async-storage/async-storage';
import { NewsItem } from '../screens/NewsFeed';

// Save a news item to the bookmarks
export const saveBookmark = async (item: NewsItem) => {
  try {
    const storedBookmarks = await AsyncStorage.getItem('bookmarks');
    const bookmarks = storedBookmarks ? JSON.parse(storedBookmarks) : [];
    const isAlreadyBookmarked = bookmarks.some((bookmark: NewsItem) => bookmark.url === item.url);
    if (!isAlreadyBookmarked) {
      const updatedBookmarks = [...bookmarks, item];
      await AsyncStorage.setItem('bookmarks', JSON.stringify(updatedBookmarks));
    }
  } catch (error) {
    console.error('Error saving bookmark:', error);
  }
};

// Get all bookmarked news
export const getBookmarks = async () => {
  try {
    const storedBookmarks = await AsyncStorage.getItem('bookmarks');
    return storedBookmarks ? JSON.parse(storedBookmarks) : [];
  } catch (error) {
    console.error('Error retrieving bookmarks:', error);
    return [];
  }
};
