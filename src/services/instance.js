import axios from "axios";

const BASE_URL = import.meta.env.VITE_APP_SERVER_API;

/**
 * instance axios pour les requetes public pas necessaire d'etre authentifié
 */
export const instance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
export const adminInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

/* adminInstance.interceptors.request.use(
    (request) => {
        request.headers.Authorization = `Bearer ${TOKEN_AUTHORIZATION?.token?.trim()}`;
        return request;
    },
    (error) => {
      if (error.response) {
        const apiError = error.response?.data
        return Promise.reject(apiError)
      }
      return Promise.reject(error)
    }


  ) */
