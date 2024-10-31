import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, User, Mail, Phone, MapPin, Calendar } from 'lucide-react';
import { toast } from 'react-hot-toast';

const Footer = () => {
  const [email, setEmail] = useState('');

  const medicalIcons = [
    { icon: Heart, color: 'text-red-500', label: 'Health Tips' },
    { icon: User, color: 'text-green-500', label: 'Patient Portal' },
    { icon: Mail, color: 'text-purple-500', label: 'Contact Us' },
    { icon: Phone, color: 'text-yellow-500', label: 'Emergency' },
    { icon: MapPin, color: 'text-blue-500', label: 'Locations' },
    { icon: Calendar, color: 'text-pink-500', label: 'Appointments' },
  ];

  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'Doctors', path: '/doctors' },
    { name: 'Appointments', path: '/appointments' },
    { name: 'About Us', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const handleIconClick = (label) => {
    toast.success(`Navigating to ${label}`);
    // Here you would typically navigate to the corresponding page
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      // Here you would typically send the email to your backend
      toast.success('Thank you for subscribing! Check your email for confirmation.');
      setEmail('');
    } else {
      toast.error('Please enter a valid email address.');
    }
  };

  return (
    <footer className="relative bg-gradient-to-b from-slate-900 to-slate-950 text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:12px_20px] [mask-image:radial-gradient(ellipse_70%_80%_at_50%_10%,#000_70%,transparent_100%)]" />
        </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="space-y-4 z-10">
            <motion.img 
              src="/medicalAppLogo2.png" 
              alt="MediCare Logo" 
              className="w-20"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            />
            {/* <div className='absolute ml-24 top-10 text-3xl text-blue-200'>   <h1 >VisitNow</h1></div> */}
            <p className="text-slate-300 text-sm">Revolutionizing healthcare with compassion and innovation.</p>
            <div className="flex flex-wrap gap-4 z-10">
              {medicalIcons.map((item, index) => (
                <motion.div
                  key={index}
                  className={`cursor-pointer ${item.color} flex flex-col items-center`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleIconClick(item.label)}
                >
                  <item.icon size={24} />
                  <span className="text-xs mt-1">{item.label}</span>
                </motion.div>
              ))}
            </div>
          </div>
          
          <div className="space-y-4 z-10">
            <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
              Quick Links
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {quickLinks.map((link, index) => (
                <motion.div 
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Link 
                    to={link.path}
                    className="text-slate-300 hover:text-blue-400 transition-colors duration-300 flex items-center"
                  >
                    <span className="mr-2">→</span>
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
          
          <div className="space-y-4 z-10">
            <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500">
              Stay Connected
            </h3>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <input 
                type="email" 
                placeholder="Your email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 bg-slate-800 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
              />
              <motion.button 
                type="submit"
                className="w-full px-3 py-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-md hover:from-blue-600 hover:to-purple-600 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Subscribe
              </motion.button>
            </form>
          </div>
        </div>
        
        <motion.div 
          className="mt-12 pt-8 border-t border-slate-800 text-center text-slate-400 text-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <p>&copy; 2023 MediCare. All rights reserved.</p>
          <div className="mt-2 space-x-4">
            <Link to="/privacy-policy" className="hover:text-blue-400 transition-colors duration-300">Privacy Policy</Link>
            <Link to="/terms-of-service" className="hover:text-blue-400 transition-colors duration-300">Terms of Service</Link>
          </div>
        </motion.div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
    </footer>
  );
};

export default Footer;