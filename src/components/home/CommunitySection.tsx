import React from 'react';
import { MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SocialLinks from '@/components/SocialLinks';
import { SOCIAL_LINKS } from '@/lib/socialLinks';

const CommunitySection = () => (
  <section className="section-padding bg-brand-100/40" id="community">
    <div className="container px-4 sm:px-6">
      <div className="text-center mb-12 max-w-2xl mx-auto">
        <span className="pill-tag mb-4">Zyvotrix Community</span>
        <h2 className="section-title">Join the Zyvotrix Community</h2>
        <p className="section-subtitle">
          Connect with learners and follow us for roadmaps, project tips, and career guidance.
          Message us on WhatsApp or stay updated on our social channels.
        </p>
      </div>

      <div className="max-w-md mx-auto">
        <div className="rounded-xl border border-border bg-card p-6 flex flex-col hover-card text-center sm:text-left">
          <MessageCircle className="h-10 w-10 text-primary mb-4 mx-auto sm:mx-0" />
          <h3 className="text-lg font-bold text-brand-950 mb-2">WhatsApp</h3>
          <p className="text-sm text-muted-foreground mb-6 flex-1">
            Quick questions, program guidance, and learner support — chat with our team directly.
          </p>
          <Button asChild variant="outline" className="border-primary text-primary w-full">
            <a href={SOCIAL_LINKS.whatsapp} target="_blank" rel="noopener noreferrer">
              Chat on WhatsApp
            </a>
          </Button>
        </div>
      </div>

      <div className="mt-10 text-center">
        <p className="text-sm font-medium text-brand-950 mb-4">Follow Zyvotrix</p>
        <SocialLinks variant="contact" className="justify-center" />
      </div>
    </div>
  </section>
);

export default CommunitySection;
