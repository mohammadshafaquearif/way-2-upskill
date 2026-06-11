import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PROGRAMS } from '@/lib/programs';

const TopPrograms = () => (
  <section className="top-programs-section" id="programs" aria-labelledby="top-programs-heading">
    <div className="container px-4 sm:px-6">
      <header className="top-programs-header">
        <h2 id="top-programs-heading" className="top-programs-heading">
          Explore Our Top Programs
        </h2>
        <p className="top-programs-subtitle">
          Certification programs in AI-Powered DevOps, Agentic AI, AWS Solutions Architect, and
          Data Science with Python — each with structured modules, labs, and capstone projects.
        </p>
      </header>

      <div className="top-programs-grid">
        {PROGRAMS.map((program) => (
          <article key={program.id} className="top-program-card">
            <div className="top-program-card-media">
              <img
                src={program.image}
                alt={program.title}
                className="top-program-card-image"
                loading="lazy"
              />
              <div className="top-program-partner">
                <span className="top-program-partner-logo" aria-hidden>
                  Z
                </span>
                <span className="top-program-partner-name">{program.partner}</span>
              </div>
            </div>

            <div className="top-program-card-body">
              <h3 className="top-program-card-title">{program.title}</h3>
              <p className="top-program-card-meta">
                <span>Duration: {program.duration}</span>
              </p>
              <p className="top-program-card-meta">
                <span>Cohort Starts: {program.cohortStarts}</span>
              </p>
              <Button
                asChild
                variant="outline"
                className="top-program-card-btn"
              >
                <Link to={program.route}>View Program</Link>
              </Button>
            </div>
          </article>
        ))}
      </div>

      <div className="top-programs-footer">
        <Button asChild variant="outline" className="top-programs-view-all">
          <Link to="/courses">
            View all programs
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  </section>
);

export default TopPrograms;
