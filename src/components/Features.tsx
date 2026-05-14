
import React from 'react';
import { 
  BookOpen, 
  Users, 
  Code, 
  Award, 
  Lightbulb, 
  Briefcase
} from 'lucide-react';

const featuresData = [
  {
    icon: <BookOpen />,
    title: "Comprehensive Curriculum",
    description: "From programming fundamentals to advanced specializations across AI/ML, Web Development, DevOps, Cybersecurity, and Cloud Computing."
  },
  {
    icon: <Users />,
    title: "One-to-One Mentorship",
    description: "Personalized guidance from industry experts tailored to your learning pace and career goals across all tech domains."
  },
  {
    icon: <Code />,
    title: "50+ Hands-on Projects",
    description: "Build a diverse portfolio of real-world projects across multiple technologies and domains that showcase your versatility."
  },
  {
    icon: <Award />,
    title: "Industry-Recognized Skills",
    description: "Develop the exact skills that top tech companies are hiring for across all major computer science specializations."
  },
  {
    icon: <Lightbulb />,
    title: "Domain-Specific Capstones",
    description: "Complete professional-grade capstone projects in your chosen specialization guided by industry mentors."
  },
  {
    icon: <Briefcase />,
    title: "Career Acceleration",
    description: "Resume optimization, technical interview prep, and networking opportunities across all tech career paths."
  }
];

const Features = () => {
  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="section-title">Why Choose Zyvotrix?</h2>
          <p className="section-subtitle">
            Our comprehensive programs equip you with industry-demanded skills across all major tech domains through personalized mentorship and hands-on projects
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuresData.map((feature, index) => (
            <div 
              key={index} 
              className="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover-card"
            >
              <div className="feature-icon mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
