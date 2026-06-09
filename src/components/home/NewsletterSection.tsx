import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Mail, ArrowRight } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const NewsletterSection = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) {
      toast({ title: 'Enter a valid email', variant: 'destructive' });
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 600));
    setLoading(false);
    toast({
      title: "You're on the list!",
      description: 'We will share roadmaps, resources, and learning updates with you soon.',
    });
    setEmail('');
  };

  return (
    <section className="section-padding cta-premium dark-surface relative overflow-hidden" id="newsletter">
      <div className="cta-grid absolute inset-0" aria-hidden />
      <div className="container relative z-10 px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-sm">
            <Mail className="h-7 w-7 text-white" />
          </div>
          <h2 className="mb-3 text-2xl font-bold text-white sm:text-3xl md:text-4xl">
            Stay Ahead in Tech
          </h2>
          <p className="mb-8 text-white/75 leading-relaxed">
            Get roadmaps, career tips, and program updates delivered to your inbox — free.
          </p>
          <form
            onSubmit={handleSubmit}
            className="mx-auto flex max-w-md flex-col gap-3 sm:flex-row"
          >
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-12 flex-1 border-white/20 bg-white/10 text-white placeholder:text-white/50 focus-visible:ring-white/30"
              required
            />
            <Button
              type="submit"
              disabled={loading}
              className="h-12 shrink-0 bg-white px-6 font-semibold text-primary hover:bg-white/90"
            >
              {loading ? 'Subscribing...' : (
                <>
                  Subscribe
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
