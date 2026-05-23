import React from 'react';
import PageCta from '@/components/PageCta';

interface SyllabusPageCtaProps {
  title: string;
  description?: string;
  checkoutPath: string;
}

const SyllabusPageCta = ({
  title,
  description = 'Apply to begin your structured path with hands-on projects and expert-led guidance.',
  checkoutPath,
}: SyllabusPageCtaProps) => (
  <PageCta
    title={title}
    description={description}
    primaryLabel="Start Learning"
    primaryHref={checkoutPath}
    secondaryLabel="All Programs"
    secondaryHref="/courses"
  />
);

export default SyllabusPageCta;
