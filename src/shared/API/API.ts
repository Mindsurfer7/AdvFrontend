import axios from 'axios';
import { USER_LOCALSTORAGE_KEY } from 'shared/const/localstorage';

const baseURL = IS_DEV
  ? 'http://localhost:8000'
  : 'https://mindsurfingclub.com';

export const API = axios.create({
  baseURL: baseURL, // API_URL,
  headers: {
    authorization: localStorage.getItem(USER_LOCALSTORAGE_KEY) || '',
  },
});
