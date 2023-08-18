import axios from 'axios';

const API_BASE_URL = '/api'; // Assuming your backend is serving the API at /api

// const SAVE_USER_ENDPOINT = `/api/saveUser`;
const ADD_TO_WATCHLIST_ENDPOINT = `/api/addToWatchlist`;

export const saveUserAfterLogin = async (userData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/saveUser`, userData);
    return response.data;
  } catch (error) {
    console.error('Error saving user:', error);
    throw error;
  }
};

export const addToWatchlist = async (userId, stockData) => {
  try {
    const response = await axios.post(`${ADD_TO_WATCHLIST_ENDPOINT}/${userId}`, stockData);
    return response.data;
  } catch (error) {
    console.error('Error adding stock to watchlist:', error);
    throw error;
  }
};