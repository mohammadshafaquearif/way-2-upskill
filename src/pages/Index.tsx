
import React from 'react';
import Hero from '@/components/Hero';
import WhatIsZyvotrix from '@/components/home/WhatIsZyvotrix';
import ProgramsPreview from '@/components/home/ProgramsPreview';
import LearningApproach from '@/components/home/LearningApproach';
import CommunitySection from '@/components/home/CommunitySection';
import FAQSection from '@/components/home/FAQSection';
import NewsletterSection from '@/components/home/NewsletterSection';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="w-full min-h-screen overflow-x-hidden">
      <Navbar />
      <Hero />
      <WhatIsZyvotrix />
      <ProgramsPreview />
      <LearningApproach />
      <CommunitySection />
      <FAQSection />
      <NewsletterSection />
      <Footer />
    </div>
  );
};

export default Index;
