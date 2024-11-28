import AsyncStorage from '@react-native-async-storage/async-storage';

// Save cached news
export const saveNewsCache = async (news: any[]) => {
  try {
    await AsyncStorage.setItem('cachedNews', JSON.stringify(news));
  } catch (error) {
    console.error('Error saving cached news:', error);
  }
};

// Get cached news
export const getCachedNews = async () => {
  try {
    const cachedNews = await AsyncStorage.getItem('cachedNews');
    return cachedNews ? JSON.parse(cachedNews) : [];
  } catch (error) {
    console.error('Error fetching cached news:', error);
    return [];
  }
};
