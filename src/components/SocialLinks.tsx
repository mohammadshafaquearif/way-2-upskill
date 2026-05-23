import React from 'react';
import { Instagram, Linkedin, MessageCircle, X } from 'lucide-react';
import { SOCIAL_LINKS } from '@/lib/socialLinks';
import { cn } from '@/lib/utils';

const items = [
  { href: SOCIAL_LINKS.whatsapp, label: 'WhatsApp', icon: MessageCircle },
  { href: SOCIAL_LINKS.linkedin, label: 'LinkedIn', icon: Linkedin },
  { href: SOCIAL_LINKS.instagram, label: 'Instagram', icon: Instagram },
  { href: SOCIAL_LINKS.x, label: 'X', icon: X },
] as const;

type SocialLinksProps = {
  variant?: 'footer' | 'contact';
  className?: string;
};

const SocialLinks = ({ variant = 'contact', className }: SocialLinksProps) => {
  const isFooter = variant === 'footer';

  return (
    <div className={cn('flex flex-wrap items-center gap-3', className)}>
      {items.map(({ href, label, icon: Icon }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className={
            isFooter
              ? 'flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-slate-300 transition-colors hover:border-sky-400/40 hover:bg-sky-500/10 hover:text-white'
              : 'p-2 bg-accent rounded-full hover:bg-accent/80 transition-colors text-foreground'
          }
        >
          <Icon className={isFooter ? 'h-4 w-4' : 'h-5 w-5'} />
        </a>
      ))}
    </div>
  );
};

export default SocialLinks;
