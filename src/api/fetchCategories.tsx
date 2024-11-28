import axios from 'axios';
import { Alert } from 'react-native';
import { API_KEY,BASE_URL } from '../constants/api';

export const getCategories = async (categories:string) => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        access_key: API_KEY,
        countries: 'in',
        categories: categories
      },
    });
    return response.data.data;
  } catch (error) {
    Alert.alert("There was an error while fetching news");
    throw error;
  }
};
