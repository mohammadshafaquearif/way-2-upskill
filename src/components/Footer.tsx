import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4 gradient-text">Zyvotrix</h3>
            <p className="text-gray-300">
              Transform your career with Zyvotrix's comprehensive tech programs. 
              From Full Stack Development, AI/ML, DevOps, Cloud Computing to Cybersecurity - 
              master all tech domains through one-to-one mentoring.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-300 hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/syllabus" className="text-gray-300 hover:text-white transition-colors">Syllabus</Link></li>
              <li><Link to="/bonus" className="text-gray-300 hover:text-white transition-colors">Free Bonuses</Link></li>
              <li><Link to="/about" className="text-gray-300 hover:text-white transition-colors">About</Link></li>
              <li><Link to="/contact" className="text-gray-300 hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-gray-300">
              <li>Email: support@zyvotrix.com</li>
              <li>Phone: +91 8887720741</li>
              <li>Address: Bengaluru, Karnataka, 560102</li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Connect</h4>
            <div className="flex space-x-4">
              <a href="https://www.linkedin.com/company/zyvotrix/" className="text-gray-300 hover:text-white transition-colors">LinkedIn</a>
              <a href="mailto:support@zyvotrix.com" className="text-gray-300 hover:text-white transition-colors">Email</a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400">© {new Date().getFullYear()} Zyvotrix. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/privacy" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="text-gray-400 hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
