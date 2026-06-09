
import React, { useState } from 'react';
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
} from 'lucide-react';
import SocialLinks from '@/components/SocialLinks';
import { SOCIAL_LINKS } from '@/lib/socialLinks';
import { useToast } from '@/hooks/use-toast';
import { apiClient } from '@/integrations/api/client';
import { trackEvent } from '@/lib/analytics';
import PageHero from '@/components/PageHero';
import PageCta from '@/components/PageCta';
import PageShell from '@/components/layout/PageShell';
import { IMAGES } from '@/lib/images';
import { usePageMeta } from '@/hooks/usePageMeta';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

const contactMethods = [
  { icon: Mail, title: 'Email Us', value: 'support@zyvotrix.com', action: 'email' as const, color: 'bg-primary/10 text-primary' },
  { icon: Phone, title: 'WhatsApp', value: '+91 8887720741', action: 'whatsapp' as const, color: 'bg-secondary/10 text-secondary' },
  { icon: MapPin, title: 'Visit Us', value: 'Bengaluru, Karnataka, 560102', action: null, color: 'bg-primary/10 text-primary' },
  { icon: Calendar, title: 'Office Hours', value: 'Mon–Fri: 9 AM – 5 PM', action: null, color: 'bg-primary/10 text-primary' },
];

const Contact = () => {
  const { toast } = useToast();

  usePageMeta({
    title: 'Contact Us',
    description: 'Contact Zyvotrix for program inquiries, enrollment support, partnerships, and career guidance.',
    canonical: '/contact',
  });
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
      trackEvent('contact_form_submit', { page: 'contact' });

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
      const description =
        error instanceof Error ? error.message : 'There was a problem sending your message. Please try again.';
      toast({
        title: "Error",
        description,
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDirectContact = (type: 'whatsapp' | 'email') => {
    if (type === 'whatsapp') {
      window.open(SOCIAL_LINKS.whatsapp, '_blank');
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
    <PageShell>
      <Navbar />
      
      <PageHero
        badge="We're here to help"
        title={
          <>
            Get in <span className="gradient-text">Touch</span>
          </>
        }
        subtitle="Questions about programs, enrollment, or partnerships? We're here to help."
        image={IMAGES.hero.contact}
        imageAlt="Get in touch with Zyvotrix"
      />
      
      <section className="section-padding section-white">
        <div className="container px-4 md:px-6">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <span className="mb-3 inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-primary">
                Contact Info
              </span>
              <h2 className="section-title mx-0 text-left">Get in Touch</h2>
              <p className="mb-8 text-lg text-muted-foreground">
                Fill out the form and our team will get back to you within a few hours.
              </p>
              
              <div className="grid gap-4 sm:grid-cols-2">
                {contactMethods.map((method) => (
                  <div
                    key={method.title}
                    className="rounded-2xl border border-border/80 bg-card p-5 transition-all hover:-translate-y-0.5 hover:shadow-md"
                  >
                    <div className={`mb-3 flex h-10 w-10 items-center justify-center rounded-xl ${method.color}`}>
                      <method.icon className="h-5 w-5" />
                    </div>
                    <h3 className="mb-1 font-semibold">{method.title}</h3>
                    {method.action ? (
                      <button
                        type="button"
                        onClick={() => handleDirectContact(method.action!)}
                        className="text-left text-sm font-medium text-primary hover:underline"
                      >
                        {method.value}
                      </button>
                    ) : (
                      <p className="text-sm text-muted-foreground">{method.value}</p>
                    )}
                  </div>
                ))}
              </div>
              
              <div className="mt-8 rounded-2xl border border-border bg-brand-100/40 p-6">
                <h3 className="mb-4 font-bold">Connect With Us</h3>
                <SocialLinks variant="contact" />
              </div>
            </div>
            
            <div>
              <Card className="form-panel border border-border/80 shadow-xl">
                <CardContent className="p-0">
                  <h3 className="text-2xl sm:text-3xl font-bold mb-6">Send Us a Message</h3>
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
                    
                    <Button type="submit" className="w-full py-3 text-lg font-semibold btn-brand" disabled={isSubmitting}>
                      <MessageSquare className="mr-2 h-5 w-5" /> 
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </Button>
                  </form>
                </CardContent>
              </Card>
              
              <div className="mt-8 surface-card p-5">
                <h4 className="font-medium mb-2">Prefer a quick chat?</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  Connect directly on WhatsApp for a quick response or schedule a 15-minute call with our admissions team.
                </p>
                <Button 
                  variant="outline" 
                  className="w-full btn-outline-brand bg-card"
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
      
      <PageCta
        badge="Quick answers"
        title="Have questions?"
        description="Browse our FAQ or explore programs — we're here to help you choose the right path."
        primaryLabel="View FAQ"
        primaryHref="/faq"
        secondaryLabel="Explore Programs"
        secondaryHref="/courses"
      />

      <Footer />
    </PageShell>
  );
};

export default Contact;
