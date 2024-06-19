import axios from 'axios';

const apiUrl = process.env.EXPO_PUBLIC_API_URL;

const client = axios.create({
  baseURL: apiUrl,
  headers: {
    'Content-Type': 'application/json',
    // Authorization: `Bearer ${process.env.EXPO_PUBLIC_API_KEY}`,
  },
});

export default client;
