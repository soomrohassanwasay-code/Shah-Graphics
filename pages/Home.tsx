import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Palette, Layers, Zap } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import ProjectCard from '../components/ProjectCard';

const Home = () => {
  const { projects, siteConfig } = useStore();
  
  // Get latest 3 projects
  const featuredProjects = projects.slice(0, 3);

  // Helper to render gradient text inside *asterisks*
  const renderHeroHeadline = (text: string) => {
    const parts = text.split('*');
    return parts.map((part, i) => {
      if (i % 2 === 1) {
        return <span key={i} className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">{part}</span>;
      }
      return <span key={i}>{part}</span>;
    });
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-3xl"
          >
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6 leading-tight">
              {renderHeroHeadline(siteConfig.heroHeadline)}
            </h1>
            <p className="text-xl text-zinc-400 mb-8 max-w-2xl leading-relaxed">
              {siteConfig.heroSubheadline}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link 
                to="/projects"
                className="px-8 py-4 bg-white text-black font-semibold rounded-full hover:bg-zinc-200 transition-colors flex items-center gap-2"
              >
                View Projects <ArrowRight size={18} />
              </Link>
              <Link 
                to="/contact"
                className="px-8 py-4 bg-zinc-900 border border-zinc-800 text-white font-semibold rounded-full hover:bg-zinc-800 transition-colors"
              >
                Contact Me
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Abstract Background Element */}
        <div className="absolute top-0 right-0 -z-10 opacity-20 pointer-events-none">
          <div className="w-[600px] h-[600px] bg-indigo-600 rounded-full blur-[120px] translate-x-1/3 -translate-y-1/3"></div>
        </div>
      </section>

      {/* Services/Features Snippet */}
      <section className="py-20 bg-zinc-900/50 border-y border-zinc-800/50">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
                { icon: <Palette size={32} />, title: 'Brand Identity', desc: 'Crafting unique logos and visual systems that define your business.' },
                { icon: <Layers size={32} />, title: 'Social Media', desc: 'Engaging content designs tailored for Instagram, LinkedIn, and Twitter.' },
                { icon: <Zap size={32} />, title: 'Marketing Assets', desc: 'High-conversion banners, thumbnails, and posters for your campaigns.' }
            ].map((item, idx) => (
                <motion.div 
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="p-8 rounded-2xl bg-zinc-950 border border-zinc-900 hover:border-zinc-700 transition-colors"
                >
                    <div className="text-indigo-400 mb-4">{item.icon}</div>
                    <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                    <p className="text-zinc-400 leading-relaxed">{item.desc}</p>
                </motion.div>
            ))}
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">Featured Work</h2>
              <p className="text-zinc-400">A selection of our recent masterpieces.</p>
            </div>
            <Link to="/projects" className="hidden md:flex items-center text-indigo-400 hover:text-indigo-300 transition-colors gap-1">
                View All <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProjects.map((project) => (
              <Link key={project.id} to={`/projects?id=${project.id}`}>
                 <ProjectCard project={project} onClick={() => {}} />
              </Link>
            ))}
          </div>
          
          <div className="mt-12 text-center md:hidden">
            <Link to="/projects" className="inline-flex items-center text-indigo-400 hover:text-indigo-300 transition-colors gap-1">
                View All Projects <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;