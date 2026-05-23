
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageShell from '@/components/layout/PageShell';
import PageHero from '@/components/PageHero';
import PageCta from '@/components/PageCta';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Linkedin, Target, Hammer, Briefcase } from 'lucide-react';
import { IMAGES } from '@/lib/images';

const methodology = [
  {
    icon: Hammer,
    title: 'Learn-by-Building',
    text: 'From day one, you implement concepts through projects — not passive watching.',
  },
  {
    icon: Target,
    title: 'Industry & Project Based',
    text: 'Every module ties to workflows and tools used in real tech teams.',
  },
  {
    icon: Briefcase,
    title: 'Career-Oriented',
    text: 'Portfolio work, interview thinking, and practical confidence built in.',
  },
];

const About = () => {
  return (
    <PageShell>
      <Navbar />

      <PageHero
        title="About Zyvotrix"
        subtitle="Practical, industry-oriented tech education — built to help learners become job-ready through real skills."
        image={IMAGES.hero.about}
        imageAlt="Team learning and collaboration"
      />

      <section className="section-padding section-white">
        <div className="container px-4 sm:px-6 max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-10 items-center mb-16">
            <div>
              <h2 className="section-title text-left mb-4">Our Mission</h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-4">
                We help learners bridge the gap between theory and industry — through structured programs,
                hands-on projects, and expert-led guidance across modern tech domains.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Full Stack, DevOps, Cloud, AI, and Data Analytics — taught with the same practical mindset
                used in real companies.
              </p>
            </div>
            <div className="hero-image-frame aspect-[4/3]">
              <img
                src={IMAGES.team}
                alt="Collaborative learning environment"
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {methodology.map((item) => (
              <div key={item.title} className="rounded-xl border border-border bg-card p-6 hover-card">
                <div className="feature-icon w-fit mb-4">
                  <item.icon className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-bold text-brand-950 mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding section-alt">
        <div className="container px-4 sm:px-6 max-w-5xl mx-auto">
          <h2 className="section-title text-center mb-12">Lead Instructor</h2>
          <div className="surface-card-lg max-w-3xl mx-auto p-8 md:p-10 text-center md:text-left">
            <span className="pill-tag mb-3">Expert-Led Training</span>
            <h3 className="text-2xl md:text-3xl font-bold text-brand-950 mb-3">Mohammad Shafaque Arif</h3>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Experienced across Full Stack Development, DevOps, Cloud, AI/ML, and modern data workflows —
              focused on helping learners build confidence through practical implementation.
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground mb-6">
              <li>• Full Stack & modern web architecture</li>
              <li>• DevOps, CI/CD & cloud deployments</li>
              <li>• AI/ML & data-driven applications</li>
            </ul>
            <div className="flex flex-wrap justify-center md:justify-start gap-3 text-sm">
              <a
                href="mailto:support@zyvotrix.com"
                className="inline-flex items-center gap-2 text-primary font-medium hover:underline"
              >
                <Mail className="h-4 w-4" /> Email
              </a>
              <a
                href="https://www.linkedin.com/company/zyvotrix"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-primary font-medium hover:underline"
              >
                <Linkedin className="h-4 w-4" /> LinkedIn
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding section-white border-t border-border">
        <div className="container px-4 sm:px-6">
          <div className="flex flex-wrap justify-center gap-8 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-2">
              <MapPin className="h-4 w-4 text-primary" /> Bengaluru, Karnataka
            </span>
            <span className="inline-flex items-center gap-2">
              <Phone className="h-4 w-4 text-primary" /> +91 8887720741
            </span>
          </div>
          <div className="text-center mt-8">
            <Button asChild size="lg" className="btn-brand">
              <Link to="/contact">Talk to Our Team</Link>
            </Button>
          </div>
        </div>
      </section>

      <PageCta
        title="Ready to start learning?"
        description="Explore programs or reach out — we'll help you find the right path."
        primaryLabel="View Programs"
        primaryHref="/courses"
        secondaryLabel="Contact"
        secondaryHref="/contact"
      />

      <Footer />
    </PageShell>
  );
};


export default About;
