
import React, { useRef } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WeekCard from '@/components/WeekCard';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import SyllabusHero from '@/components/SyllabusHero';
import SyllabusPageCta from '@/components/SyllabusPageCta';
import PageShell from '@/components/layout/PageShell';
import { IMAGES } from '@/lib/images';

const syllabusData = [
  {
    week: 1,
    title: "Cloud Computing Fundamentals",
    objective: "Understand cloud computing concepts, service models, and deployment strategies.",
    coreConcepts: [
      "Cloud Computing Models (IaaS, PaaS, SaaS)",
      "Public, Private, and Hybrid Cloud Strategies",
      "Cloud Service Providers Comparison",
      "Cloud Economics and Cost Optimization",
      "Cloud Migration Strategies"
    ],
    deliverables: [
      "Cloud Strategy Assessment",
      "Cost Analysis Report",
      "Migration Planning Document"
    ],
    salesHook: "Master the technology that powers 90% of modern businesses and startups.",
    projectImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa"
  },
  {
    week: 2,
    title: "Amazon Web Services (AWS) Core Services",
    objective: "Master AWS fundamentals and core services for compute, storage, and networking.",
    coreConcepts: [
      "AWS Global Infrastructure and Regions",
      "EC2: Virtual Machines and Instance Types",
      "S3: Object Storage and Data Management",
      "VPC: Virtual Private Cloud and Networking",
      "IAM: Identity and Access Management"
    ],
    deliverables: [
      "Multi-tier AWS Architecture",
      "S3 Data Lake Implementation",
      "VPC Network Design"
    ],
    salesHook: "Build on the same platform that powers Netflix, Airbnb, and thousands of startups.",
    projectImage: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31"
  }
  // ... add remaining weeks with similar structure
];

const CloudComputingSyllabus = () => {
  const weekRefs = useRef<(HTMLDivElement | null)[]>([]);

  const scrollToWeek = (weekNumber: number) => {
    const index = weekNumber - 1;
    if (weekRefs.current[index]) {
      weekRefs.current[index]?.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <PageShell>
      <Navbar />

      <SyllabusHero
        title="Cloud Computing & AWS"
        subtitle="A 10-week path through cloud fundamentals, AWS services, deployments, and scalable architecture."
        image={IMAGES.programs.cloud}
        checkoutPath="/checkout/cloud"
      />
      
      <section className="section-padding section-alt">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {syllabusData.map((week, index) => (
              <div 
                key={week.week} 
                id={`week-${week.week}`}
                ref={el => weekRefs.current[week.week - 1] = el}
              >
                <WeekCard
                  week={week.week}
                  title={week.title}
                  objective={week.objective}
                  coreConcepts={week.coreConcepts}
                  deliverables={week.deliverables}
                  salesHook={week.salesHook}
                  projectImage={week.projectImage}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <SyllabusPageCta title="Ready to master cloud computing?" checkoutPath="/checkout/cloud" />

      <Footer />
    </PageShell>
  );
};

export default CloudComputingSyllabus;
