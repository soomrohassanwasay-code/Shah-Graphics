import React, { useState, useEffect } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Tag } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import ProjectCard from '../components/ProjectCard';
import { Project } from '../types';

const Projects = () => {
  const { projects, categories } = useStore();
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Sync category from URL
  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat) {
      setSelectedCategory(cat);
    } else {
        setSelectedCategory('All');
    }
    
    // Check if a specific project ID is in URL to open modal immediately
    const projectId = searchParams.get('id');
    if (projectId) {
        const found = projects.find(p => p.id === projectId);
        if (found) setSelectedProject(found);
    }
  }, [searchParams, projects]);

  const handleCategoryChange = (cat: string) => {
    setSelectedCategory(cat);
    if (cat === 'All') {
        searchParams.delete('category');
    } else {
        searchParams.set('category', cat);
    }
    setSearchParams(searchParams);
  };

  const filteredProjects = selectedCategory === 'All' 
    ? projects 
    : projects.filter(p => p.category === selectedCategory);

  return (
    <div className="min-h-screen pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Our Portfolio</h1>
          <p className="text-zinc-400 max-w-2xl mx-auto">
            Explore our diverse collection of creative works, ranging from brand identities to digital marketing assets.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          <button
            onClick={() => handleCategoryChange('All')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              selectedCategory === 'All' 
                ? 'bg-white text-black' 
                : 'bg-zinc-900 text-zinc-400 hover:bg-zinc-800'
            }`}
          >
            All Work
          </button>
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => handleCategoryChange(cat.name)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedCategory === cat.name 
                  ? 'bg-white text-black' 
                  : 'bg-zinc-900 text-zinc-400 hover:bg-zinc-800'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <ProjectCard 
                key={project.id} 
                project={project} 
                onClick={(p) => setSelectedProject(p)} 
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-20 text-zinc-500">
            No projects found in this category.
          </div>
        )}
      </div>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden max-w-4xl w-full max-h-[90vh] flex flex-col md:flex-row relative shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 z-10 p-2 bg-black/50 rounded-full text-white hover:bg-black/70 transition-colors"
              >
                <X size={20} />
              </button>

              <div className="w-full md:w-1/2 bg-black flex items-center justify-center p-6">
                <img 
                  src={selectedProject.imageUrl} 
                  alt={selectedProject.title}
                  className="max-h-full max-w-full object-contain rounded-lg shadow-lg" 
                />
              </div>

              <div className="w-full md:w-1/2 p-8 overflow-y-auto">
                <div className="flex items-center gap-2 mb-4">
                  <span className="px-3 py-1 bg-indigo-500/10 text-indigo-400 text-xs font-semibold rounded-full uppercase tracking-wider">
                    {selectedProject.category}
                  </span>
                </div>
                
                <h2 className="text-3xl font-bold text-white mb-6">{selectedProject.title}</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-zinc-500 text-xs uppercase font-semibold mb-2 flex items-center gap-2">
                        <Tag size={14} /> Description
                    </h3>
                    <p className="text-zinc-300 leading-relaxed">
                      {selectedProject.description}
                    </p>
                  </div>
                  
                  <div>
                     <h3 className="text-zinc-500 text-xs uppercase font-semibold mb-2 flex items-center gap-2">
                        <Calendar size={14} /> Date
                    </h3>
                    <p className="text-zinc-300">
                      {new Date(selectedProject.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </p>
                  </div>
                </div>

                <div className="mt-12 pt-8 border-t border-zinc-800">
                    <p className="text-zinc-500 text-sm italic">
                        Like what you see? <a href="/contact" className="text-indigo-400 hover:underline">Get in touch</a> to start your project.
                    </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Projects;