
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const testimonials = [
  {
    text: "Zyvotrix's AI/ML program completely transformed my career. I went from knowing basic Python to landing a job as an ML Engineer at a top tech company. The one-on-one mentorship made all the difference.",
    author: "Sarah Johnson",
    position: "ML Engineer at Google"
  },
  {
    text: "The Full Stack Web Development curriculum is incredibly well-structured. Starting from the basics and gradually moving to advanced topics. The projects I built are now the highlights of my portfolio.",
    author: "Raj Patel",
    position: "Full Stack Developer at Microsoft"
  },
  {
    text: "I tried many online courses before, but Zyvotrix's DevOps program with one-to-one mentoring was exactly what I needed. The personalized feedback helped me overcome challenges that I struggled with for months.",
    author: "Li Wei",
    position: "DevOps Engineer at Amazon"
  }
];

const Testimonials = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="section-title">What Our Students Say</h2>
          <p className="section-subtitle">
            Hear from our graduates who have successfully transitioned into tech careers across multiple domains
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, i) => (
            <Card key={i} className="hover-card">
              <CardContent className="p-6">
                <svg
                  className="h-8 w-8 text-secondary mb-4 opacity-70"
                  fill="currentColor"
                  viewBox="0 0 32 32"
                  aria-hidden="true"
                >
                  <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                </svg>
                <p className="mb-4 text-lg">{testimonial.text}</p>
                <div>
                  <p className="font-bold">{testimonial.author}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.position}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
