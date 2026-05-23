
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
    title: "Cybersecurity Fundamentals & Threat Landscape",
    objective: "Understand core cybersecurity concepts, threat actors, and the current security landscape.",
    coreConcepts: [
      "CIA Triad: Confidentiality, Integrity, Availability",
      "Threat Actors and Attack Vectors",
      "Risk Assessment and Management",
      "Security Frameworks (NIST, ISO 27001)",
      "Cybersecurity Career Paths and Certifications"
    ],
    deliverables: [
      "Threat Landscape Analysis Report",
      "Risk Assessment Framework",
      "Security Policy Template"
    ],
    salesHook: "Build the foundation that protects organizations from cyber threats worth billions in damages.",
    projectImage: "https://images.unsplash.com/photo-1563013544-824ae1b704d3"
  },
  {
    week: 2,
    title: "Network Security & Architecture",
    objective: "Master network protocols, security architectures, and defensive mechanisms.",
    coreConcepts: [
      "TCP/IP Protocol Suite and OSI Model",
      "Network Security Devices (Firewalls, IDS/IPS)",
      "VPNs and Secure Communication Protocols",
      "Network Segmentation and DMZ Design",
      "Wireless Security (WPA3, Enterprise WiFi)"
    ],
    deliverables: [
      "Network Security Architecture Design",
      "Firewall Configuration Lab",
      "Wireless Security Assessment"
    ],
    salesHook: "Protect the digital highways that connect our modern world.",
    projectImage: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31"
  }
  // ... add remaining weeks with similar structure
];

const CybersecuritySyllabus = () => {
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
        title="Cybersecurity"
        subtitle="A 12-week path through security fundamentals, network defense, and hands-on threat scenarios."
        image={IMAGES.programs.security}
        checkoutPath="/checkout/cybersecurity"
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
      
      <SyllabusPageCta title="Ready to master cybersecurity?" checkoutPath="/checkout/cybersecurity" />

      <Footer />
    </PageShell>
  );
};

export default CybersecuritySyllabus;
