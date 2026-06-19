import { Link, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageShell from '@/components/layout/PageShell';
import { STATIC_PAGE_SEO } from '@/lib/seo';
import { usePageMeta } from '@/hooks/usePageMeta';
import { Button } from '@/components/ui/button';
import TiltCard from '@/components/motion/TiltCard';
import AmbientDepth from '@/components/motion/AmbientDepth';
import { ArrowRight, Home, Search } from 'lucide-react';
import { IMAGES } from '@/lib/images';

const quickLinks = [
  { label: 'Programs', href: '/courses' },
  { label: 'Resources', href: '/resources' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Contact', href: '/contact' },
];

const NotFound = () => {
  const location = useLocation();

  usePageMeta(STATIC_PAGE_SEO['/404']);

  useEffect(() => {
    console.error('404:', location.pathname);
  }, [location.pathname]);

  return (
    <PageShell>
      <Navbar />
      <main className="page-main relative flex min-h-[70vh] items-center overflow-hidden">
        <div className="hero-orb hero-orb-1 opacity-25" aria-hidden />
        <AmbientDepth />

        <div className="container relative z-10 px-4 py-20 sm:px-6">
          <div className="mx-auto grid max-w-4xl items-center gap-12 lg:grid-cols-2">
            <div className="text-center lg:text-left">
              <p className="mb-2 font-mono text-8xl font-black text-primary/10 sm:text-9xl">404</p>
              <h1 className="mb-4 -mt-10 text-3xl font-bold sm:text-4xl">
                Oops! Page <span className="gradient-text">not found</span>
              </h1>
              <p className="mb-8 leading-relaxed text-muted-foreground">
                The page you&apos;re looking for doesn&apos;t exist or may have moved.
              </p>

              <div className="mb-10 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">
                <Button asChild size="lg" className="btn-brand">
                  <Link to="/">
                    <Home className="mr-2 h-5 w-5" />
                    Back to Home
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-primary/30 text-primary">
                  <Link to="/courses">
                    Explore Programs
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>

              <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                <p className="mb-4 flex items-center justify-center gap-2 text-sm font-semibold text-muted-foreground lg:justify-start">
                  <Search className="h-4 w-4" />
                  Popular pages
                </p>
                <div className="flex flex-wrap justify-center gap-3 lg:justify-start">
                  {quickLinks.map((link) => (
                    <Link
                      key={link.href}
                      to={link.href}
                      className="rounded-full border border-border bg-background px-4 py-2 text-sm font-medium transition-colors hover:border-primary/30 hover:text-primary"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <TiltCard maxTilt={8}>
              <div className="relative overflow-hidden rounded-3xl border border-border shadow-2xl">
                <img
                  src={IMAGES.notFound}
                  alt="Lost in space — page not found"
                  className="aspect-[4/3] w-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-950/80 via-brand-950/30 to-transparent" />
                <p className="absolute bottom-4 left-4 right-4 text-center text-sm font-medium text-white/90">
                  Let&apos;s get you back to learning
                </p>
              </div>
            </TiltCard>
          </div>
        </div>
      </main>
      <Footer />
    </PageShell>
  );
};

export default NotFound;
