import { Link, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { IMAGES } from '@/lib/images';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error('404:', location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen w-full overflow-x-hidden flex flex-col">
      <Navbar />
      <main className="flex-1 flex items-center brand-surface py-16">
        <div className="container px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-10 items-center max-w-4xl mx-auto">
            <div className="text-center lg:text-left">
              <p className="text-6xl font-bold gradient-text mb-2">404</p>
              <h1 className="text-2xl sm:text-3xl font-bold text-brand-950 mb-4">Page not found</h1>
              <p className="text-muted-foreground mb-8">
                The page you&apos;re looking for doesn&apos;t exist or may have moved.
              </p>
              <Button asChild className="brand-gradient text-white border-0">
                <Link to="/">Back to Home</Link>
              </Button>
            </div>
            <div className="rounded-2xl overflow-hidden border border-border shadow-lg aspect-video max-w-md mx-auto w-full">
              <img
                src={IMAGES.learning}
                alt=""
                className="h-full w-full object-cover opacity-80"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;
