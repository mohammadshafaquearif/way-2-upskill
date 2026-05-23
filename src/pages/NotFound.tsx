import { Link, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageShell from '@/components/layout/PageShell';
import { Button } from '@/components/ui/button';
import { IMAGES } from '@/lib/images';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error('404:', location.pathname);
  }, [location.pathname]);

  return (
    <PageShell>
      <Navbar />
      <main className="page-main flex items-center section-padding brand-surface-dots">
        <div className="container px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-10 items-center max-w-4xl mx-auto">
            <div className="text-center lg:text-left">
              <p className="text-6xl font-bold gradient-text mb-2">404</p>
              <h1 className="text-2xl sm:text-3xl font-bold mb-4">Page not found</h1>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                The page you&apos;re looking for doesn&apos;t exist or may have moved.
              </p>
              <Button asChild className="btn-brand">
                <Link to="/">Back to Home</Link>
              </Button>
            </div>
            <div className="hero-image-frame max-w-md mx-auto w-full aspect-video">
              <img
                src={IMAGES.learning}
                alt=""
                className="h-full w-full object-cover opacity-90"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </PageShell>
  );
};

export default NotFound;
