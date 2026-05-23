import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Mail } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const NewsletterSection = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) {
      toast({
        title: 'Enter a valid email',
        variant: 'destructive',
      });
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
    <section className="py-16 md:py-20 bg-background border-t border-border" id="newsletter">
      <div className="container px-4 sm:px-6">
        <div className="max-w-2xl mx-auto text-center rounded-2xl border border-primary/20 bg-gradient-to-br from-brand-100/60 to-card p-8 md:p-12 shadow-sm">
          <Mail className="h-10 w-10 text-primary mx-auto mb-4" />
          <h2 className="text-2xl md:text-3xl font-bold text-brand-950 mb-3">
            Stay Updated with Modern Tech Learning
          </h2>
          <p className="text-muted-foreground mb-8">
            Roadmaps, tips, and updates — straight to your inbox.
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="you@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1"
              required
            />
            <Button type="submit" disabled={loading} className="brand-gradient text-white border-0 shrink-0">
              {loading ? 'Subscribing...' : 'Subscribe for Updates'}
            </Button>
          </form>
          <p className="text-xs text-muted-foreground mt-4">
            No spam. Unsubscribe anytime. We respect your inbox.
          </p>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
