
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  MessageSquare, 
  Linkedin
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { apiClient } from '@/integrations/api/client';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const contact = await apiClient.createContact({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        subject: formData.subject,
        message: formData.message
      });
      
      console.log('Form data submitted successfully:', contact);
      
      toast({
        title: "Message Sent!",
        description: "We'll get back to you within a few hours. Thank you for reaching out!",
      });
      
      // Reset form
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      console.error("Submission error:", error);
      toast({
        title: "Error",
        description: "There was a problem sending your message. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDirectContact = (type: 'whatsapp' | 'email') => {
    if (type === 'whatsapp') {
      window.open(`https://wa.me/918887720741`, '_blank');
      toast({
        title: "Connecting to WhatsApp",
        description: "Opening WhatsApp to connect with us directly.",
      });
    } else if (type === 'email') {
      window.location.href = 'mailto:support@zyvotrix.com';
      toast({
        title: "Opening Email Client",
        description: "Your default email app is opening to send us a message.",
      });
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <div className="pt-24 md:pt-28 pb-20 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="container px-4 md:px-6">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">Contact Us</h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Have questions about our tech programs? Reach out to our team and get the support you need.
            </p>
          </div>
        </div>
      </div>
      
      <section className="py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-3xl font-bold mb-6">Get in Touch</h2>
              <p className="text-lg mb-8">
                Fill out the form and our team will get back to you within a few hours.
                We're happy to answer any questions you may have about our tech programs.
              </p>
              
              <div className="space-y-6">
                <Card className="hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20">
                  <CardContent className="flex items-center p-6">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mr-4">
                      <Mail className="text-primary h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">Email Us</h3>
                      <button 
                        onClick={() => handleDirectContact('email')}
                        className="text-primary hover:underline font-medium text-lg"
                      >
                        support@zyvotrix.com
                      </button>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20">
                  <CardContent className="flex items-center p-6">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                      <Phone className="text-green-600 h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">Connect on WhatsApp</h3>
                      <button 
                        onClick={() => handleDirectContact('whatsapp')}
                        className="text-green-600 hover:underline font-medium text-lg"
                      >
                        +91 8887720741
                      </button>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20">
                  <CardContent className="flex items-center p-6">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                      <MapPin className="text-blue-600 h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">Visit Us</h3>
                      <p className="text-muted-foreground font-medium">Bengaluru, Karnataka, 560102</p>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20">
                  <CardContent className="flex items-center p-6">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mr-4">
                      <Calendar className="text-purple-600 h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">Office Hours</h3>
                      <p className="text-muted-foreground font-medium">Monday - Friday: 9:00 AM - 5:00 PM</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="mt-8">
                <h3 className="text-xl font-bold mb-4">Connect With Us</h3>
                <div className="flex space-x-4">
                  <a href="https://www.linkedin.com/company/zyvotrix/" target="_blank" rel="noopener noreferrer" className="p-2 bg-accent rounded-full hover:bg-accent/80 transition-colors">
                    <Linkedin size={20} />
                  </a>
                  <button 
                    onClick={() => handleDirectContact('email')}
                    className="p-2 bg-accent rounded-full hover:bg-accent/80 transition-colors"
                  >
                    <Mail size={20} />
                  </button>
                </div>
              </div>
            </div>
            
            <div>
              <Card className="border-2 border-primary/10 shadow-xl">
                <CardContent className="p-8">
                  <h3 className="text-3xl font-bold mb-6">Send Us a Message</h3>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label htmlFor="firstName" className="text-sm font-medium">First Name</label>
                        <Input 
                          id="firstName" 
                          placeholder="John" 
                          required 
                          value={formData.firstName}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="lastName" className="text-sm font-medium">Last Name</label>
                        <Input 
                          id="lastName" 
                          placeholder="Doe" 
                          required 
                          value={formData.lastName}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium">Email</label>
                      <Input 
                        id="email" 
                        type="email" 
                        placeholder="you@example.com" 
                        required 
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="phone" className="text-sm font-medium">Phone (Optional)</label>
                      <Input 
                        id="phone" 
                        placeholder="+91 8887720741"
                        value={formData.phone}
                        onChange={handleChange}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="subject" className="text-sm font-medium">Subject</label>
                      <Input 
                        id="subject" 
                        placeholder="I'm interested in the tech programs" 
                        required 
                        value={formData.subject}
                        onChange={handleChange}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="message" className="text-sm font-medium">Message</label>
                      <Textarea 
                        id="message" 
                        placeholder="Tell us more about your background and what you're looking to achieve..."
                        rows={5}
                        required
                        value={formData.message}
                        onChange={handleChange}
                      />
                    </div>
                    
                    <Button type="submit" className="w-full py-3 text-lg font-semibold" disabled={isSubmitting}>
                      <MessageSquare className="mr-2 h-5 w-5" /> 
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </Button>
                  </form>
                </CardContent>
              </Card>
              
              <div className="mt-8 p-4 bg-accent rounded-lg">
                <h4 className="font-medium mb-2">Prefer a quick chat?</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  Connect directly on WhatsApp for a quick response or schedule a 15-minute call with our admissions team.
                </p>
                <Button 
                  variant="outline" 
                  className="w-full border-2 border-primary text-primary hover:bg-primary hover:text-white"
                  onClick={() => handleDirectContact('whatsapp')}
                >
                  <Phone className="mr-2 h-4 w-4" />
                  Connect on WhatsApp
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-gray-900 text-white">
        <div className="container px-4 md:px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Have Questions?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Check out our FAQ section or reach out to us directly. 
            We're here to help you make an informed decision about your tech career journey.
          </p>
          <Button asChild variant="outline" className="border-2 border-white bg-white/10 backdrop-blur-sm text-white hover:bg-white hover:text-gray-900">
            <Link to="/bonus">View Free Bonuses</Link>
          </Button>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Contact;
