import React from 'react';
import { Link } from 'react-router-dom';
import { Users, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const discordUrl = import.meta.env.VITE_COMMUNITY_DISCORD || '';
const whatsappUrl = import.meta.env.VITE_COMMUNITY_WHATSAPP || '';
const telegramUrl = import.meta.env.VITE_COMMUNITY_TELEGRAM || '';
const hasLiveCommunity = Boolean(discordUrl || whatsappUrl || telegramUrl);

const CommunitySection = () => (
  <section className="section-padding section-alt" id="community">
    <div className="container px-4 sm:px-6">
      <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-lg">
        <div className="grid lg:grid-cols-2">
          <div className="p-8 sm:p-10 lg:p-12">
            <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg shadow-primary/25">
              <Users className="h-7 w-7" />
            </div>
            <h2 className="section-title mb-4 text-left">Join Our Growing Community</h2>
            <p className="mb-8 max-w-md text-muted-foreground leading-relaxed">
              Learn alongside peers building skills in modern tech — share projects, get feedback,
              and grow together with like-minded learners.
            </p>
            {hasLiveCommunity ? (
              <div className="flex flex-col gap-3 sm:flex-row">
                {discordUrl && (
                  <Button asChild className="btn-brand">
                    <a href={discordUrl} target="_blank" rel="noopener noreferrer">
                      Join Discord
                    </a>
                  </Button>
                )}
                {whatsappUrl && (
                  <Button asChild variant="outline" className="border-primary/30 text-primary">
                    <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                      Join WhatsApp
                    </a>
                  </Button>
                )}
                {telegramUrl && (
                  <Button asChild variant="outline" className="border-primary/30 text-primary">
                    <a href={telegramUrl} target="_blank" rel="noopener noreferrer">
                      Join Telegram
                    </a>
                  </Button>
                )}
              </div>
            ) : (
              <Button asChild size="lg" className="btn-brand">
                <Link to="/contact">Join Waitlist</Link>
              </Button>
            )}
          </div>

          <div className="flex flex-col justify-center gap-4 bg-gradient-to-br from-primary/5 to-secondary/5 p-8 sm:p-10 lg:p-12">
            {[
              'Peer discussions & study groups',
              'Project feedback from the community',
              'Career tips and job referrals',
              'Live Q&A sessions with mentors',
            ].map((item) => (
              <div key={item} className="flex items-center gap-3">
                <MessageCircle className="h-5 w-5 shrink-0 text-primary" />
                <span className="text-sm font-medium text-foreground sm:text-base">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default CommunitySection;
