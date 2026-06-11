import React, { useRef } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WeekCard from '@/components/WeekCard';
import SyllabusHero from '@/components/SyllabusHero';
import SyllabusPageCta from '@/components/SyllabusPageCta';
import PageShell from '@/components/layout/PageShell';
import { IMAGES } from '@/lib/images';

const syllabusData = [
  {
    week: 1,
    title: 'Python for Data Science',
    objective: 'Build Python foundations for data manipulation, analysis, and visualization.',
    coreConcepts: [
      'Python syntax and data structures',
      'NumPy and Pandas fundamentals',
      'Data cleaning and preprocessing',
      'Exploratory data analysis (EDA)',
      'Matplotlib and Seaborn basics',
    ],
    deliverables: [
      'EDA notebook on a real dataset',
      'Data cleaning workflow',
      'Visualization portfolio piece',
    ],
    salesHook: 'Start with the language that powers modern data teams.',
    projectImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71',
  },
  {
    week: 2,
    title: 'Statistics & Machine Learning Basics',
    objective: 'Apply statistical thinking and introductory ML models to real datasets.',
    coreConcepts: [
      'Descriptive and inferential statistics',
      'Regression and classification models',
      'Model evaluation metrics',
      'Feature engineering basics',
      'Scikit-learn workflows',
    ],
    deliverables: [
      'Predictive modeling mini-project',
      'Model evaluation report',
      'Certification capstone proposal',
    ],
    salesHook: 'Move from analysis to prediction with job-relevant ML skills.',
    projectImage: 'https://images.unsplash.com/photo-1504639725590-34d0984388bd',
  },
];

const DataScienceSyllabus = () => {
  const weekRefs = useRef<(HTMLDivElement | null)[]>([]);

  return (
    <PageShell>
      <Navbar />

      <SyllabusHero
        title="Data Science with Python Certification Program"
        subtitle="A 2-month certification covering Python, data analysis, visualization, statistics, and introductory machine learning."
        image={IMAGES.programs.dataScience}
        checkoutPath="/checkout/data-science"
      />

      <section className="section-padding section-alt">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {syllabusData.map((week) => (
              <div
                key={week.week}
                id={`week-${week.week}`}
                ref={(el) => {
                  weekRefs.current[week.week - 1] = el;
                }}
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

      <SyllabusPageCta
        title="Ready to start Data Science with Python?"
        checkoutPath="/checkout/data-science"
      />

      <Footer />
    </PageShell>
  );
};

export default DataScienceSyllabus;
