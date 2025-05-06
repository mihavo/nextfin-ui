import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { CircleHelp } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card className="mx-auto max-w-md text-center">
        <CardHeader>
          <div className="flex justify-center">
            <CircleHelp className="h-16 w-16 text-destructive" />
          </div>
          <CardTitle className="text-3xl">404</CardTitle>
          <CardDescription className="text-xl">Page Not Found</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            The page you are looking for doesn't exist or has been moved.
          </p>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button asChild>
            <Link to="/" className="text-white">
              Return To Homepage
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
