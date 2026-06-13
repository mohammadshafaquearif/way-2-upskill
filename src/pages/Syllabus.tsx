
import React, { useRef } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WeekCard from '@/components/WeekCard';
import { Button } from '@/components/ui/button';
import EnrollButton from '@/components/EnrollButton';
import { Link } from 'react-router-dom';

const syllabusData = [
  {
    week: 1,
    title: "Ground Zero - Building the AI Mindset",
    objective: "Lay down the foundation with core Python, math, and data handling skills needed for ML.",
    coreConcepts: [
      "Python Refresher (Loops, Functions, OOP)",
      "NumPy, Pandas: DataFrames, Series, GroupBy, Pivot",
      "Data Cleaning, Missing Values, Outliers",
      "Matplotlib & Seaborn for Visualization",
      "Introduction to ML Pipelines (Scikit-learn basics)"
    ],
    deliverables: [
      "Colab Notebooks for each topic",
      "Streamlit-based Auto-EDA Dashboard",
      "House Price Prediction App (Linear Regression)"
    ],
    salesHook: "Even non-programmers will build their first ML app by the end of week 1.",
    projectImage: "https://images.unsplash.com/photo-1487958449943-2429e8be8625"
  },
  {
    week: 2,
    title: "Predict the Future - Supervised Learning",
    objective: "Master classification, regression, and core ML evaluation metrics.",
    coreConcepts: [
      "Supervised vs Unsupervised",
      "Models: Logistic Regression, Decision Trees, Random Forests, KNN, SVM",
      "Evaluation Metrics: Confusion Matrix, ROC-AUC, Precision-Recall, Cross Validation",
      "Hyperparameter Tuning with GridSearchCV"
    ],
    deliverables: [
      "Flight Delay Predictor",
      "Medical Diagnosis Classifier (SVM)",
      "Evaluation Report PDF via classification_report visualizations"
    ],
    salesHook: "From theory to dashboard — build deployable classifiers that could power real-world services.",
    projectImage: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b"
  },
  {
    week: 3,
    title: "Learn the Hidden Patterns",
    objective: "Identify structure in unlabeled data for segmentation, fraud, and dimensionality reduction.",
    coreConcepts: [
      "K-Means, DBSCAN, Agglomerative Clustering",
      "PCA, t-SNE, UMAP for Visualization",
      "Isolation Forest, One-Class SVM for Fraud/Anomaly Detection"
    ],
    deliverables: [
      "Customer Segmentation for E-commerce (K-Means)",
      "Credit Card Fraud Detection App",
      "Clustering Visualizations with t-SNE/PCA"
    ],
    salesHook: "Banks and fintechs use these algorithms daily. So will your learners.",
    projectImage: "https://images.unsplash.com/photo-1518770660439-4636190af475"
  },
  {
    week: 4,
    title: "ML Like a Pro - Pipelines, Automation, & Ops",
    objective: "Build production-ready ML apps with CI/CD workflows.",
    coreConcepts: [
      "OneHot, Label, Binning, Scaling, Feature Selection",
      "Model Pipeline Building (with Imputation, Scaling)",
      "Hyperparameter Search: GridSearchCV, RandomizedCV",
      "MLOps Tools: Weights & Biases, Streamlit, Gradio",
      "Basic Deployment (Heroku/Render/Streamlit Cloud)"
    ],
    deliverables: [
      "Loan Risk Predictor (with Sklearn Pipelines)",
      "ML App Deployment with Gradio",
      "Dashboard with W&B for Metrics Logging"
    ],
    salesHook: "Everything needed to ship your first ML product — fully tracked and deployed.",
    projectImage: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e"
  },
  {
    week: 5,
    title: "Deep Dive - ANN, CNN, and Transfer Learning",
    objective: "Develop powerful image-based models using TensorFlow/Keras.",
    coreConcepts: [
      "ANN Architecture: Dense, ReLU, Dropout",
      "CNN Architecture: Filters, Pooling, Conv Layers",
      "Transfer Learning: MobileNet, VGG, ResNet",
      "Model Tuning, Regularization, Dropout, EarlyStopping"
    ],
    deliverables: [
      "Digit Recognition (MNIST CNN)",
      "Dog vs Cat Classifier using Transfer Learning",
      "Real-Time Camera-based Prediction (OpenCV + CNN)"
    ],
    salesHook: "Build your own visual brain — train machines to see and recognize.",
    projectImage: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5"
  },
  {
    week: 6,
    title: "Language is Power - NLP for Smart Applications",
    objective: "Use transformers and traditional NLP for real-time text understanding.",
    coreConcepts: [
      "Text Cleaning, Tokenization, TF-IDF, Word2Vec",
      "Hugging Face Transformers: BERT, DistilBERT",
      "Fine-Tuning Pre-trained Models",
      "Named Entity Recognition (NER), POS Tagging (spaCy)"
    ],
    deliverables: [
      "Sentiment Analyzer Web App",
      "Resume Screener using spaCy + Gradio",
      "Text Summarizer with BERT"
    ],
    salesHook: "Language-driven AI is the future — and your students will lead it.",
    projectImage: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7"
  },
  {
    week: 7,
    title: "AI that Talks, Thinks, and Sees",
    objective: "Develop intelligent agents using RAG pipelines, LLM fine-tuning, YOLO, and Rasa.",
    coreConcepts: [
      "LLM Basics: Tokenization, Prompting, Context Windows",
      "RAG Pipeline: LangChain + Vector DB (FAISS/Pinecone)",
      "LLM Fine-Tuning (LoRA, PEFT)",
      "YOLOv8 for Real-Time Object Detection",
      "Intent Recognition, Rasa NLU Chatbots"
    ],
    deliverables: [
      "RAG-based Knowledge Assistant using LangChain + Pinecone",
      "YOLOv8 Real-Time Camera App",
      "Mental Health Bot (Rasa + DistilBERT)"
    ],
    salesHook: "The same tech used in ChatGPT, Midjourney, and Tesla — students will wield it.",
    projectImage: "https://images.unsplash.com/photo-1531297484001-80022131f5a1"
  },
  {
    week: 8,
    title: "Real AI - Orchestration, Vector Databases & Enterprise-Grade Apps",
    objective: "Combine all skills into end-to-end products with scalable deployment.",
    coreConcepts: [
      "LangChain Chains, Agents, Memory",
      "Prompt Templates, Tools, LLM API Wrappers",
      "Multimodal Models: LLaVA, CLIP",
      "Data Ingestion (PDF, Docs) for LLM Querying",
      "Cloud Deployment: Hugging Face Spaces, AWS Lambda, Streamlit Cloud"
    ],
    deliverables: [
      "AI Career Counselor (RAG + LangChain + OpenAI)",
      "Legal Document QA Bot with Pinecone Vector DB",
      "AI Medical Assistant with PDF Ingestion + LangChain",
      "Multimodal Chatbot with LLaVA + Vision Input"
    ],
    salesHook: "This is where students go from learners to AI builders — deploy full GenAI systems.",
    projectImage: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81"
  }
];

const Syllabus = () => {
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
    <div className="w-full">
      <Navbar />
      
      <div className="page-hero bg-accent">
        <div className="container px-4 sm:px-6">
          <h1 className="page-hero-title mb-4">Course Syllabus</h1>
          <p className="page-hero-subtitle max-w-3xl">
            Our comprehensive 8-week journey from AI/ML fundamentals to advanced GenAI systems, 
            with hands-on projects at every step.
          </p>
        </div>
      </div>
      
      <section className="py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Your Learning Journey</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mb-8">
              Our curriculum is designed as a progressive journey through the AI/ML landscape, 
              building your skills from foundations to cutting-edge techniques.
            </p>
            
            <div className="bg-primary/10 rounded-lg p-6 mb-12">
              <h3 className="text-xl font-bold mb-2">Important Note:</h3>
              <p>
                If you prefer a shorter commitment, you can choose to learn only the first 5 weeks of material
                and still receive all the bonus benefits. This is perfect for those who want to focus on the fundamentals
                and core ML techniques before diving into more advanced topics.
              </p>
            </div>
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
                  <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
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
      
      <section className="py-16 bg-gray-50">
        <div className="container px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4">Final Deliverables</h2>
              <p className="text-lg mb-6">
                By the end of this program, you'll have a comprehensive portfolio showcasing 
                your AI/ML skills to potential employers.
              </p>
              
              <ul className="space-y-3">
                <li className="flex items-start">
                  <div className="mr-2 mt-1 bg-primary/10 p-1 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M20 6L9 17l-5-5"></path></svg>
                  </div>
                  <span>15+ Fully Working Mini Projects (GitHub Portfolio)</span>
                </li>
                <li className="flex items-start">
                  <div className="mr-2 mt-1 bg-primary/10 p-1 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M20 6L9 17l-5-5"></path></svg>
                  </div>
                  <span>1-2 Comprehensive Capstone Projects</span>
                </li>
                <li className="flex items-start">
                  <div className="mr-2 mt-1 bg-primary/10 p-1 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M20 6L9 17l-5-5"></path></svg>
                  </div>
                  <span>PPT + Video Pitch for Capstone (Shark Tank-style)</span>
                </li>
                <li className="flex items-start">
                  <div className="mr-2 mt-1 bg-primary/10 p-1 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M20 6L9 17l-5-5"></path></svg>
                  </div>
                  <span>Resume Templates for AI/ML Roles</span>
                </li>
                <li className="flex items-start">
                  <div className="mr-2 mt-1 bg-primary/10 p-1 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M20 6L9 17l-5-5"></path></svg>
                  </div>
                  <span>Streamlit Portfolio App</span>
                </li>
                <li className="flex items-start">
                  <div className="mr-2 mt-1 bg-primary/10 p-1 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M20 6L9 17l-5-5"></path></svg>
                  </div>
                  <span>GitHub Pages Profile</span>
                </li>
              </ul>
              
              <div className="mt-8">
                <Button asChild size="lg">
                  <Link to="/bonus">View Free Bonuses</Link>
                </Button>
              </div>
            </div>
            
            <div className="p-6 bg-white rounded-xl shadow-lg border">
              <h3 className="text-xl font-bold mb-4">Bonus Content</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="mr-3 mt-1 text-secondary">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                  </div>
                  <div>
                    <h4 className="font-medium">Mock Interviews (Behavioral + Technical)</h4>
                    <p className="text-sm text-muted-foreground">Practice with real interview questions from top tech companies</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="mr-3 mt-1 text-secondary">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                  </div>
                  <div>
                    <h4 className="font-medium">Interview Prep: SQL + ML + System Design</h4>
                    <p className="text-sm text-muted-foreground">Specific preparation for technical interviews</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="mr-3 mt-1 text-secondary">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                  </div>
                  <div>
                    <h4 className="font-medium">Research Paper Reading Sessions</h4>
                    <p className="text-sm text-muted-foreground">Learn how to understand and implement cutting-edge research</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="mr-3 mt-1 text-secondary">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                  </div>
                  <div>
                    <h4 className="font-medium">Internship or Hackathon Pipeline Guidance</h4>
                    <p className="text-sm text-muted-foreground">Support for finding opportunities to apply your skills</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-16 md:py-24 animated-gradient-bg text-white">
        <div className="container px-4 md:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Master AI/ML?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join our upcoming cohort and transform your career in just 8 weeks.
            Talk to our team to find the right program for you.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <EnrollButton size="lg" className="bg-white text-primary hover:bg-gray-100">
              Apply Now
            </EnrollButton>
            <Button asChild size="lg" variant="outline" className="border-2 border-white bg-white/10 backdrop-blur-sm text-white hover:bg-white hover:text-gray-900">
              <Link to="/bonus">View Free Bonuses</Link>
            </Button>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Syllabus;
