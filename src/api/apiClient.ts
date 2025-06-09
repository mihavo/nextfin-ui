import { authReset } from '@/features/auth/authSlice';
import axios, { Method } from 'axios';
import { toast } from 'sonner';

// Define a custom error type that extends AxiosError and includes _handled
interface HandledError {
  _handled?: boolean;
}

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_NEXTFIN_API_URL || 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// Interceptor to handle global auth errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error.response === undefined ||
      error.code === 'ERR_NETWORK' ||
      error.response.status === 401
    ) {
      import('../store/store').then(({ default: store, persistor }) => {
        store.dispatch(authReset());
        persistor.purge();
      });
      if (error.response === undefined || error.response == 'ERR_NETWORK')
        toast.error('Connection Error');
      return Promise.reject({ _handled: true });
    }
    return Promise.reject(error); // Pass the error to the next handler
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
    if ((error as HandledError)?._handled) return Promise.reject(error);
    if (axios.isAxiosError(error)) {
      if (
        error.response?.data.errors &&
        Array.isArray(error.response.data.errors)
      ) {
        const messages = error.response.data.errors.map(
          (err: { defaultMessage: string }) => err.defaultMessage
        );
        toast.error(messages.join(', '));
        throw new Error(messages.join(', '));
      } else {
        const message = error.response?.data?.message || 'An error occurred';
        toast.error(message);
        throw new Error(message);
      }
    } else {
      const message = 'An unexpected error occurred';
      toast.error(message);
      throw new Error(message);
    }
  }
};
