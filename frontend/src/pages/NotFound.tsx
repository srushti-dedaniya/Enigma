import { Link } from 'react-router-dom';
import { Button } from '../components/ui';

export function NotFound() {
  return (
    <div className="min-h-screen bg-surface flex items-center justify-center px-space-md">
      <div className="text-center max-w-md">
        <div className="w-24 h-24 mx-auto mb-space-lg bg-primary/10 rounded-full flex items-center justify-center">
          <span className="material-symbols-outlined text-primary text-[48px]">explore_off</span>
        </div>
        <h1 className="font-display-lg text-display-lg font-bold text-on-surface mb-space-sm">404</h1>
        <h2 className="font-headline-lg text-headline-lg text-on-surface mb-space-md">Page Not Found</h2>
        <p className="font-body-md text-body-md text-on-surface-variant mb-space-xl">
          The page you're looking for doesn't exist or has been moved. 
          You might have mistyped the URL or the page may have been removed.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-space-md">
          <Button onClick={() => window.history.back()} leftIcon={<span className="material-symbols-outlined text-[18px]">arrow_back</span>}>
            Go Back
          </Button>
          <Button variant="outline" to="/dashboard">
            <span>Go to Dashboard</span>
            <span className="material-symbols-outlined text-[18px]">dashboard</span>
          </Button>
        </div>
        <div className="mt-space-xl pt-space-md border-t border-outline-variant">
          <p className="font-label-sm text-label-sm text-outline">
            Need help? <Link href="#" className="text-primary hover:underline">Contact Support</Link>
          </p>
        </div>
      </div>
    </div>
  );
}