import { authReset } from '@/features/auth/authSlice';
import axios, { Method } from 'axios';
import { useDispatch } from 'react-redux';
import { toast } from 'sonner';
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_NEXTFIN_API_URL || 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      useDispatch()(authReset());
    }
  }
);

export const nextfinRequest = async <T>(
  url: string,
  method: Method,
  data?: unknown
): Promise<T> => {
  try {
    const response = await apiClient({
      method,
      url,
      data,
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.message || error.message;
      toast.error(message);
      throw new Error(message);
    } else {
      const message = `Unexpected error: ${error}`;
      toast.error(message);
      throw new Error(message);
    }
  }
};
