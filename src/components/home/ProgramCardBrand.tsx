import React from 'react';
import { IMAGES } from '@/lib/images';

interface ProgramCardBrandProps {
  label?: string;
}

const ProgramCardBrand = ({ label = 'Zyvotrix' }: ProgramCardBrandProps) => (
  <div className="top-program-partner">
    <img
      src={IMAGES.brand.logo}
      alt=""
      className="top-program-partner-logo"
      width={24}
      height={24}
      loading="lazy"
      decoding="async"
      aria-hidden
    />
    <span className="top-program-partner-name">{label}</span>
  </div>
);

export default ProgramCardBrand;
