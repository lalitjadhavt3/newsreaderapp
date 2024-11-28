import axios from 'axios';
import { Alert } from 'react-native';
import { API_KEY,BASE_URL } from '../constants/api';
export const getHeadlinesBySource = async (sources: string = '') => {
  try {
    const params = {
      access_key: API_KEY,
      countries: 'in',
      ...(sources && { sources }), // Only include 'sources' if provided
    };
    const response = await axios.get(BASE_URL, { params });
    return response.data.data;
  } catch (error) {
    Alert.alert("There was an error while fetching news");
    throw new Error('Failed to fetch news data');
  }
};
