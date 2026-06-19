import React from 'react';
import { ZYVOTRIX_MAPS_EMBED_SRC, ZYVOTRIX_NAP } from '@/lib/localBusiness';

interface GoogleMapEmbedProps {
  className?: string;
  title?: string;
}

const GoogleMapEmbed = ({
  className = '',
  title = `Zyvotrix office location — ${ZYVOTRIX_NAP.addressLocality}, ${ZYVOTRIX_NAP.addressRegion}`,
}: GoogleMapEmbedProps) => (
  <div className={`overflow-hidden rounded-2xl border border-border/80 bg-card shadow-sm ${className}`}>
    <iframe
      title={title}
      src={ZYVOTRIX_MAPS_EMBED_SRC}
      width="100%"
      height="100%"
      className="min-h-[280px] w-full border-0 sm:min-h-[360px]"
      loading="lazy"
      allowFullScreen
      referrerPolicy="no-referrer-when-downgrade"
    />
  </div>
);

export default GoogleMapEmbed;
