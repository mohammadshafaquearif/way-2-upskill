
import React, { useState } from 'react';
import type { CountryCode } from 'libphonenumber-js';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import PhoneInput from '@/components/PhoneInput';
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
import { STATIC_PAGE_SEO } from '@/lib/seo';
import { usePageMeta } from '@/hooks/usePageMeta';
import { DEFAULT_COUNTRY, toE164, validatePhone } from '@/lib/phone';
import GoogleMapEmbed from '@/components/local/GoogleMapEmbed';
import BusinessNap from '@/components/local/BusinessNap';
import {
  ZYVOTRIX_ADDRESS_LINE,
  ZYVOTRIX_LOCAL_BUSINESS_SCHEMA,
  ZYVOTRIX_LOCAL_KEYWORDS,
  ZYVOTRIX_NAP,
  ZYVOTRIX_SUPPORT_EMAIL,
} from '@/lib/localBusiness';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  subject: string;
  message: string;
}

const contactMethods = [
  { icon: Mail, title: 'Email Us', value: ZYVOTRIX_NAP.email, action: 'email' as const, color: 'bg-primary/10 text-primary' },
  { icon: Phone, title: 'WhatsApp', value: ZYVOTRIX_NAP.phoneDisplay, action: 'whatsapp' as const, color: 'bg-secondary/10 text-secondary' },
  { icon: MapPin, title: 'Visit Us', value: ZYVOTRIX_ADDRESS_LINE, action: null, color: 'bg-primary/10 text-primary' },
  { icon: Calendar, title: 'Office Hours', value: ZYVOTRIX_NAP.officeHours, action: null, color: 'bg-primary/10 text-primary' },
];

const Contact = () => {
  const { toast } = useToast();

  usePageMeta(STATIC_PAGE_SEO['/contact']);
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    subject: '',
    message: ''
  });
  const [phoneCountry, setPhoneCountry] = useState<CountryCode>(DEFAULT_COUNTRY);
  const [nationalNumber, setNationalNumber] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const trimmedPhone = nationalNumber.trim();
    if (!trimmedPhone) {
      toast({
        title: 'Phone number required',
        description: 'Please enter your phone number so we can reach you.',
        variant: 'destructive',
      });
      return;
    }

    if (!validatePhone(trimmedPhone, phoneCountry)) {
      toast({
        title: 'Invalid phone number',
        description: 'Please enter a valid phone number.',
        variant: 'destructive',
      });
      return;
    }

    const phone = toE164(trimmedPhone, phoneCountry);
    setIsSubmitting(true);
    
    try {
      const contact = await apiClient.createContact({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone,
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
        subject: '',
        message: ''
      });
      setPhoneCountry(DEFAULT_COUNTRY);
      setNationalNumber('');
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ZYVOTRIX_LOCAL_BUSINESS_SCHEMA) }}
      />
      <Navbar />
      
      <PageHero
        badge="We're here to help"
        title={
          <>
            Get in <span className="gradient-text">Touch</span>
          </>
        }
        subtitle={`Questions about programs, enrollment, or partnerships? ${ZYVOTRIX_LOCAL_KEYWORDS.tagline}`}
        image={IMAGES.hero.contact}
        imageAlt="Zyvotrix support team — we're here to help with programs and enrollment"
        imageCaption={IMAGES.heroCaptions.contact}
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
                Fill out the form and our Bengaluru-based team will get back to you within a few hours.
                Zyvotrix offers top tech training programs in Karnataka — DevOps, Agentic AI, AWS, and
                Data Science — with live mentor-led classes online and local learner support.
              </p>
              
              <div className="mb-8">
                <BusinessNap />
              </div>
              
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
                      <label htmlFor="phone" className="text-sm font-medium">Phone Number</label>
                      <PhoneInput
                        id="phone"
                        country={phoneCountry}
                        nationalNumber={nationalNumber}
                        onCountryChange={setPhoneCountry}
                        onNationalNumberChange={setNationalNumber}
                        required
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

      <section className="section-padding section-alt border-t border-border">
        <div className="container px-4 md:px-6">
          <div className="mx-auto max-w-5xl">
            <div className="mb-8 text-center">
              <span className="mb-3 inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-primary">
                Find Us in Bengaluru
              </span>
              <h2 className="section-title">Visit Zyvotrix on Google Maps</h2>
              <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
                Our {ZYVOTRIX_LOCAL_KEYWORDS.city} office is listed on Google Maps. Learners across Karnataka
                and India join our live online programs — stop by or connect with us for DevOps, Agentic AI,
                AWS, and Data Science training in Bengaluru.
              </p>
            </div>
            <GoogleMapEmbed />
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
