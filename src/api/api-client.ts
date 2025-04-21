import axios, { Method } from 'axios';
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_NEXTFIN_API_URL || 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

export const nextfinRequest = async <T>(
  url: string,
  method: Method,
  data?: unknown
): Promise<T> => {
  const response = await apiClient({
    method,
    url,
    data,
  });
  return response.data;
};
