import axios from 'axios';

const API_KEY = 'f08b6fdfd2103cf17c335f4d5aa4ab2c'; 
const BASE_URL = 'http://api.mediastack.com/v1/news';

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
    console.error('Error fetching news:', error);
    throw error;
  }
};
