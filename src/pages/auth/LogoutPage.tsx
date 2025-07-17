import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useAppSelector } from '@/store/hooks';
import { CheckCircle, Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';

export default function LogoutPage() {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(3);
  const status = useAppSelector((state) => state.auth.logoutStatus);

  useEffect(() => {
    if (status === 'idle' && countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (countdown == 0) {
      navigate('/auth');
    }
  }, [navigate, countdown, status]);

  return (
    <div>
      <CSSTransition in={true} timeout={1000} classNames="fade" unmountOnExit>
        <div className="flex min-h-screen items-center justify-center bg-muted/40 p-4">
          <Card className="mx-auto max-w-md w-full">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Sign Out</CardTitle>
              <CardDescription>
                {status === 'pending' && 'Signing you out...'}
                {status === 'succeeded' &&
                  "You've been successfully signed out"}
              </CardDescription>
            </CardHeader>
            {status === 'pending' && (
              <CardContent className="flex flex-col items-center justify-center py-8">
                <div className="flex flex-col items-center gap-4">
                  <Loader2 className="h-16 w-16 animate-spin text-primary" />
                  <div className="text-sm text-muted-foreground">
                    Securely ending your session...
                  </div>
                </div>
              </CardContent>
            )}

            {status === 'idle' && (
              <div className="flex flex-col items-center gap-4">
                <CheckCircle className="h-16 w-16 text-green-500" />
                <div className="text-sm text-muted-foreground">
                  Your session has been securely ended
                </div>
                <div className="text-sm font-medium">
                  Redirecting in {countdown} second{countdown !== 1 ? 's' : ''}
                  ...
                </div>
              </div>
            )}
            {status === 'idle' && (
              <CardFooter className="flex justify-center">
                <Button
                  onClick={() => navigate('/auth')}
                  variant="outline"
                  className="gap-2"
                >
                  Return to Login
                </Button>
              </CardFooter>
            )}
          </Card>
        </div>
      </CSSTransition>
    </div>
  );
}
