import React from 'react';
import { Project } from '../types';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
  onClick: (project: Project) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onClick }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ y: -5 }}
      className="group relative cursor-pointer overflow-hidden rounded-xl bg-zinc-900 border border-zinc-800"
      onClick={() => onClick(project)}
    >
      <div className="aspect-[4/3] overflow-hidden">
        <img 
          src={project.imageUrl} 
          alt={project.title} 
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>
      
      {/* Overlay on hover */}
      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
        <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
           <span className="text-indigo-400 text-xs font-semibold tracking-wider uppercase">{project.category}</span>
           <div className="flex items-center justify-between mt-1">
             <h3 className="text-white font-bold text-lg">{project.title}</h3>
             <ArrowUpRight className="text-white" size={20} />
           </div>
        </div>
      </div>

      {/* Default details visible if not hovering (mobile/tablet friendly) */}
      <div className="p-4 md:hidden">
          <span className="text-zinc-500 text-xs uppercase">{project.category}</span>
          <h3 className="text-zinc-100 font-semibold mt-1">{project.title}</h3>
      </div>
    </motion.div>
  );
};

export default ProjectCard;