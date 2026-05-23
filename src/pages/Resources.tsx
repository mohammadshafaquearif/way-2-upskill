import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageShell from '@/components/layout/PageShell';
import PageHero from '@/components/PageHero';
import FreeLearningResources from '@/components/home/FreeLearningResources';
import { IMAGES } from '@/lib/images';

const Resources = () => (
  <PageShell>
    <Navbar />
    <PageHero
      title="Free Learning Resources"
      subtitle="Roadmaps, guides, and curated content to support your tech journey — at your own pace."
      image={IMAGES.hero.resources}
      imageAlt="Study and learning resources"
    />
    <FreeLearningResources />
    <Footer />
  </PageShell>
);

export default Resources;
