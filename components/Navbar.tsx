import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ChevronDown, Menu, X } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const { categories } = useStore();
  const navigate = useNavigate();
  const location = useLocation();
  const [isProjectsHovered, setIsProjectsHovered] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleCategoryClick = (catName: string) => {
    navigate(`/projects?category=${encodeURIComponent(catName)}`);
    setIsProjectsHovered(false);
    setIsMobileMenuOpen(false);
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold tracking-tight text-white hover:text-zinc-300 transition-colors">
          Shah Graphics
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8">
          <Link to="/" className={`text-sm font-medium transition-colors ${location.pathname === '/' ? 'text-white' : 'text-zinc-400 hover:text-white'}`}>
            Home
          </Link>

          {/* Projects Dropdown Logic */}
          <div 
            className="relative group"
            onMouseEnter={() => setIsProjectsHovered(true)}
            onMouseLeave={() => setIsProjectsHovered(false)}
          >
            <div className="flex items-center cursor-pointer py-2">
              <Link 
                to="/projects" 
                className={`text-sm font-medium transition-colors mr-1 ${location.pathname === '/projects' ? 'text-white' : 'text-zinc-400 group-hover:text-white'}`}
              >
                Projects
              </Link>
              <motion.div
                initial={{ opacity: 0, x: -5 }}
                animate={{ opacity: isProjectsHovered ? 1 : 0, x: isProjectsHovered ? 0 : -5 }}
                className="text-zinc-400 group-hover:text-white"
              >
                <ChevronDown size={14} />
              </motion.div>
            </div>

            {/* Dropdown Menu */}
            <AnimatePresence>
              {isProjectsHovered && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full left-0 mt-1 w-56 bg-zinc-900 border border-zinc-800 rounded-lg shadow-xl overflow-hidden"
                >
                  <div className="py-2">
                     <button
                        onClick={() => handleCategoryClick('All')}
                        className="w-full text-left px-4 py-2 text-sm text-zinc-300 hover:bg-zinc-800 hover:text-white transition-colors"
                      >
                        All Projects
                      </button>
                    {categories.map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => handleCategoryClick(cat.name)}
                        className="w-full text-left px-4 py-2 text-sm text-zinc-300 hover:bg-zinc-800 hover:text-white transition-colors"
                      >
                        {cat.name}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link to="/contact" className={`text-sm font-medium transition-colors ${location.pathname === '/contact' ? 'text-white' : 'text-zinc-400 hover:text-white'}`}>
            Contact
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-zinc-400 hover:text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-zinc-900 border-b border-zinc-800 overflow-hidden"
          >
            <div className="flex flex-col px-6 py-4 space-y-4">
              <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="text-zinc-300 hover:text-white">Home</Link>
              <div className="space-y-2">
                <Link to="/projects" onClick={() => setIsMobileMenuOpen(false)} className="block text-zinc-300 hover:text-white font-medium">Projects</Link>
                <div className="pl-4 space-y-2 border-l border-zinc-800 ml-1">
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => handleCategoryClick(cat.name)}
                      className="block text-sm text-zinc-500 hover:text-white"
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>
              <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)} className="text-zinc-300 hover:text-white">Contact</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;