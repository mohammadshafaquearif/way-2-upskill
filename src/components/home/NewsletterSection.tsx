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
    <section className="section-padding section-alt border-t border-border" id="newsletter">
      <div className="container px-4 sm:px-6">
        <div className="surface-card-lg max-w-2xl mx-auto text-center p-8 md:p-12">
          <div className="feature-icon mx-auto mb-4 h-12 w-12">
            <Mail className="h-6 w-6" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold mb-3">Stay Updated with Modern Tech Learning</h2>
          <p className="text-muted-foreground mb-8">Roadmaps, tips, and updates — straight to your inbox.</p>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="you@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 bg-background"
              required
            />
            <Button type="submit" disabled={loading} className="btn-brand shrink-0">
              {loading ? 'Subscribing...' : 'Subscribe'}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
