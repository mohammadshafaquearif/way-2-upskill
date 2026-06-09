import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageShell from '@/components/layout/PageShell';
import PageHero from '@/components/PageHero';
import PageCta from '@/components/PageCta';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Linkedin, Target, Hammer, Briefcase, Rocket, Heart } from 'lucide-react';
import { IMAGES } from '@/lib/images';
import { usePageMeta } from '@/hooks/usePageMeta';

const methodology = [
  {
    icon: Hammer,
    title: 'Learn-by-Building',
    text: 'From day one, you implement concepts through projects — not passive watching.',
    color: 'from-blue-500 to-blue-700',
  },
  {
    icon: Target,
    title: 'Industry & Project Based',
    text: 'Every module ties to workflows and tools used in real tech teams.',
    color: 'from-violet-500 to-purple-700',
  },
  {
    icon: Briefcase,
    title: 'Career-Oriented',
    text: 'Portfolio work, interview thinking, and practical confidence built in.',
    color: 'from-teal-500 to-emerald-700',
  },
];

const values = [
  { icon: Rocket, title: 'Practical First', desc: 'Skills you can use on day one in real projects.' },
  { icon: Heart, title: 'Learner-Centric', desc: 'Structured support for every stage of your journey.' },
  { icon: Target, title: 'Outcome Focused', desc: 'Portfolio, confidence, and career-ready thinking.' },
];

const About = () => {
  usePageMeta({
    title: 'About Us',
    description:
      'Learn about Zyvotrix — practical, industry-oriented tech education in Full Stack, DevOps, Cloud, AI, and Data Analytics.',
    canonical: '/about',
  });

  return (
    <PageShell>
      <Navbar />

      <PageHero
        badge="Our Story"
        title={
          <>
            About <span className="gradient-text">Zyvotrix</span>
          </>
        }
        subtitle="Practical, industry-oriented tech education — built to help learners become job-ready through real skills."
        image={IMAGES.hero.about}
        imageAlt="Team learning and collaboration"
      />

      <section className="section-padding section-white">
        <div className="container mx-auto max-w-5xl px-4 sm:px-6">
          <div className="mb-16 grid items-center gap-10 md:grid-cols-2">
            <div>
              <span className="mb-3 inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-primary">
                Our Mission
              </span>
              <h2 className="section-title text-left">Bridging Theory & Industry</h2>
              <p className="mb-4 text-lg leading-relaxed text-muted-foreground">
                We help learners bridge the gap between theory and industry — through structured
                programs, hands-on projects, and expert-led guidance across modern tech domains.
              </p>
              <p className="leading-relaxed text-muted-foreground">
                Full Stack, DevOps, Cloud, AI, and Data Analytics — taught with the same practical
                mindset used in real companies.
              </p>
            </div>
            <div className="relative">
              <div className="hero-image-glow" aria-hidden />
              <div className="relative overflow-hidden rounded-3xl border border-border shadow-xl">
                <img
                  src={IMAGES.team}
                  alt="Collaborative learning environment"
                  className="aspect-[4/3] w-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          </div>

          <div className="mb-16 grid gap-4 sm:grid-cols-3">
            {values.map((v) => (
              <div
                key={v.title}
                className="rounded-2xl border border-border/80 bg-gradient-to-br from-brand-100/50 to-card p-6 text-center transition-all hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <v.icon className="h-6 w-6" />
                </div>
                <h3 className="mb-2 font-bold text-foreground">{v.title}</h3>
                <p className="text-sm text-muted-foreground">{v.desc}</p>
              </div>
            ))}
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {methodology.map((item) => (
              <div
                key={item.title}
                className="group rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/5"
              >
                <div
                  className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${item.color} text-white shadow-md transition-transform group-hover:scale-105`}
                >
                  <item.icon className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-lg font-bold text-brand-950">{item.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding section-alt">
        <div className="container mx-auto max-w-5xl px-4 sm:px-6">
          <div className="mb-10 text-center">
            <span className="mb-3 inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-primary">
              Expert-Led
            </span>
            <h2 className="section-title">Lead Instructor</h2>
          </div>

          <div className="overflow-hidden rounded-3xl border border-primary/15 bg-gradient-to-br from-primary/5 via-card to-secondary/5 shadow-lg">
            <div className="grid md:grid-cols-5">
              <div className="relative md:col-span-2">
                <img
                  src={IMAGES.team}
                  alt="Mohammad Shafaque Arif"
                  className="h-full min-h-[240px] w-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-950/40 to-transparent md:bg-gradient-to-r" />
              </div>
              <div className="flex flex-col justify-center p-8 md:col-span-3 md:p-10">
                <span className="pill-tag mb-3 w-fit">Expert-Led Training</span>
                <h3 className="mb-3 text-2xl font-bold text-brand-950 md:text-3xl">
                  Mohammad Shafaque Arif
                </h3>
                <p className="mb-6 leading-relaxed text-muted-foreground">
                  Experienced across Full Stack Development, DevOps, Cloud, AI/ML, and modern data
                  workflows — focused on helping learners build confidence through practical
                  implementation.
                </p>
                <ul className="mb-6 space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                    Full Stack & modern web architecture
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                    DevOps, CI/CD & cloud deployments
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                    AI/ML & data-driven applications
                  </li>
                </ul>
                <div className="flex flex-wrap gap-4 text-sm">
                  <a
                    href="mailto:support@zyvotrix.com"
                    className="inline-flex items-center gap-2 font-medium text-primary hover:underline"
                  >
                    <Mail className="h-4 w-4" /> Email
                  </a>
                  <a
                    href="https://www.linkedin.com/company/zyvotrix"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 font-medium text-primary hover:underline"
                  >
                    <Linkedin className="h-4 w-4" /> LinkedIn
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding section-white border-t border-border">
        <div className="container px-4 sm:px-6">
          <div className="flex flex-wrap justify-center gap-8 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-2.5">
              <MapPin className="h-4 w-4 text-primary" /> Bengaluru, Karnataka
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-2.5">
              <Phone className="h-4 w-4 text-primary" /> +91 8887720741
            </span>
          </div>
          <div className="mt-8 text-center">
            <Button asChild size="lg" className="btn-brand">
              <Link to="/contact">Talk to Our Team</Link>
            </Button>
          </div>
        </div>
      </section>

      <PageCta
        badge="Start today"
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
