
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
    title: "Python Programming & Data Structures",
    objective: "Master Python fundamentals and essential data structures for AI/ML development.",
    coreConcepts: [
      "Python Syntax and Programming Fundamentals",
      "Data Structures: Lists, Dictionaries, Sets, Tuples",
      "Object-Oriented Programming in Python",
      "File Handling and Exception Management",
      "NumPy for Numerical Computing"
    ],
    deliverables: [
      "Python Fundamentals Project",
      "Data Structure Algorithms Implementation",
      "OOP-based Calculator Application"
    ],
    salesHook: "Build the programming foundation that powers AI systems at Google and OpenAI.",
    projectImage: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4"
  },
  {
    week: 2,
    title: "Data Analysis with Pandas & Visualization",
    objective: "Learn data manipulation, analysis, and visualization techniques essential for ML projects.",
    coreConcepts: [
      "Pandas DataFrames and Series Operations",
      "Data Cleaning and Preprocessing Techniques",
      "Statistical Analysis and Data Exploration",
      "Matplotlib and Seaborn for Visualization",
      "Working with Real-world Datasets"
    ],
    deliverables: [
      "Comprehensive Data Analysis Report",
      "Interactive Data Visualization Dashboard",
      "Data Cleaning Pipeline"
    ],
    salesHook: "Analyze data like data scientists at Netflix and Spotify to drive business decisions.",
    projectImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71"
  },
  {
    week: 3,
    title: "Machine Learning Fundamentals",
    objective: "Understand core ML concepts and implement your first machine learning models.",
    coreConcepts: [
      "Supervised vs Unsupervised Learning",
      "Linear and Logistic Regression",
      "Decision Trees and Random Forests",
      "Model Evaluation and Cross-validation",
      "Feature Engineering and Selection"
    ],
    deliverables: [
      "Customer Segmentation ML Model",
      "Predictive Analytics Dashboard",
      "Model Performance Comparison Study"
    ],
    salesHook: "Build prediction models that companies use to make million-dollar decisions.",
    projectImage: "https://images.unsplash.com/photo-1518770660439-4636190af475"
  },
  {
    week: 4,
    title: "Advanced Machine Learning & Deep Learning Foundations",
    objective: "Explore advanced ML algorithms and begin your deep learning journey.",
    coreConcepts: [
      "Support Vector Machines and Clustering",
      "Neural Network Fundamentals",
      "Introduction to TensorFlow and Keras",
      "Gradient Descent and Backpropagation",
      "Regularization Techniques"
    ],
    deliverables: [
      "Advanced Classification System",
      "First Neural Network Implementation",
      "ML Algorithm Comparison Framework"
    ],
    salesHook: "Create the foundation for AI systems that power autonomous vehicles and medical diagnosis.",
    projectImage: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e"
  },
  {
    week: 5,
    title: "Deep Learning & Neural Networks",
    objective: "Master deep learning architectures and build sophisticated neural networks.",
    coreConcepts: [
      "Convolutional Neural Networks (CNNs)",
      "Recurrent Neural Networks (RNNs) and LSTMs",
      "Transfer Learning and Pre-trained Models",
      "Deep Learning Best Practices",
      "Model Optimization and Hyperparameter Tuning"
    ],
    deliverables: [
      "Image Classification System",
      "Time Series Prediction Model",
      "Transfer Learning Application"
    ],
    salesHook: "Build the same neural networks that power image recognition in smartphones and medical imaging.",
    projectImage: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485"
  },
  {
    week: 6,
    title: "Natural Language Processing (NLP)",
    objective: "Process and understand human language using advanced NLP techniques.",
    coreConcepts: [
      "Text Preprocessing and Tokenization",
      "Word Embeddings and Semantic Analysis",
      "Sentiment Analysis and Classification",
      "Named Entity Recognition (NER)",
      "Introduction to Transformers"
    ],
    deliverables: [
      "Sentiment Analysis Web App",
      "Chatbot with NLP Capabilities",
      "Text Classification System"
    ],
    salesHook: "Create language understanding systems like those powering Google Translate and Alexa.",
    projectImage: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3"
  },
  {
    week: 7,
    title: "Generative AI & Large Language Models",
    objective: "Master cutting-edge generative AI technologies and large language models.",
    coreConcepts: [
      "Introduction to Generative Models",
      "Working with OpenAI GPT APIs",
      "Prompt Engineering and Fine-tuning",
      "RAG (Retrieval Augmented Generation)",
      "LangChain Framework for AI Applications"
    ],
    deliverables: [
      "GPT-powered Application",
      "Custom RAG System",
      "AI Content Generation Platform"
    ],
    salesHook: "Build the next generation of AI applications like ChatGPT and GitHub Copilot.",
    projectImage: "https://images.unsplash.com/photo-1677442136019-21780ecad995"
  },
  {
    week: 8,
    title: "MLOps & AI System Deployment",
    objective: "Deploy, monitor, and maintain AI systems in production environments.",
    coreConcepts: [
      "Model Deployment Strategies",
      "Docker for ML Applications",
      "CI/CD for Machine Learning",
      "Model Monitoring and Maintenance",
      "Cloud Deployment (AWS, Azure, GCP)"
    ],
    deliverables: [
      "Deployed ML Model API",
      "MLOps Pipeline Implementation",
      "Production AI System with Monitoring"
    ],
    salesHook: "Deploy AI systems that can handle millions of users like production systems at top tech companies.",
    projectImage: "https://images.unsplash.com/photo-1519389950473-47ba0277781c"
  }
];

const AiMlSyllabus = () => {
  // Create refs for each week section
  const weekRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Function to scroll to a specific week
  const scrollToWeek = (weekNumber: number) => {
    const index = weekNumber - 1; // Convert from 1-based to 0-based index
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
        title="Agentic AI Certification Training (AAC)"
        subtitle="A 3-month certification on intelligent agents, LLM workflows, and production-ready AI automation systems."
        image={IMAGES.programs.aac}
        checkoutPath="/checkout/aac"
      />
      
      <section className="section-padding section-alt">
        <div className="container px-4 md:px-6">
          <div className="mb-12">
            <h2 className="section-title">Your Learning Journey</h2>
            <p className="section-subtitle max-w-3xl mb-8 mx-0 text-left">
              From Python basics to deploying AI systems, master the complete AI/ML stack used by leading tech companies.
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
          
          {/* Week Cards */}
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
      
      <SyllabusPageCta title="Ready to start the AAC program?" checkoutPath="/checkout/aac" />

      <Footer />
    </PageShell>
  );
};

export default AiMlSyllabus;
