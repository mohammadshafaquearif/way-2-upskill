import React from 'react';
import { Link } from 'react-router-dom';
import { Users } from 'lucide-react';
import { Button } from '@/components/ui/button';

const discordUrl = import.meta.env.VITE_COMMUNITY_DISCORD || '';
const whatsappUrl = import.meta.env.VITE_COMMUNITY_WHATSAPP || '';
const telegramUrl = import.meta.env.VITE_COMMUNITY_TELEGRAM || '';
const hasLiveCommunity = Boolean(discordUrl || whatsappUrl || telegramUrl);

const CommunitySection = () => (
  <section className="section-padding section-alt" id="community">
    <div className="container px-4 sm:px-6">
      <div className="surface-card-lg max-w-2xl mx-auto text-center p-8 md:p-12">
        <div className="feature-icon mx-auto mb-5 h-14 w-14">
          <Users className="h-7 w-7" />
        </div>
        <h2 className="section-title mb-4">Join Us</h2>
        <p className="text-muted-foreground mb-8 leading-relaxed">
          Learn alongside others building skills in modern tech — projects, discussions, and shared
          growth.
        </p>
        {hasLiveCommunity ? (
          <div className="flex flex-col sm:flex-row justify-center gap-3">
            {discordUrl && (
              <Button asChild variant="outline" className="btn-outline-brand bg-card">
                <a href={discordUrl} target="_blank" rel="noopener noreferrer">Join Discord</a>
              </Button>
            )}
            {whatsappUrl && (
              <Button asChild variant="outline" className="btn-outline-brand bg-card">
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">Join WhatsApp</a>
              </Button>
            )}
            {telegramUrl && (
              <Button asChild variant="outline" className="btn-outline-brand bg-card">
                <a href={telegramUrl} target="_blank" rel="noopener noreferrer">Join Telegram</a>
              </Button>
            )}
          </div>
        ) : (
          <Button asChild size="lg" className="btn-brand">
            <Link to="/contact">Join Waitlist</Link>
          </Button>
        )}
      </div>
    </div>
  </section>
);

export default CommunitySection;
