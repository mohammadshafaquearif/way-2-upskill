import React from 'react';
import { Instagram, Linkedin, MessageCircle, X } from 'lucide-react';
import { SOCIAL_LINKS } from '@/lib/socialLinks';
import { cn } from '@/lib/utils';

const items = [
  { href: SOCIAL_LINKS.whatsapp, label: 'WhatsApp', icon: MessageCircle, src: '/images/social/whatsapp.png' },
  { href: SOCIAL_LINKS.linkedin, label: 'LinkedIn', icon: Linkedin, src: '/images/social/linkedin.png' },
  { href: SOCIAL_LINKS.instagram, label: 'Instagram', icon: Instagram, src: '/images/social/instagram.png' },
  { href: SOCIAL_LINKS.x, label: 'X', icon: X, src: '/images/social/x.png' },
] as const;

type SocialLinksProps = {
  variant?: 'footer' | 'contact';
  className?: string;
};

const SocialLinks = ({ variant = 'contact', className }: SocialLinksProps) => {
  const isFooter = variant === 'footer';

  return (
    <div className={cn('flex flex-wrap items-center gap-3', className)}>
      {items.map(({ href, label, icon: Icon, src }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className={
            isFooter
              ? cn(
                  'flex h-10 w-10 items-center justify-center rounded-lg transition-opacity hover:opacity-80',
                  label === 'X' && 'border border-white/10 bg-white',
                )
              : 'p-2 bg-accent rounded-full hover:bg-accent/80 transition-colors text-foreground'
          }
        >
          {isFooter ? (
            <img src={src} alt="" className={label === 'X' ? 'h-5 w-5 object-contain' : 'h-10 w-10 object-contain'} />
          ) : (
            <Icon className="h-5 w-5" />
          )}
        </a>
      ))}
    </div>
  );
};

export default SocialLinks;
