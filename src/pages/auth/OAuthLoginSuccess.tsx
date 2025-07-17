import { setAuthenticated } from '@/features/auth/authSlice';
import { useAppDispatch } from '@/store/hooks';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const OAuthLoginSuccess = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    setTimeout(() => {
      dispatch(setAuthenticated({ isAuthenticated: true }));
      navigate('/', { replace: true });
    }, 2000);
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-400/30 to-purple-400/30 dark:from-slate-900 dark:via-blue-950 dark:to-indigo-950">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
          Login Successful
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Redirecting you to dashboard...
        </p>
      </div>
    </div>
  );
};

export default OAuthLoginSuccess;
