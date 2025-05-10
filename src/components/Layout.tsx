import { ReactNode, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, X, Cloud, Award, Users, BarChart3, Mail, Link as LinkIcon } from 'lucide-react';

interface LayoutProps {
  children: ReactNode;
  currentPage: string;
  setCurrentPage: (page: string) => void;
}

const Layout = ({ children, currentPage, setCurrentPage }: LayoutProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Home', icon: <Cloud size={18} />, id: 'home' },
    { path: '/email-check', label: 'Check by Email', icon: <Mail size={18} />, id: 'email-check' },
    { path: '/url-check', label: 'Check by URL', icon: <LinkIcon size={18} />, id: 'url-check' },
    { path: '/badge-generator', label: 'Badge Generator', icon: <Award size={18} />, id: 'badge-generator' },
    { path: '/achievers', label: 'Milestone Achievers', icon: <Users size={18} />, id: 'achievers' }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <Cloud className="h-8 w-8 text-primary-600" />
              <span className="text-xl font-bold text-gray-900">Qwiklabs Progress Tracker</span>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-6">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    location.pathname === item.path
                      ? 'bg-primary-50 text-primary-700'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                  onClick={() => setCurrentPage(item.id)}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              ))}
            </nav>
            
            {/* Mobile Menu Button */}
            <button
              type="button"
              className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-50 focus:outline-none"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium ${
                    location.pathname === item.path
                      ? 'bg-primary-50 text-primary-700'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                  onClick={() => {
                    setCurrentPage(item.id);
                    setMobileMenuOpen(false);
                  }}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </header>
      
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </div>
      </main>
      
      <footer className="bg-white border-t border-gray-200 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="text-center md:text-left mb-4 md:mb-0">
              <p className="text-sm text-gray-600">
                Deadline of the Program: June 10th, 2021, 11:59 PM
              </p>
              <p className="text-sm text-gray-600 mt-1">
                This is a personal project by Sagnik Mitra and is not endorsed by Google LLC.
              </p>
            </div>
            <div className="flex space-x-4">
              <a
                href="https://bit.ly/crf-syllabus"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-primary-600 hover:text-primary-800 transition-colors"
              >
                Check your Syllabus
              </a>
              <a
                href="https://bit.ly/crf-discord"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-primary-600 hover:text-primary-800 transition-colors"
              >
                Join Discord
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;