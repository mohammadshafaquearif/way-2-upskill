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
    title: "Frontend Foundations - HTML, CSS & JavaScript",
    objective: "Master the core building blocks of web development with modern HTML5, CSS3, and ES6+ JavaScript.",
    coreConcepts: [
      "Semantic HTML5 and Accessibility",
      "CSS Grid, Flexbox, and Responsive Design",
      "JavaScript ES6+: Arrow Functions, Promises, Async/Await",
      "DOM Manipulation and Event Handling",
      "CSS Preprocessors (Sass/SCSS)"
    ],
    deliverables: [
      "Responsive Portfolio Website",
      "Interactive JavaScript Calculator",
      "CSS Animation Showcase"
    ],
    salesHook: "Build beautiful, responsive websites that work perfectly on any device.",
    projectImage: "https://images.unsplash.com/photo-1498050108023-c5249f4df085"
  },
  {
    week: 2,
    title: "React.js Mastery - Components & State Management",
    objective: "Learn React fundamentals and build dynamic, interactive user interfaces.",
    coreConcepts: [
      "React Components: Functional vs Class Components",
      "JSX, Props, and State Management",
      "React Hooks: useState, useEffect, useContext",
      "Event Handling and Forms in React",
      "React Router for Navigation"
    ],
    deliverables: [
      "Todo App with Local Storage",
      "Weather Dashboard with API Integration",
      "E-commerce Product Catalog"
    ],
    salesHook: "Master the most popular frontend framework used by companies like Netflix and Airbnb.",
    projectImage: "https://images.unsplash.com/photo-1633356122544-f134324a6cee"
  },
  {
    week: 3,
    title: "Advanced React & State Management",
    objective: "Dive deeper into React with advanced patterns and state management libraries.",
    coreConcepts: [
      "Redux Toolkit for State Management",
      "React Context API and useReducer",
      "Custom Hooks and Higher-Order Components",
      "React Performance Optimization",
      "Testing React Components with Jest"
    ],
    deliverables: [
      "Social Media Dashboard with Redux",
      "Real-time Chat Application",
      "Task Management System"
    ],
    salesHook: "Build enterprise-level React applications with scalable architecture.",
    projectImage: "https://images.unsplash.com/photo-1555949963-aa79dcee981c"
  },
  {
    week: 4,
    title: "Backend Development with Node.js & Express",
    objective: "Build robust server-side applications with Node.js and Express framework.",
    coreConcepts: [
      "Node.js Fundamentals and NPM",
      "Express.js Framework and Middleware",
      "RESTful API Design and Development",
      "Authentication and Authorization (JWT)",
      "File Upload and Image Processing"
    ],
    deliverables: [
      "RESTful API for Blog Platform",
      "User Authentication System",
      "File Upload Service"
    ],
    salesHook: "Create powerful backend systems that can handle millions of users.",
    projectImage: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31"
  },
  {
    week: 5,
    title: "Database Design & MongoDB Integration",
    objective: "Master database design and integration with MongoDB and Mongoose ODM.",
    coreConcepts: [
      "MongoDB Database Design and Collections",
      "Mongoose ODM and Schema Design",
      "Database Relationships and Population",
      "Aggregation Pipeline and Indexing",
      "Database Security and Validation"
    ],
    deliverables: [
      "E-commerce Database Schema",
      "User Management System with MongoDB",
      "Analytics Dashboard with Aggregation"
    ],
    salesHook: "Design and manage databases that power modern web applications.",
    projectImage: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d"
  },
  {
    week: 6,
    title: "Full-Stack Integration & Real-time Features",
    objective: "Connect frontend and backend with real-time communication and modern deployment.",
    coreConcepts: [
      "CORS and API Integration",
      "WebSocket and Socket.io for Real-time Features",
      "Payment Integration (Stripe)",
      "Email Services and Notifications",
      "Error Handling and Logging"
    ],
    deliverables: [
      "Real-time Chat Application",
      "E-commerce Platform with Payments",
      "Notification System"
    ],
    salesHook: "Build complete applications with real-time features like Slack and WhatsApp.",
    projectImage: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3"
  },
  {
    week: 7,
    title: "Testing, Security & Performance Optimization",
    objective: "Implement testing strategies, security measures, and optimize application performance.",
    coreConcepts: [
      "Unit Testing with Jest and React Testing Library",
      "Integration and End-to-End Testing",
      "Security Best Practices and OWASP Guidelines",
      "Performance Optimization and Caching",
      "Code Quality and ESLint Configuration"
    ],
    deliverables: [
      "Comprehensive Test Suite",
      "Security Audit Report",
      "Performance Optimization Case Study"
    ],
    salesHook: "Write production-ready code that's secure, tested, and performant.",
    projectImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71"
  },
  {
    week: 8,
    title: "DevOps & Deployment - CI/CD Pipeline",
    objective: "Deploy applications using modern DevOps practices and cloud platforms.",
    coreConcepts: [
      "Git Workflow and Version Control",
      "Docker Containerization",
      "CI/CD with GitHub Actions",
      "Cloud Deployment (AWS, Heroku, Vercel)",
      "Monitoring and Error Tracking"
    ],
    deliverables: [
      "Dockerized Full-Stack Application",
      "CI/CD Pipeline Setup",
      "Production Deployment with Monitoring"
    ],
    salesHook: "Deploy your applications like tech giants with automated pipelines and monitoring.",
    projectImage: "https://images.unsplash.com/photo-1519389950473-47ba0277781c"
  },
  {
    week: 9,
    title: "Modern Frontend Frameworks & Tools",
    objective: "Explore modern development tools and frameworks for efficient development.",
    coreConcepts: [
      "Next.js for Server-Side Rendering",
      "TypeScript for Type Safety",
      "Tailwind CSS for Rapid Styling",
      "GraphQL and Apollo Client",
      "Progressive Web Apps (PWA)"
    ],
    deliverables: [
      "Next.js E-commerce Site",
      "TypeScript React Application",
      "PWA with Offline Capabilities"
    ],
    salesHook: "Use cutting-edge tools that modern development teams rely on daily.",
    projectImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f"
  },
  {
    week: 10,
    title: "Capstone Project & Portfolio Development",
    objective: "Build a comprehensive full-stack application and create a professional portfolio.",
    coreConcepts: [
      "Project Planning and Architecture Design",
      "Agile Development Methodology",
      "Code Review and Collaboration",
      "Portfolio Website Development",
      "Interview Preparation and Technical Presentation"
    ],
    deliverables: [
      "Full-Stack Capstone Project",
      "Professional Portfolio Website",
      "Technical Presentation and Demo"
    ],
    salesHook: "Create a portfolio that showcases your skills to top tech companies.",
    projectImage: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f"
  }
];

const WebDevSyllabus = () => {
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
        title="Full Stack Web Development"
        subtitle="A 10-week journey from frontend fundamentals to full-stack mastery — with hands-on projects and modern development practices."
        image={IMAGES.programs.webDev}
        checkoutPath="/checkout/web-dev"
      />
      
      <section className="section-padding section-alt">
        <div className="container px-4 md:px-6">
          <div className="mb-12">
            <h2 className="section-title">Your Learning Journey</h2>
            <p className="section-subtitle max-w-3xl mb-8 mx-0 text-left">
              From frontend basics to deploying full-stack applications, master the complete web development stack used by leading tech companies.
            </p>
          </div>
          
          {/* Roadmap Journey Visual */}
          <div className="relative mb-16 hidden md:block">
            <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-primary/30 -translate-x-1/2"></div>
            
            {syllabusData.map((week, index) => (
              <div 
                key={week.week} 
                className={`relative mb-24 flex items-center ${
                  index % 2 === 0 ? 'justify-start' : 'justify-end'
                }`}
              >
                <div className={`w-10 h-10 rounded-full bg-primary absolute left-1/2 -translate-x-1/2 flex items-center justify-center text-white font-bold z-10`}>
                  {week.week}
                </div>
                <div className={`w-1/2 p-2 ${index % 2 === 0 ? 'pr-12' : 'pl-12'}`}>
                  <div className="timeline-card">
                    <h3 className="text-xl font-bold mb-2">{week.title}</h3>
                    <p className="mb-4 text-muted-foreground">{week.objective}</p>
                    <div className="flex justify-between items-center">
                      <span className="pill-tag">WEEK {week.week}</span>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => scrollToWeek(week.week)}
                      >
                        Details
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          
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
      
      <SyllabusPageCta
        title="Ready to become a Full Stack Developer?"
        checkoutPath="/checkout/web-dev"
      />

      <Footer />
    </PageShell>
  );
};

export default WebDevSyllabus;
