
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const CTASection = () => {
  return (
    <section className="py-20 md:py-28 bg-gradient-to-br from-primary via-secondary to-primary text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="container px-4 md:px-6 text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Transform Your Tech Career?</h2>
          <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto leading-relaxed">
            Join Zyvotrix's comprehensive tech programs and master the skills needed for 
            your dream tech career. Choose from 5+ specialized domains with one-to-one mentoring.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-6 mb-8">
            <Button asChild size="lg" className="bg-white text-primary hover:bg-gray-100 px-8 py-4 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
              <Link to="/enroll">Start Your Journey</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-2 border-white bg-white/10 backdrop-blur-sm text-white hover:bg-white hover:text-primary px-8 py-4 text-lg font-semibold transition-all duration-300 transform hover:scale-105">
              <Link to="/contact">Connect on Call</Link>
            </Button>
          </div>
          
          <div className="flex items-center justify-center space-x-2 text-lg font-medium">
            <span className="text-yellow-300">🚀</span>
            <span>Limited spots available across all programs</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
