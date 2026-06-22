import React from 'react';
import { Link } from 'react-router-dom';
import EnrollButton from '@/components/EnrollButton';
import DownloadBrochureButton from '@/components/courses/DownloadBrochureButton';
import {
  ArrowRight,
  Award,
  BarChart3,
  Brain,
  Briefcase,
  Calendar,
  Check,
  Clock,
  Code2,
  Database,
  GraduationCap,
  Hammer,
  Layers,
  LineChart,
  Search,
  Sparkles,
  TrendingUp,
  Zap,
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageShell from '@/components/layout/PageShell';
import PageCta from '@/components/PageCta';
import AmbientDepth from '@/components/motion/AmbientDepth';
import DataScienceHeroVisual from '@/components/motion/DataScienceHeroVisual';
import DepthCard from '@/components/motion/DepthCard';
import { Reveal3D, RevealStagger } from '@/components/motion/Reveal3D';
import { Button } from '@/components/ui/button';
import ProgramAdvantageSection, {
  type ProgramAdvantageContent,
} from '@/components/courses/ProgramAdvantageSection';
import ProgramCurriculumAccordion, {
  type CurriculumCapstone,
} from '@/components/courses/ProgramCurriculumAccordion';
import ProgramCurriculumStickySidebar from '@/components/courses/ProgramCurriculumStickySidebar';
import ProgramInquirySidebar from '@/components/courses/ProgramInquirySidebar';
import ProgramIndustryProjects, {
  type IndustryProject,
} from '@/components/courses/ProgramIndustryProjects';
import ProgramLearningExperience, {
  type LearningFeatureBlock,
} from '@/components/courses/ProgramLearningExperience';
import ProgramSectionAside from '@/components/courses/ProgramSectionAside';
import FAQList from '@/components/FAQList';
import { DATA_SCIENCE_TOOLS } from '@/lib/dataScienceTools';
import { COURSE_BY_ID } from '@/lib/courses';
import type { FaqItem } from '@/lib/faqs';
import { IMAGES } from '@/lib/images';
import { cn } from '@/lib/utils';
import { STATIC_PAGE_SEO } from '@/lib/seo';
import { buildCourseSchema } from '@/lib/courseSchema';
import { usePageMeta } from '@/hooks/usePageMeta';

const course = COURSE_BY_ID['data-science'];
const visuals = IMAGES.programVisuals.ds;
const dsCourseSchema = buildCourseSchema(course)!;

const curriculum = [
  {
    phase: 'Phase 1',
    label: 'Python, SQL & Data Analysis Foundations',
    outcome:
      'Analyze datasets, clean raw data, write SQL queries, and generate meaningful business insights using Python.',
    industryProject: {
      title: 'Mini Project 1 — Data Analysis Foundations',
      description:
        'Apply Python, Pandas, and SQL to analyze a real business dataset — clean raw data, run EDA, and deliver actionable insights.',
    },
    modules: [
      {
        id: 1,
        title: 'Python Fundamentals for Data Science',
        topics: [
          'Python fundamentals for data science',
          'Variables, functions, loops, lists, dictionaries',
          'File handling and JSON processing',
          'APIs and data extraction',
        ],
        project: {
          label: 'Lab',
          title: 'Python Data Extraction Script',
          description: 'Build a script that pulls data from files and APIs, then structures it for analysis.',
        },
      },
      {
        id: 2,
        title: 'NumPy & Pandas',
        topics: [
          'NumPy fundamentals',
          'Pandas DataFrames and data manipulation',
          'Filtering, grouping & aggregation',
          'Merging, joining & reshaping data',
        ],
        project: {
          label: 'Lab',
          title: 'Data Wrangling Notebook',
          description: 'Transform a messy dataset into an analysis-ready DataFrame with clean columns and types.',
        },
      },
      {
        id: 3,
        title: 'Data Cleaning & EDA',
        topics: [
          'Data cleaning and preprocessing',
          'Handling missing values and outliers',
          'Exploratory Data Analysis (EDA)',
          'Summary statistics & correlation analysis',
        ],
        project: {
          label: 'Lab',
          title: 'EDA Business Insights Report',
          description: 'Deliver a Jupyter notebook with cleaned data, EDA findings, and documented business insights.',
        },
      },
      {
        id: 4,
        title: 'SQL Fundamentals',
        topics: [
          'SQL fundamentals for data analysis',
          'Joins, aggregations, filtering',
          'Business queries and KPI extraction',
          'Connecting SQL results to Python workflows',
        ],
        project: {
          label: 'Lab',
          title: 'SQL Business Query Set',
          description: 'Write advanced SQL queries for joins, aggregations, and executive-level business reporting.',
        },
      },
    ],
  },
  {
    phase: 'Phase 2',
    label: 'Statistics, Visualization & Business Analytics',
    outcome:
      'Create business dashboards, identify trends, and communicate insights effectively through visual storytelling.',
    industryProject: {
      title: 'Mini Project 2 — Business Analytics Dashboard',
      description:
        'Build a KPI dashboard with Matplotlib, Seaborn, and Streamlit — tell a clear data story for business stakeholders.',
    },
    modules: [
      {
        id: 5,
        title: 'Statistics for Business Decisions',
        topics: [
          'Descriptive statistics',
          'Probability fundamentals',
          'Correlation analysis',
          'Hypothesis testing',
          'Sampling techniques',
        ],
        project: {
          label: 'Lab',
          title: 'Statistical Analysis Report',
          description: 'Run hypothesis tests on a business dataset and present statistically sound conclusions.',
        },
      },
      {
        id: 6,
        title: 'Data Visualization & Storytelling',
        topics: [
          'Data storytelling principles',
          'Data visualization with Matplotlib',
          'Seaborn visualizations',
          'KPI analysis and trend identification',
        ],
        project: {
          label: 'Project',
          title: 'Visualization Portfolio Piece',
          description: 'Create publication-quality charts that communicate trends and patterns to business audiences.',
        },
      },
      {
        id: 7,
        title: 'Business Analytics & Dashboards',
        topics: [
          'Dashboard development',
          'Business analytics workflows',
          'Reporting and presentation techniques',
          'Executive-level insight communication',
        ],
        project: {
          label: 'Project',
          title: 'Business Analytics Dashboard',
          description: 'Build an interactive dashboard with KPIs, trends, and stakeholder-ready reporting.',
        },
      },
    ],
  },
  {
    phase: 'Phase 3',
    label: 'Machine Learning & Portfolio Development',
    outcome:
      'Build, evaluate, and deploy machine learning solutions that solve real business problems.',
    industryProject: {
      title: 'Capstone Prep — ML Portfolio Sprint',
      description:
        'Complete regression, classification, and clustering projects — then scope and build your Customer Churn Prediction capstone.',
    },
    modules: [
      {
        id: 8,
        title: 'Machine Learning Workflow',
        topics: [
          'Machine Learning workflow end-to-end',
          'Feature engineering',
          'Train-test split & cross-validation',
          'Model evaluation metrics',
        ],
        project: {
          label: 'Lab',
          title: 'ML Pipeline Notebook',
          description: 'Build a reproducible ML workflow from raw data through feature engineering and evaluation.',
        },
      },
      {
        id: 9,
        title: 'Regression & Classification',
        topics: [
          'Regression algorithms',
          'Classification algorithms',
          'Decision Trees',
          'Random Forest',
          'Model performance comparison',
        ],
        project: {
          label: 'Project',
          title: 'Predictive Modeling Project',
          description: 'Train regression and classification models on real business data with full evaluation.',
        },
      },
      {
        id: 10,
        title: 'Clustering & Customer Segmentation',
        topics: [
          'Clustering techniques',
          'Customer segmentation strategies',
          'K-Means and segment profiling',
          'Business recommendations from segments',
        ],
        project: {
          label: 'Project',
          title: 'Customer Segmentation Engine',
          description: 'Group customers into meaningful segments based on behavior and demographics.',
        },
      },
      {
        id: 11,
        title: 'Deployment & Portfolio Development',
        topics: [
          'Streamlit application development',
          'Model deployment',
          'GitHub portfolio management',
          'Data science interview preparation',
        ],
        project: {
          label: 'Lab',
          title: 'Streamlit ML App',
          description: 'Deploy a trained model as an interactive Streamlit web application on GitHub.',
        },
      },
    ],
  },
];

const curriculumCapstone: CurriculumCapstone = {
  title: 'Customer Churn Prediction Platform',
  description:
    'Build a complete machine learning application that predicts customer churn and provides actionable business recommendations — your flagship portfolio piece.',
  builds: [
    'Data Cleaning Pipeline',
    'Exploratory Data Analysis Report',
    'Feature Engineering Workflow',
    'Machine Learning Model',
    'Performance Evaluation Dashboard',
    'Streamlit Web Application',
    'GitHub Repository',
    'Project Documentation',
  ],
  demonstrates: [
    'Data Cleaning Pipeline',
    'EDA Report',
    'Feature Engineering Workflow',
    'Trained ML Model',
    'Evaluation Dashboard',
    'Streamlit Deployment',
    'GitHub Portfolio',
    'Project Documentation',
  ],
  skills: [
    'Machine Learning',
    'Classification',
    'Data Visualization',
    'Deployment',
    'Streamlit',
    'GitHub',
    'Business Analytics',
    'Feature Engineering',
    'Scikit-Learn',
    'Pandas',
  ],
};

const curriculumPhaseOverview = [
  {
    phase: 'Phase 1',
    title: 'Python, SQL & Data Analysis Foundations',
    modules: [
      'Python Fundamentals',
      'NumPy & Pandas',
      'Data Cleaning & EDA',
      'SQL Fundamentals',
    ],
  },
  {
    phase: 'Phase 2',
    title: 'Statistics, Visualization & Business Analytics',
    modules: [
      'Descriptive & Inferential Statistics',
      'Matplotlib & Seaborn',
      'Business Analytics Dashboards',
    ],
  },
  {
    phase: 'Phase 3',
    title: 'Machine Learning & Portfolio Development',
    modules: [
      'ML Workflow & Feature Engineering',
      'Regression & Classification',
      'Clustering & Segmentation',
      'Streamlit Deployment & GitHub Portfolio',
    ],
  },
];

const programCommitment = [
  { label: 'Live Sessions', value: '4 Hours / Week' },
  { label: 'Hands-On Practice', value: '3–5 Hours / Week' },
  { label: 'Duration', value: '12 Weeks' },
  { label: 'Total Learning', value: '80+ Hours' },
];

const skillsMaster = [
  'Python',
  'SQL',
  'Data Cleaning',
  'Exploratory Data Analysis',
  'Statistics',
  'Data Visualization',
  'Business Analytics',
  'Machine Learning',
  'Regression',
  'Classification',
  'Clustering',
  'Feature Engineering',
  'Dashboard Development',
  'Streamlit',
  'GitHub Portfolio Development',
];

const careerPaths = [
  'Data Analyst',
  'Junior Data Scientist',
  'Business Analyst',
  'ML Engineer (Entry)',
  'Analytics Engineer',
  'Research Analyst',
  'BI Analyst',
];

const portfolioGraduationItems = [
  'Analyze real-world business datasets',
  'Write advanced SQL queries',
  'Build professional dashboards',
  'Perform statistical analysis',
  'Create machine learning models',
  'Deploy data applications',
  'Build a GitHub portfolio',
  'Prepare for Data Analyst & Junior Data Scientist interviews',
  'Solve business problems using data-driven approaches',
];

const prerequisites = [
  'No prior programming experience required — we start from Python basics',
  'Designed for international working professionals — weekend live sessions across time zones',
  'Basic math familiarity helps but is not mandatory',
  'Suitable for career switchers, analysts, and professionals upskilling globally',
];

const programFaqs: FaqItem[] = [
  {
    id: 'ds-what-is',
    category: 'programs',
    question: 'What is the Data Science & Machine Learning with Python program?',
    answer:
      'A structured 3-month certification that takes you from Python and SQL fundamentals through statistics, business analytics, visualization, and machine learning — with 6 industry projects and a Customer Churn Prediction capstone.',
  },
  {
    id: 'ds-beginners',
    category: 'programs',
    question: 'Is this data science course good for beginners?',
    answer:
      'Yes. The program starts from Python fundamentals and builds step-by-step through Pandas, SQL, statistics, visualization, and machine learning. No prior coding experience is required.',
  },
  {
    id: 'ds-projects',
    category: 'programs',
    question: 'What projects will I build?',
    answer:
      'You will build 6 industry projects: Retail Sales Analytics Dashboard, HR Attrition Analysis, Netflix Content Analytics, SQL BI Reporting System, House Price Prediction, and Customer Segmentation — plus a Customer Churn Prediction Platform capstone.',
  },
  {
    id: 'ds-recordings',
    category: 'learning',
    question: 'Will I get session recordings?',
    answer:
      'Yes. All live sessions are recorded and available for review so you can revisit lectures, notebook walkthroughs, and lab demos at your own pace — ideal for international working professionals.',
  },
  {
    id: 'ds-live',
    category: 'learning',
    question: 'Is this data science training program live?',
    answer:
      'Yes. This is a live, instructor-led program with weekend sessions (4 hours/week), hands-on Jupyter labs, and mentor feedback on your notebooks and projects.',
  },
  {
    id: 'ds-math',
    category: 'technical',
    question: 'Do I need advanced math knowledge?',
    answer:
      'No advanced math is required. We cover the statistics and ML concepts you need in plain language with practical Python examples — not theoretical proofs.',
  },
  {
    id: 'ds-jobs',
    category: 'career',
    question: 'What jobs can I apply for after this program?',
    answer:
      'Graduates pursue roles such as Data Analyst, Junior Data Scientist, Business Analyst, Analytics Engineer, BI Analyst, and entry-level ML Engineer positions globally.',
  },
  {
    id: 'ds-duration',
    category: 'programs',
    question: 'What is the duration of this data science certification course?',
    answer:
      'The program runs for 3 months (12 weeks) with 4 hours/week of live classes and 3–5 hours/week of hands-on practice — realistically completable while working full-time.',
  },
  {
    id: 'ds-tools',
    category: 'technical',
    question: 'What tools and libraries are covered?',
    answer:
      'Python, NumPy, Pandas, SQL, MySQL, Matplotlib, Seaborn, Scikit-Learn, Jupyter Notebook, VS Code, Git, GitHub, Streamlit, and GitHub Pages.',
  },
  {
    id: 'ds-portfolio',
    category: 'career',
    question: 'Will I have a portfolio after completing the program?',
    answer:
      'Yes. You graduate with 6 industry projects, an ML capstone with Streamlit deployment, Jupyter notebooks on GitHub, and interview-ready case study documentation.',
  },
  {
    id: 'ds-career-2026',
    category: 'career',
    question: 'Is data science still a good career choice in 2026?',
    answer:
      'Yes. Organizations worldwide continue hiring data analysts and data scientists for analytics, forecasting, and AI-driven decision-making. Python data skills remain among the most transferable in tech.',
  },
  {
    id: 'ds-vs-others',
    category: 'programs',
    question: 'How is this different from Edureka or other data science courses?',
    answer:
      'Zyvotrix is outcome-focused — 6 real business projects and a deployed ML capstone in 3 months. No bloated 16-module academic catalogs. Built for working professionals who need portfolio proof, not just certificates.',
  },
  {
    id: 'ds-working-pros',
    category: 'learning',
    question: 'Is this suitable for international working professionals?',
    answer:
      'Yes. The program is designed for working professionals globally with 4 hours/week of live sessions, recorded replays, and 3–5 hours/week of hands-on practice — approximately 7–9 hours total per week.',
  },
  {
    id: 'ds-missed-session',
    category: 'learning',
    question: 'What happens if I miss a live session?',
    answer:
      'Recorded sessions are available so you can catch up on lectures, notebook demos, and project walkthroughs without falling behind the cohort.',
  },
  {
    id: 'ds-zyvotrix-cert',
    category: 'programs',
    question: 'Do I receive a Zyvotrix certificate?',
    answer:
      'Yes. Upon completing all modules, projects, and the capstone review, you receive the Zyvotrix Certified Data Scientist & ML Professional (Python) certificate — shareable on LinkedIn with a digital badge.',
  },
  {
    id: 'ds-sql',
    category: 'technical',
    question: 'Is SQL covered in this program?',
    answer:
      'Yes. SQL fundamentals through advanced joins, aggregations, and business intelligence reporting are core to Phase 1 — essential for real data science workflows.',
  },
  {
    id: 'ds-laptop',
    category: 'technical',
    question: 'What laptop or setup do I need?',
    answer:
      'Any modern laptop (8GB RAM minimum) works. We cover Python, Jupyter, and VS Code setup in onboarding. Google Colab is available as a cloud alternative.',
  },
  {
    id: 'ds-capstone',
    category: 'programs',
    question: 'What is the capstone project?',
    answer:
      'The Customer Churn Prediction Platform — a complete ML application with data cleaning pipeline, EDA report, feature engineering, trained model, evaluation dashboard, Streamlit web app, and GitHub documentation.',
  },
];

const dsFaqColLeft = programFaqs.slice(0, 9);
const dsFaqColRight = programFaqs.slice(9);

const whyDataScience = [
  {
    icon: TrendingUp,
    title: 'High-Demand Skills',
    desc: 'Data analysts and data scientists are hired across finance, healthcare, e-commerce, and tech — Python skills transfer everywhere.',
  },
  {
    icon: BarChart3,
    title: 'Analytics Thinking',
    desc: 'Learn to ask the right questions, explore data systematically, and back decisions with evidence — not gut feeling.',
  },
  {
    icon: LineChart,
    title: 'Visualization Mastery',
    desc: 'Matplotlib, Seaborn, and Streamlit dashboards that communicate insights clearly to technical and business audiences.',
  },
  {
    icon: Brain,
    title: 'Machine Learning',
    desc: 'Regression, classification, and clustering with Scikit-learn — build models that predict outcomes from real data.',
  },
  {
    icon: Database,
    title: 'SQL & Data Wrangling',
    desc: 'SQL, MySQL, NumPy, and Pandas for extracting, cleaning, and preparing business datasets for analysis.',
  },
  {
    icon: Layers,
    title: 'Portfolio Projects',
    desc: 'Jupyter notebooks, ML models, and dashboards you can demo in interviews — not just certificates on paper.',
  },
];

const audience = [
  {
    icon: Briefcase,
    title: 'International Working Professionals',
    desc: 'Upskill with weekend live sessions and recorded replays — designed for full-time professionals across time zones.',
  },
  {
    icon: Code2,
    title: 'Career Switchers',
    desc: 'Transition into data roles with structured business projects, mentor feedback, and a portfolio that proves your skills.',
  },
  {
    icon: BarChart3,
    title: 'Business & Analytics Professionals',
    desc: 'Add Python, SQL, and ML skills to your existing domain expertise — no CS degree required.',
  },
  {
    icon: GraduationCap,
    title: 'Beginners with No CS Background',
    desc: 'Start from Python basics and build toward data analyst and junior data scientist roles globally.',
  },
];

const graduateCapabilities = [
  {
    icon: Hammer,
    title: 'Analyze Real Business Datasets',
    desc: 'Clean, explore, and summarize data with Python and Pandas — deliver EDA notebooks with actionable business insights.',
  },
  {
    icon: Database,
    title: 'Write Advanced SQL Queries',
    desc: 'Extract KPIs, run joins and aggregations, and build executive-level BI reports with SQL and MySQL.',
  },
  {
    icon: LineChart,
    title: 'Build Professional Dashboards',
    desc: 'Create Matplotlib, Seaborn, and Streamlit dashboards that communicate trends to business stakeholders.',
  },
  {
    icon: Search,
    title: 'Perform Statistical Analysis',
    desc: 'Apply hypothesis testing, correlation analysis, and sampling techniques to real business decisions.',
  },
  {
    icon: Brain,
    title: 'Create & Deploy ML Models',
    desc: 'Build regression, classification, and clustering models — deploy them as Streamlit data applications.',
  },
  {
    icon: Award,
    title: 'Interview-Ready Portfolio',
    desc: '6 industry projects plus a Customer Churn Prediction capstone on GitHub — ready for global data roles.',
  },
];

const certificatePerks = [
  'LinkedIn-ready digital certificate',
  'PDF + shareable badge',
  'Capstone project review included',
  'Portfolio & resume coaching',
];

const dsAdvantageContent: ProgramAdvantageContent = {
  eyebrow: 'The Zyvotrix Difference',
  headline: (
    <>
      Why Learners <span>Choose Zyvotrix</span>
    </>
  ),
  sub: 'A focused Data Science & Machine Learning with Python course — from analysis to deployed ML capstone. Built for international working professionals, completable in 3 months.',
  rows: [
    {
      need: 'Strong Python & SQL Foundations',
      zyvotrix: 'Python, NumPy, Pandas & SQL from day one with real business dataset practice',
      typical: 'Assumes you already know programming and databases',
    },
    {
      need: 'Hands-On Notebooks',
      zyvotrix: 'Jupyter labs every module — you write code, not just watch demos',
      typical: 'Slide decks with copy-paste examples',
    },
    {
      need: 'Statistics You Can Use',
      zyvotrix: 'Applied statistics with Python — hypothesis tests on real business data',
      typical: 'Theory-heavy lectures without practice',
    },
    {
      need: 'Visualization Skills',
      zyvotrix: 'Matplotlib, Seaborn & Streamlit dashboards in portfolio projects',
      typical: 'Basic charts with no storytelling practice',
    },
    {
      need: 'Machine Learning Depth',
      zyvotrix: 'Regression, classification & clustering with model evaluation labs',
      typical: 'Black-box ML tutorials without understanding',
    },
    {
      need: 'Portfolio Projects',
      zyvotrix: '6 progressive builds plus an end-to-end ML capstone on GitHub',
      typical: 'Toy datasets with no interview-ready work',
    },
    {
      need: 'Mentor Feedback',
      zyvotrix: 'Notebook reviews, project critiques & career coaching included',
      typical: 'No feedback until final exam',
    },
    {
      need: 'Career-Oriented Learning',
      zyvotrix: 'Structured path from beginner to junior data scientist roles',
      typical: 'Unstructured video playlists without a clear path',
    },
  ],
  traditionalVs: [
    { left: 'Watch Videos', right: 'Write Notebooks' },
    { left: 'Toy Datasets', right: 'Real Business Data' },
    { left: 'Theory Only', right: 'Build Models' },
    { left: 'Copy-Paste Code', right: 'Understand Every Step' },
    { left: 'Generic Quizzes', right: 'Industry Projects' },
    { left: 'Certificate Only', right: 'Portfolio + Skills' },
  ],
  othersVs: [
    { left: 'Lecture Heavy', right: 'Lab Heavy' },
    { left: 'Assumes Coding', right: 'Beginner Friendly' },
    { left: 'No Feedback', right: 'Mentor Reviews' },
    { left: 'Theory', right: 'Production Patterns' },
  ],
};

const DS_INDUSTRY_PROJECTS: IndustryProject[] = [
  {
    id: 1,
    label: 'Project 1',
    title: 'Retail Sales Analytics Dashboard',
    description:
      'Analyze customer purchasing behavior, product performance, and revenue trends using Python and Pandas.',
    skills: ['Python', 'Pandas', 'Data Cleaning', 'EDA', 'Business Analytics'],
  },
  {
    id: 2,
    label: 'Project 2',
    title: 'HR Analytics & Employee Attrition Analysis',
    description:
      'Identify employee retention patterns and workforce trends using data visualization and statistical analysis.',
    skills: ['Statistics', 'Data Visualization', 'Correlation Analysis', 'Business Insights'],
  },
  {
    id: 3,
    label: 'Project 3',
    title: 'Netflix Content Analytics Platform',
    description:
      'Analyze content trends, genres, ratings, and audience preferences using real-world datasets.',
    skills: ['Pandas', 'Seaborn', 'Data Storytelling', 'Trend Analysis'],
  },
  {
    id: 4,
    label: 'Project 4',
    title: 'SQL Business Intelligence Reporting System',
    description:
      'Create executive-level reports and KPI dashboards using advanced SQL queries.',
    skills: ['SQL', 'Joins', 'Aggregations', 'Reporting', 'Data Analysis'],
  },
  {
    id: 5,
    label: 'Project 5',
    title: 'House Price Prediction System',
    description:
      'Build a machine learning model that predicts real estate prices using historical housing data.',
    skills: ['Regression', 'Feature Engineering', 'Model Evaluation', 'Scikit-Learn'],
  },
  {
    id: 6,
    label: 'Project 6',
    title: 'Customer Segmentation Engine',
    description:
      'Group customers into meaningful segments based on purchasing behavior and demographics.',
    skills: ['K-Means Clustering', 'Segmentation', 'Business Analytics'],
  },
  {
    id: 7,
    label: 'Capstone Project',
    title: 'Customer Churn Prediction Platform',
    description:
      'Build a complete machine learning application that predicts customer churn and provides actionable business recommendations.',
    skills: [
      'Machine Learning',
      'Classification',
      'Data Visualization',
      'Deployment',
      'Streamlit',
      'GitHub',
      'Business Analytics',
    ],
    isCapstone: true,
  },
];

const learningExperienceFeatures: [LearningFeatureBlock, LearningFeatureBlock] = [
  {
    eyebrow: 'Learning Experience',
    title: 'Learn by Analyzing Real Data',
    description:
      'Weekend live sessions paired with hands-on Jupyter labs — you clean datasets, build models, and ship data projects every phase.',
    bullets: [
      'Live mentor-led sessions every weekend',
      'Labs on Pandas, statistics, visualization & ML',
      'Notebook projects you can demo in interviews',
    ],
    image: visuals.learning,
    imageAlt: 'Professional analyzing data visualizations and charts during hands-on data science learning at Zyvotrix',
    imageBadge: 'Live Sessions · Every Weekend',
  },
  {
    eyebrow: 'Expert Guidance',
    title: 'Mentorship from Data Practitioners',
    description:
      'Get notebook reviews, ML feedback, and career guidance from practitioners who work with data in production environments.',
    bullets: [
      'Notebook and project reviews every phase',
      'ML model feedback before capstone presentation',
      'Resume and portfolio coaching included',
    ],
    image: visuals.mentor,
    imageAlt: 'Data practitioner mentor providing expert guidance and project feedback at Zyvotrix',
    imageBadge: 'Working Data Practitioners',
    reverse: true,
  },
];

const learningExperienceStats = [
  { number: '12', label: 'Weeks', sublabel: '3 Months' },
  { number: '11', label: 'Hands-on Labs', sublabel: '& Modules' },
  { number: '7', label: 'Portfolio Projects', sublabel: '+ Capstone' },
];

const learningExperienceGallery = [
  {
    src: visuals.labs,
    alt: 'Hands-on data science labs — Python code and analytics dashboards on dual monitors',
    label: 'Data Science Labs',
    sublabel: 'Hands-on notebook practice',
  },
  {
    src: visuals.liveSessions,
    alt: 'Live mentor-led data science session — team reviewing data pipeline and dashboard insights',
    label: 'Live Sessions',
    sublabel: 'Every weekend, instructor-led',
  },
  {
    src: visuals.buildProjects,
    alt: 'Building data visualization and ML portfolio projects on analytics dashboard',
    label: 'Build Projects',
    sublabel: 'Ship real data science work',
  },
  {
    src: visuals.dataStack,
    alt: 'Data analyst working with Python dashboards — scatter plots, bar charts, and business analytics',
    label: 'Python Data Stack',
    sublabel: 'Pandas · NumPy · Scikit-learn',
  },
];

const heroTrustStats = [
  { value: '11', label: 'Modules' },
  { value: '6+', label: 'Portfolio Builds' },
  { value: 'Live', label: 'Mentorship' },
];

const TechMarquee = ({ tools, reverse }: { tools: typeof DATA_SCIENCE_TOOLS; reverse?: boolean }) => (
  <div className="devops-tech-marquee-wrap">
    <div className={`devops-tech-marquee${reverse ? ' devops-tech-marquee--reverse' : ''}`}>
      {[...tools, ...tools].map((tool, i) => (
        <span key={`${tool.name}-${i}`} className="devops-tech-pill">
          <img src={tool.icon} alt="" width={22} height={22} loading="lazy" decoding="async" />
          {tool.name}
        </span>
      ))}
    </div>
  </div>
);

const DataScienceProgram = () => {
  usePageMeta(STATIC_PAGE_SEO['/courses/data-science']);

  const techRowA = DATA_SCIENCE_TOOLS.slice(0, 7);
  const techRowB = DATA_SCIENCE_TOOLS.slice(7);

  return (
    <PageShell className="devops-program-page ds-program-page program-page-polish">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(dsCourseSchema) }}
      />
      <Navbar />

      <section className="program-landing-hero relative overflow-hidden">
        <AmbientDepth />
        <div className="hero-orb hero-orb-1 opacity-40" aria-hidden />
        <div className="hero-orb hero-orb-2 opacity-30" aria-hidden />
        <div className="hero-orb hero-orb-3 opacity-25" aria-hidden />
        <div className="hero-grid-overlay opacity-40" aria-hidden />

        <div className="program-page-container relative z-10 pb-16 pt-24 sm:pb-20 sm:pt-28">
          <div className="program-page-content program-hero-grid grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
            <div className="hero-fade-up program-hero-copy">
              <span className="program-hero-badge mb-4 inline-flex items-center gap-2 rounded-full border border-primary/25 bg-white/80 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-primary backdrop-blur-sm">
                <Sparkles className="h-3.5 w-3.5" />
                Python · SQL · Analytics · Machine Learning
              </span>
              <h1 className="program-hero-title mb-4 text-3xl font-bold leading-[1.08] tracking-tight text-brand-950 sm:text-4xl lg:text-[2.85rem]">
                <span className="gradient-text-animated">Data Science &amp; Machine Learning</span>
                <span className="block text-brand-950">with Python Certification Program</span>
              </h1>

              <div className="program-hero-tagline mb-6 max-w-xl rounded-2xl border border-primary/15 bg-gradient-to-br from-primary/5 via-white/90 to-sky-500/5 px-5 py-4 backdrop-blur-sm">
                <p className="text-sm font-semibold leading-snug text-foreground sm:text-base">
                  Built for{' '}
                  <span className="text-primary">international working professionals</span> — not academic theory overload.
                </p>
                <p className="mt-1 text-sm font-bold leading-snug text-primary sm:text-base">
                  Learn · Analyze · Predict with Python
                </p>
                <p className="mt-2 text-xs font-bold uppercase tracking-widest text-secondary">
                  Data Science &amp; ML Certification · 3 Months
                </p>
              </div>

              <p className="program-hero-lead mb-8 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                A structured 3-phase journey from Python and SQL through statistics, business analytics,
                visualization, and machine learning. Build{' '}
                <strong className="font-semibold text-foreground">6+ real business projects</strong> and a
                deployed ML capstone — job-ready in 3 months.
              </p>

              <div className="mb-8 flex flex-wrap gap-3 text-sm font-medium text-muted-foreground">
                <span className="flex items-center gap-2 rounded-lg border border-border/80 bg-card/90 px-3 py-2 shadow-sm backdrop-blur-sm">
                  <Clock className="h-4 w-4 text-primary" />
                  {course.duration}
                </span>
                <span className="flex items-center gap-2 rounded-lg border border-border/80 bg-card/90 px-3 py-2 shadow-sm backdrop-blur-sm">
                  <Calendar className="h-4 w-4 text-primary" />
                  Weekend · 2 hrs/day
                </span>
                <span className="flex items-center gap-2 rounded-lg border border-border/80 bg-card/90 px-3 py-2 shadow-sm backdrop-blur-sm">
                  <Zap className="h-4 w-4 text-primary" />
                  {course.projects} projects + capstone
                </span>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <EnrollButton programName={course.title} size="lg" className="btn-brand btn-shimmer h-12 px-8">
                  Enroll Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </EnrollButton>
                <DownloadBrochureButton
                  courseId={course.id}
                  size="lg"
                  variant="outline"
                  className="h-12 border-primary/20 px-8 backdrop-blur-sm"
                />
                <Button asChild size="lg" variant="outline" className="h-12 border-primary/20 px-8 backdrop-blur-sm">
                  <Link to="/contact">Talk to an Advisor</Link>
                </Button>
              </div>

              <div className="program-hero-trust mt-8 grid max-w-xl grid-cols-3 gap-3">
                {heroTrustStats.map((stat) => (
                  <div
                    key={stat.label}
                    className="program-hero-trust-item rounded-xl border border-border/70 bg-white/80 px-3 py-3 text-center shadow-sm backdrop-blur-sm"
                  >
                    <p className="font-display text-xl font-extrabold leading-none text-primary sm:text-2xl">
                      {stat.value}
                    </p>
                    <p className="mt-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground sm:text-xs">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="hero-fade-up program-hero-visual-col" style={{ animationDelay: '0.15s' }}>
              <DataScienceHeroVisual
                image={visuals.hero}
                imageAlt="Data science learner coding Python with ML dashboards, project notebook, and analytics tools — Zyvotrix certification program"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-white py-10 sm:py-12" id="program-commitment">
        <div className="program-page-container">
          <Reveal3D className="program-page-content">
            <div className="rounded-2xl border border-primary/15 bg-gradient-to-br from-primary/5 via-white to-sky-500/5 p-6 sm:p-8">
              <div className="mb-6 text-center">
                <span className="program-section-eyebrow mb-2 inline-block text-xs font-semibold uppercase tracking-widest text-primary">
                  Program Commitment
                </span>
                <h2 className="text-lg font-bold text-foreground sm:text-xl">
                  3-Month Data Science Program — Realistic for Working Professionals
                </h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  Weekend live data science training with hands-on Python, SQL, and ML labs every week — designed
                  for international learners.
                </p>
              </div>
              <RevealStagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4" staggerMs={60}>
                {programCommitment.map(({ label, value }) => (
                  <div
                    key={label}
                    className="rounded-xl border border-border/80 bg-white/90 px-4 py-4 text-center shadow-sm"
                  >
                    <p className="mb-1 text-xs font-bold uppercase tracking-widest text-primary">{label}</p>
                    <p className="font-display text-base font-bold text-foreground sm:text-lg">{value}</p>
                  </div>
                ))}
              </RevealStagger>
            </div>
          </Reveal3D>
        </div>
      </section>

      <section className="program-why-section border-b border-border bg-white py-14 sm:py-16" id="why-data-science">
        <div className="program-page-container">
          <Reveal3D className="program-page-header program-section-header">
            <span className="program-section-eyebrow mb-3 inline-block text-xs font-semibold uppercase tracking-widest text-primary">
              Why Data Science
            </span>
            <h2 className="program-section-title section-title mb-4">
              Beyond Spreadsheets — <span className="gradient-text-animated">Real Data Skills</span>
            </h2>
            <p className="program-section-lead leading-relaxed text-muted-foreground">
              Python data science skills power analytics careers worldwide — from SQL and dashboards to deployed
              ML models. Graduate with a portfolio that proves your work.
            </p>
          </Reveal3D>

          <RevealStagger
            className="program-page-content program-highlight-grid grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
            staggerMs={70}
          >
            {whyDataScience.map(({ icon: Icon, title, desc }, index) => (
              <DepthCard key={title} className={cn('h-full', index === 0 && 'sm:col-span-2 lg:col-span-2')} maxTilt={6}>
                <article
                  className={cn(
                    'program-highlight-card-accent program-highlight-card relative flex h-full gap-4 overflow-hidden rounded-2xl border border-border bg-card p-5 sm:p-6',
                    `program-highlight-card-accent--${index}`,
                    index === 0 && 'program-highlight-card-accent--featured',
                  )}
                >
                  <span className="program-highlight-card-accent-number" aria-hidden>
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div
                    className={cn(
                      'program-highlight-card-accent-icon flex shrink-0 items-center justify-center rounded-xl',
                      `program-highlight-card-accent-icon--${index}`,
                    )}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="relative z-[1] text-left">
                    <h3 className="mb-2 font-display text-sm font-bold text-foreground sm:text-base">{title}</h3>
                    <p className="text-xs leading-relaxed text-muted-foreground sm:text-sm">{desc}</p>
                  </div>
                </article>
              </DepthCard>
            ))}
          </RevealStagger>
        </div>
      </section>

      <ProgramAdvantageSection content={dsAdvantageContent} />

      <section className="section-padding section-alt program-curriculum-section" id="curriculum">
        <div className="program-page-container">
          <Reveal3D className="program-page-header program-section-header">
            <span className="program-section-eyebrow mb-3 inline-block text-xs font-semibold uppercase tracking-widest text-primary">
              Curriculum
            </span>
            <h2 className="program-section-title section-title mb-4">
              From Data Analysis to <span className="gradient-text-animated">Machine Learning</span>
            </h2>
            <p className="program-section-lead leading-relaxed text-muted-foreground">
              11 modules across 3 phases — structured for international working professionals. Learn Python, SQL,
              data analysis, visualization, statistics, and machine learning by building real-world business
              projects. Completable in 3 months.
            </p>
          </Reveal3D>

          <div className="program-page-content program-curriculum-layout">
            <div className="program-curriculum-main min-w-0">
              <RevealStagger className="mb-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-3" staggerMs={70}>
                {curriculumPhaseOverview.map((phase) => (
                  <div
                    key={phase.phase}
                    className="rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-6"
                  >
                    <p className="mb-1 text-xs font-bold uppercase tracking-widest text-primary">{phase.phase}</p>
                    <h3 className="mb-4 font-display text-lg font-bold text-foreground">{phase.title}</h3>
                    <ul className="space-y-2">
                      {phase.modules.map((mod) => (
                        <li key={mod} className="flex items-start gap-2 text-sm text-foreground">
                          <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" strokeWidth={2.5} />
                          {mod}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </RevealStagger>

              <Reveal3D>
                <h3 className="mb-6 text-xl font-bold text-foreground sm:text-2xl">Learning Path</h3>
                <ProgramCurriculumAccordion phases={curriculum} variant="premium" capstone={curriculumCapstone} />
              </Reveal3D>
            </div>

            <ProgramCurriculumStickySidebar>
              <ProgramInquirySidebar programName={course.title} programCode={course.code} />
            </ProgramCurriculumStickySidebar>
          </div>
        </div>
      </section>

      <ProgramLearningExperience
        features={learningExperienceFeatures}
        stats={learningExperienceStats}
        gallery={learningExperienceGallery}
        eyebrow="How You Learn at Zyvotrix"
        headline={
          <>
            Built for <span>Analysts,</span> Not Spreadsheet Tourists
          </>
        }
        sub="Every session, lab, and project moves you from Python basics to production-ready data science skills."
        galleryLabel="Inside the Data Science Program Experience"
        sectionClassName="program-lx-section program-lx-section--compact"
      />

      <ProgramIndustryProjects
        projects={DS_INDUSTRY_PROJECTS}
        eyebrow="Portfolio"
        title="Portfolio You'll Graduate With"
        description="Six real-world business projects and a Customer Churn Prediction Platform capstone — built for data analyst, business analyst, and junior data scientist roles globally."
        portfolioOutcomeTitle="After Completing This Program"
        portfolioOutcomeItems={portfolioGraduationItems}
      />

      <section className="section-padding border-y border-border bg-brand-100/30 devops-section-glow">
        <div className="program-page-container">
          <Reveal3D className="program-page-header program-section-header !mb-10 text-center">
            <span className="program-section-eyebrow mb-3 inline-block text-xs font-semibold uppercase tracking-widest text-primary">
              Tech Stack
            </span>
            <h2 className="program-section-title section-title mb-3">
              Python Tools You&apos;ll <span className="gradient-text-animated">Master</span>
            </h2>
            <p className="program-section-lead mb-10 text-muted-foreground">
              Programming, databases, visualization, ML, and deployment — every tool maps directly to a module.
            </p>
          </Reveal3D>

          <RevealStagger className="program-page-content devops-tools-grid aac-tools-grid" staggerMs={40}>
            {DATA_SCIENCE_TOOLS.map((tool) => (
              <div key={tool.name} className="devops-tool-card">
                <div className="devops-tool-card-icon">
                  <img
                    src={tool.icon}
                    alt={tool.name}
                    width={44}
                    height={44}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <span className="devops-tool-card-name">{tool.name}</span>
              </div>
            ))}
          </RevealStagger>

          <Reveal3D delay={80} className="program-page-content">
            <TechMarquee tools={techRowA} />
            <TechMarquee tools={techRowB} reverse />
          </Reveal3D>
        </div>
      </section>

      <section className="section-padding section-white" id="who-should-join">
        <div className="program-page-container">
          <Reveal3D className="program-page-header program-section-header">
            <span className="program-section-eyebrow mb-3 inline-block text-xs font-semibold uppercase tracking-widest text-primary">
              Who Should Join
            </span>
            <h2 className="program-section-title section-title mb-4">Is This Program For You?</h2>
            <p className="program-section-lead leading-relaxed text-muted-foreground">
              Designed for international working professionals who want portfolio-ready data skills — not just theory.
            </p>
          </Reveal3D>

          <Reveal3D className="program-page-content">
            <ProgramSectionAside
              image={visuals.audience}
              imageAlt="International working professional upskilling in data science with Python at Zyvotrix"
              caption="For working professionals, career switchers, and beginners globally"
              className="program-section-aside--audience"
            >
              <RevealStagger className="grid gap-4 sm:grid-cols-2" staggerMs={90}>
                {audience.map(({ icon: Icon, title, desc }, index) => (
                  <DepthCard key={title} className="h-full" maxTilt={6}>
                    <article
                      className={cn(
                        'program-audience-card flex h-full gap-4 rounded-2xl border border-border bg-card p-5 sm:p-6',
                        `program-audience-card--${index}`,
                      )}
                    >
                      <div
                        className={cn(
                          'flex h-11 w-11 shrink-0 items-center justify-center rounded-xl',
                          `program-audience-card-icon--${index}`,
                        )}
                      >
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="mb-2 font-display font-bold text-foreground">{title}</h3>
                        <p className="text-sm leading-relaxed text-muted-foreground">{desc}</p>
                      </div>
                    </article>
                  </DepthCard>
                ))}
              </RevealStagger>
            </ProgramSectionAside>
          </Reveal3D>
        </div>
      </section>

      <section className="section-padding section-alt devops-section-glow" id="outcomes">
        <div className="program-page-container">
          <Reveal3D className="program-page-header program-section-header">
            <span className="program-section-eyebrow mb-3 inline-block text-xs font-semibold uppercase tracking-widest text-primary">
              After You Graduate
            </span>
            <h2 className="program-section-title section-title mb-4">What You&apos;ll Be Capable Of</h2>
            <p className="program-section-lead leading-relaxed text-muted-foreground">
              Build in-demand data science skills and a portfolio that gets you hired.
            </p>
          </Reveal3D>

          <ProgramSectionAside
            image={visuals.career}
            imageAlt="Data professional analyzing customer dashboards, sales analytics, and segmentation with Python at Zyvotrix"
            caption="Build dashboards, ML models, and portfolio-ready data science skills"
            imageFit="cover"
            reverse
            className="program-section-aside--career program-page-content mb-14"
          >
            <RevealStagger className="grid gap-5 sm:grid-cols-2" staggerMs={75}>
              {graduateCapabilities.map(({ icon: Icon, title, desc }) => (
                <DepthCard key={title} className="h-full" maxTilt={5}>
                  <article className="program-walkaway-card h-full rounded-2xl border border-border bg-card p-6">
                    <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="mb-2 font-bold text-foreground">{title}</h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">{desc}</p>
                  </article>
                </DepthCard>
              ))}
            </RevealStagger>
          </ProgramSectionAside>

          <Reveal3D delay={60} className="program-page-content mb-14">
            <div className="rounded-2xl border border-border bg-card p-6 sm:p-8">
              <div className="mb-6 text-center sm:text-left">
                <span className="program-section-eyebrow mb-2 inline-block text-xs font-semibold uppercase tracking-widest text-primary">
                  Career Paths
                </span>
                <h3 className="text-xl font-bold text-foreground sm:text-2xl">
                  Career Opportunities After This Program
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Roles this data science certification course prepares you for across India and global markets.
                </p>
              </div>
              <div className="flex flex-wrap justify-center gap-3 sm:justify-start">
                {careerPaths.map((role) => (
                  <span
                    key={role}
                    className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-sm font-semibold text-foreground"
                  >
                    <Briefcase className="h-3.5 w-3.5 text-primary" />
                    {role}
                  </span>
                ))}
              </div>
            </div>
          </Reveal3D>

          <Reveal3D delay={100}>
            <div className="devops-glow-card program-page-content">
              <div className="devops-glow-card-inner p-8 sm:p-10">
                <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
                  <div>
                    <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-widest text-primary">
                      On Completion
                    </span>
                    <h3 className="mb-2 text-2xl font-bold text-foreground sm:text-3xl">What You Earn</h3>
                    <p className="mb-4 text-lg font-semibold text-primary">
                      Zyvotrix Certified Data Scientist &amp; ML Professional (Python)
                    </p>
                    <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                      Upon completing all modules, projects, and the capstone, you receive the Zyvotrix Certified
                      Data Scientist &amp; ML Professional (Python) certificate — plus a GitHub portfolio of
                      business projects and a deployed Streamlit ML application.
                    </p>
                    <p className="mb-4 mt-6 text-sm font-bold uppercase tracking-widest text-muted-foreground">
                      Certificate Includes
                    </p>
                    <ul className="space-y-2.5">
                      {certificatePerks.map((perk) => (
                        <li key={perk} className="flex items-center gap-2.5 text-sm font-medium text-foreground">
                          <Check className="h-4 w-4 shrink-0 text-primary" strokeWidth={2.5} />
                          {perk}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <figure className="program-certificate-preview">
                    <img
                      src={visuals.certificate}
                      alt="Zyvotrix Data Science & Machine Learning with Python Certification Program certificate of completion — sample"
                      className="program-certificate-preview-image"
                      loading="lazy"
                      decoding="async"
                    />
                  </figure>
                </div>
              </div>
            </div>
          </Reveal3D>
        </div>
      </section>

      <section className="section-padding section-white border-t border-border" id="skills-master">
        <div className="program-page-container">
          <Reveal3D className="program-page-header program-section-header">
            <span className="program-section-eyebrow mb-3 inline-block text-xs font-semibold uppercase tracking-widest text-primary">
              Learning Outcomes
            </span>
            <h2 className="program-section-title section-title mb-4">
              Skills You&apos;ll <span className="gradient-text-animated">Master</span>
            </h2>
            <p className="program-section-lead leading-relaxed text-muted-foreground">
              Core Python, SQL, and ML skills covered in this program — aligned to data analyst and junior data
              scientist roles globally.
            </p>
          </Reveal3D>

          <RevealStagger
            className="program-page-content flex flex-wrap justify-center gap-2.5 sm:justify-start"
            staggerMs={30}
          >
            {skillsMaster.map((skill) => (
              <span
                key={skill}
                className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-sm font-semibold text-foreground"
              >
                {skill}
              </span>
            ))}
          </RevealStagger>
        </div>
      </section>

      <section className="section-padding section-alt border-t border-border" id="prerequisites">
        <div className="program-page-container">
          <Reveal3D className="program-page-header program-section-header">
            <span className="program-section-eyebrow mb-3 inline-block text-xs font-semibold uppercase tracking-widest text-primary">
              Before You Enroll
            </span>
            <h2 className="program-section-title section-title mb-4">Prerequisites</h2>
            <p className="program-section-lead leading-relaxed text-muted-foreground">
              No prior programming experience required — built for motivated beginners and international working
              professionals.
            </p>
          </Reveal3D>

          <Reveal3D className="program-page-content">
            <ul className="mx-auto max-w-2xl space-y-3 rounded-2xl border border-border bg-card p-6 sm:p-8">
              {prerequisites.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-foreground sm:text-base">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" strokeWidth={2.5} />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal3D>
        </div>
      </section>

      <section className="section-padding section-white border-t border-border" id="faq">
        <div className="program-page-container">
          <Reveal3D className="program-page-header program-section-header">
            <span className="program-section-eyebrow mb-3 inline-block text-xs font-semibold uppercase tracking-widest text-primary">
              FAQ
            </span>
            <h2 className="program-section-title section-title mb-4">Data Science Program FAQs</h2>
            <p className="program-section-lead leading-relaxed text-muted-foreground">
              Answers about this data science certification course, projects, tools, and career outcomes.
            </p>
          </Reveal3D>

          <Reveal3D className="program-page-content grid gap-6 lg:grid-cols-2 lg:gap-8">
            <FAQList faqs={dsFaqColLeft} />
            <FAQList faqs={dsFaqColRight} includeSchema schemaFaqs={programFaqs} />
          </Reveal3D>
        </div>
      </section>

      <div className="program-footer-bridge" aria-hidden />

      <PageCta
        badge="Start your data science journey"
        title="Ready to Become a Data Scientist?"
        description="Join the Data Science & Machine Learning with Python program — 6+ business projects, deployed ML capstone, and job-ready skills in 3 months."
        primaryLabel="Enroll Now"
        primaryHref={course.checkoutPath}
        programName={course.title}
        secondaryLabel="View All Programs"
        secondaryHref="/courses"
        className="program-page-cta"
      />

      <Footer />
    </PageShell>
  );
};

export default DataScienceProgram;
