
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Linkedin } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <div className="pt-24 md:pt-28 pb-16 bg-accent">
        <div className="container px-4 md:px-6">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About Us</h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            Learn about Zyvotrix's mission, methodology, and the expert instructors who will guide you through your tech career journey.
          </p>
        </div>
      </div>
      
      <section className="py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Mission</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Empowering the next generation of tech professionals through comprehensive, industry-focused education
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-12 items-start">
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-bold mb-4">Transforming Careers Through Technology</h3>
                  <p className="text-lg text-muted-foreground">
                    We believe that technology skills are transforming every industry, creating unprecedented opportunities 
                    for those with the right expertise. Our mission is to make these skills accessible through personalized, 
                    hands-on education across all tech domains.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-2xl font-bold mb-4">Industry-Focused Learning</h3>
                  <p className="text-lg text-muted-foreground">
                    Unlike traditional programs that focus on theory without practice, our intensive programs combine 
                    deep understanding with practical implementation. We're committed to producing tech professionals 
                    who can build and deploy real systems that solve real problems.
                  </p>
                </div>
              </div>
              
              <div className="space-y-6">
                <div className="bg-gradient-to-br from-primary/10 to-secondary/10 p-6 rounded-xl">
                  <h4 className="text-xl font-bold mb-3">Our Approach</h4>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• One-to-one mentoring sessions</li>
                    <li>• Real-world project development</li>
                    <li>• Industry-standard tools and technologies</li>
                    <li>• Career guidance and placement support</li>
                  </ul>
                </div>
                
                <div className="bg-gradient-to-br from-secondary/10 to-primary/10 p-6 rounded-xl">
                  <h4 className="text-xl font-bold mb-3">Tech Domains</h4>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Full Stack Web Development</li>
                    <li>• AI/ML & Generative AI</li>
                    <li>• DevOps & Cloud Computing</li>
                    <li>• Cybersecurity</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-gray-50">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl font-bold mb-12 text-center">Our Methodology</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm hover-card">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <span className="text-xl font-bold text-primary">1</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Learn-by-Building</h3>
              <p className="text-muted-foreground">
                We believe in learning through practical application. From day one, you'll be 
                implementing algorithms, building models, and creating applications that showcase your skills.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm hover-card">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <span className="text-xl font-bold text-primary">2</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Industry & Project Based</h3>
              <p className="text-muted-foreground">
                Our course is fully industry and project-based, ensuring you gain skills that are 
                directly applicable in the real world. Each project builds your portfolio and expertise.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm hover-card">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <span className="text-xl font-bold text-primary">3</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Career-Oriented</h3>
              <p className="text-muted-foreground">
                Every aspect of our curriculum is designed with employability in mind. We focus on the 
                tools, techniques, and skills that are most in-demand in the job market.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Meet Your Lead Instructor</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Learn from industry experts with extensive experience in leading tech companies and cutting-edge technologies
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="p-8 md:p-12">
                <div className="text-center mb-8">
                  <div className="inline-block bg-primary/10 px-4 py-2 rounded-full text-sm font-semibold text-primary mb-4">
                    Lead Tech Instructor
                  </div>
                  <h3 className="text-3xl font-bold mb-4">Mohammad Shafaque Arif</h3>
                  <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    Experienced tech professional with deep expertise in Full Stack Development, AI/ML, DevOps, 
                    Cloud Computing, and Cybersecurity. Committed to your success and career growth in the tech industry.
                  </p>
                </div>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h4 className="text-xl font-bold mb-4">Contact Information</h4>
                    <div className="space-y-3">
                      <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                        <Mail className="h-5 w-5 text-primary mr-3" />
                        <a href="mailto:support@zyvotrix.com" className="text-primary hover:text-primary/80 font-medium">support@zyvotrix.com</a>
                      </div>
                      <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                        <Phone className="h-5 w-5 text-primary mr-3" />
                        <span className="font-medium">+91 8887720741</span>
                      </div>
                      <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                        <MapPin className="h-5 w-5 text-primary mr-3" />
                        <span className="text-sm font-medium">Bengaluru, Karnataka, 560102</span>
                      </div>
                      <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                        <Linkedin className="h-5 w-5 text-primary mr-3" />
                        <a href="https://www.linkedin.com/company/zyvotrix/" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary/80 font-medium">Connect on LinkedIn</a>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h4 className="text-xl font-bold mb-4">Expertise Areas</h4>
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                        <span className="font-medium">Full Stack Web Development</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                        <span className="font-medium">AI/ML & Generative AI</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                        <span className="font-medium">DevOps & Cloud Computing</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                        <span className="font-medium">Cybersecurity</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="text-center mt-12">
              <Button asChild size="lg" className="px-8 py-3">
                <Link to="/contact">Schedule a Call With Our Team</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-16 animated-gradient-bg text-white">
        <div className="container px-4 md:px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Join Our Next Cohort</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Limited spots available for our intensive one-to-one AI/ML training program.
            Apply now to secure your place.
          </p>
          <Button asChild variant="outline" className="border-2 border-white bg-white/10 backdrop-blur-sm text-white hover:bg-white hover:text-gray-900">
            <Link to="/enroll">Apply Now</Link>
          </Button>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default About;
