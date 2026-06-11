import React from 'react';
import PageShell from '@/components/layout/PageShell';
import Hero from '@/components/Hero';
import TrustStatsBar from '@/components/home/TrustStatsBar';
import TopPrograms from '@/components/home/TopPrograms';
import ProgramsStandOut from '@/components/home/ProgramsStandOut';
import PartnerStrip from '@/components/home/PartnerStrip';
import LearningJourney from '@/components/home/LearningJourney';
import StatsSection from '@/components/StatsSection';
import Testimonials from '@/components/Testimonials';
import FreeLearningResources from '@/components/home/FreeLearningResources';
import FAQSection from '@/components/home/FAQSection';
import NewsletterSection from '@/components/home/NewsletterSection';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Index = () => (
  <PageShell>
    <Navbar />
    <main className="page-main">
      <Hero />
      <TrustStatsBar />
      <TopPrograms />
      <ProgramsStandOut />
      <PartnerStrip />
      <LearningJourney />
      <StatsSection />
      <Testimonials />
      <FreeLearningResources />
      <FAQSection />
      <NewsletterSection />
    </main>
    <Footer />
  </PageShell>
);

export default Index;
