import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Plus, Trash2, Edit2, Image, X, LayoutGrid, Settings, FolderOpen, LogOut, Save, Database } from 'lucide-react';
import { Project, SiteConfig, DEFAULT_PROJECTS } from '../types';
import { supabase } from '../lib/supabaseClient';

const AdminDashboard = () => {
  const { 
    projects, 
    categories, 
    siteConfig,
    addProject, 
    deleteProject, 
    updateProject,
    deleteCategory, 
    addCategory,
    updateSiteConfig,
    logout
  } = useStore();
  
  // Navigation State
  const [activeTab, setActiveTab] = useState<'projects' | 'categories' | 'settings'>('projects');
  
  // Modal State
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  
  // Forms State
  const [newCategoryName, setNewCategoryName] = useState('');
  const [projectForm, setProjectForm] = useState<Partial<Project>>({
    title: '',
    category: '',
    description: '',
    imageUrl: '',
    date: new Date().toISOString().split('T')[0]
  });
  
  const [configForm, setConfigForm] = useState<SiteConfig>(siteConfig);
  const [settingsMessage, setSettingsMessage] = useState('');

  // Project Handlers
  const openNewProjectModal = () => {
    setEditingProject(null);
    setProjectForm({
      title: '',
      category: '',
      description: '',
      imageUrl: '',
      date: new Date().toISOString().split('T')[0]
    });
    setIsProjectModalOpen(true);
  };

  const openEditProjectModal = (project: Project) => {
    setEditingProject(project);
    setProjectForm(project);
    setIsProjectModalOpen(true);
  };

  const handleProjectSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (projectForm.title && projectForm.category && projectForm.imageUrl) {
      if (editingProject) {
        // Edit Mode
        updateProject({
          ...editingProject,
          ...projectForm as Project
        });
      } else {
        // Create Mode
        addProject({
          id: Date.now().toString(),
          title: projectForm.title!,
          category: projectForm.category!,
          description: projectForm.description || '',
          imageUrl: projectForm.imageUrl!,
          date: projectForm.date || new Date().toISOString()
        });
      }
      setIsProjectModalOpen(false);
    }
  };

  // Category Handlers
  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (newCategoryName) {
      addCategory(newCategoryName);
      setNewCategoryName('');
    }
  };

  // Settings Handlers
  const handleConfigSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateSiteConfig(configForm);
    setSettingsMessage('Settings saved successfully!');
    setTimeout(() => setSettingsMessage(''), 3000);
  };

  const handleSeedDatabase = async () => {
    if (!confirm('This will upload all Default Projects (from types.ts) to your Supabase database. This is useful if your database is empty. Continue?')) return;
    
    setSettingsMessage('Seeding database...');
    
    try {
        // Map default projects to database format (snake_case columns if needed, but our context handles mapping usually. 
        // Here we insert directly to Supabase, so we must match table columns: id, title, category, description, image_url, date)
        const dbProjects = DEFAULT_PROJECTS.map(p => ({
            id: p.id,
            title: p.title,
            category: p.category,
            description: p.description,
            image_url: p.imageUrl,
            date: p.date
        }));

        const { error } = await supabase.from('projects').upsert(dbProjects, { onConflict: 'id' });
        
        if (error) throw error;

        setSettingsMessage('✅ Database seeded successfully! Reloading...');
        setTimeout(() => window.location.reload(), 1500);

    } catch (err: any) {
        console.error("Seeding error:", err);
        setSettingsMessage('❌ Error seeding: ' + err.message);
    }
  };

  return (
    <div className="flex h-screen bg-black overflow-hidden">
      
      {/* Sidebar */}
      <aside className="w-64 bg-zinc-950 border-r border-zinc-900 flex flex-col pt-20 hidden md:flex">
        <div className="px-6 py-4">
          <h2 className="text-zinc-500 text-xs font-bold uppercase tracking-wider">Dashboard</h2>
        </div>
        <nav className="flex-1 space-y-1 px-3">
          <button 
            onClick={() => setActiveTab('projects')}
            className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${activeTab === 'projects' ? 'bg-zinc-900 text-white' : 'text-zinc-400 hover:bg-zinc-900/50 hover:text-white'}`}
          >
            <LayoutGrid size={18} className="mr-3" />
            Projects
          </button>
          <button 
            onClick={() => setActiveTab('categories')}
            className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${activeTab === 'categories' ? 'bg-zinc-900 text-white' : 'text-zinc-400 hover:bg-zinc-900/50 hover:text-white'}`}
          >
            <FolderOpen size={18} className="mr-3" />
            Categories
          </button>
          <button 
            onClick={() => setActiveTab('settings')}
            className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${activeTab === 'settings' ? 'bg-zinc-900 text-white' : 'text-zinc-400 hover:bg-zinc-900/50 hover:text-white'}`}
          >
            <Settings size={18} className="mr-3" />
            Site Settings
          </button>
        </nav>
        <div className="p-4 border-t border-zinc-900">
          <button onClick={logout} className="w-full flex items-center px-4 py-3 text-sm font-medium text-red-400 rounded-lg hover:bg-red-400/10 transition-colors">
            <LogOut size={18} className="mr-3" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto pt-20 pb-20 px-6 md:px-12 bg-black">
        
        {/* Mobile Tab Nav */}
        <div className="md:hidden flex space-x-2 mb-6 overflow-x-auto pb-2">
           <button onClick={() => setActiveTab('projects')} className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium ${activeTab === 'projects' ? 'bg-zinc-800 text-white' : 'bg-zinc-900 text-zinc-400'}`}>Projects</button>
           <button onClick={() => setActiveTab('categories')} className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium ${activeTab === 'categories' ? 'bg-zinc-800 text-white' : 'bg-zinc-900 text-zinc-400'}`}>Categories</button>
           <button onClick={() => setActiveTab('settings')} className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium ${activeTab === 'settings' ? 'bg-zinc-800 text-white' : 'bg-zinc-900 text-zinc-400'}`}>Settings</button>
        </div>

        {/* Content Area */}
        <div className="max-w-5xl mx-auto">
          
          {/* PROJECTS TAB */}
          {activeTab === 'projects' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-white">Projects</h1>
                    <p className="text-zinc-500 text-sm">Manage your portfolio items.</p>
                </div>
                <button 
                  onClick={openNewProjectModal}
                  className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg transition-colors font-medium text-sm"
                >
                  <Plus size={16} /> Add Project
                </button>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {projects.map((project) => (
                  <div key={project.id} className="flex flex-col md:flex-row items-center gap-4 bg-zinc-900 border border-zinc-800 p-4 rounded-xl group hover:border-zinc-700 transition-colors">
                    <img src={project.imageUrl} alt="" className="w-full md:w-20 h-20 object-cover rounded-lg bg-zinc-800" />
                    <div className="flex-1 text-center md:text-left">
                      <h3 className="text-white font-semibold">{project.title}</h3>
                      <div className="flex items-center justify-center md:justify-start gap-2 mt-1">
                          <span className="px-2 py-0.5 bg-zinc-800 text-zinc-400 rounded text-xs">{project.category}</span>
                          <span className="text-zinc-600 text-xs">{project.date}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => openEditProjectModal(project)}
                        className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors"
                        title="Edit"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button 
                        onClick={() => deleteProject(project.id)}
                        className="p-2 text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded-lg transition-colors"
                        title="Delete"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                ))}
                {projects.length === 0 && (
                   <div className="text-center py-12 border-2 border-dashed border-zinc-800 rounded-xl">
                      <p className="text-zinc-500">No projects found. Add one to get started.</p>
                   </div>
                )}
              </div>
            </div>
          )}

          {/* CATEGORIES TAB */}
          {activeTab === 'categories' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-white">Categories</h1>
                    <p className="text-zinc-500 text-sm">Organize your work into sections.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 {/* Add New */}
                 <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 h-fit">
                    <h3 className="text-white font-semibold mb-4">Add New Category</h3>
                    <form onSubmit={handleAddCategory} className="flex gap-2">
                        <input 
                            type="text" 
                            value={newCategoryName}
                            onChange={(e) => setNewCategoryName(e.target.value)}
                            placeholder="Category Name"
                            className="flex-1 bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-indigo-500"
                        />
                        <button type="submit" className="bg-white text-black font-semibold px-4 py-2 rounded-lg hover:bg-zinc-200">
                            Add
                        </button>
                    </form>
                 </div>

                 {/* List */}
                 <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
                    <ul className="divide-y divide-zinc-800">
                        {categories.map(cat => (
                            <li key={cat.id} className="flex justify-between items-center px-6 py-4 hover:bg-zinc-800/30 transition-colors">
                                <span className="text-zinc-200 font-medium">{cat.name}</span>
                                <button 
                                    onClick={() => deleteCategory(cat.id)}
                                    className="text-zinc-500 hover:text-red-400 transition-colors"
                                >
                                    <X size={16} />
                                </button>
                            </li>
                        ))}
                    </ul>
                 </div>
              </div>
            </div>
          )}

          {/* SETTINGS TAB */}
          {activeTab === 'settings' && (
            <div className="space-y-6">
               <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-white">Site Settings</h1>
                    <p className="text-zinc-500 text-sm">Manage global content and contact info.</p>
                </div>
                <div className="flex gap-3">
                   <button 
                     onClick={handleSeedDatabase}
                     className="flex items-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 px-4 py-2 rounded-lg transition-colors font-medium text-xs border border-zinc-700"
                     title="Upload default projects to database"
                   >
                     <Database size={14} /> Seed DB
                   </button>
                   <button 
                     onClick={handleConfigSave}
                     className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-2 rounded-lg transition-colors font-medium text-sm"
                   >
                     <Save size={16} /> Save Changes
                   </button>
                </div>
              </div>

              {settingsMessage && (
                  <div className={`p-3 rounded-lg text-sm text-center ${settingsMessage.includes('Error') ? 'bg-red-500/10 border border-red-500/20 text-red-400' : 'bg-green-500/10 border border-green-500/20 text-green-400'}`}>
                      {settingsMessage}
                  </div>
              )}

              <form className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 md:p-8 space-y-6">
                  
                  <div className="space-y-4">
                      <h3 className="text-white font-semibold border-b border-zinc-800 pb-2">Hero Section</h3>
                      <div>
                          <label className="block text-xs font-semibold text-zinc-500 uppercase mb-2">Main Headline (Use *asterisks* for gradient text)</label>
                          <input 
                              type="text" 
                              value={configForm.heroHeadline}
                              onChange={(e) => setConfigForm({...configForm, heroHeadline: e.target.value})}
                              className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-indigo-500"
                          />
                          <p className="text-[10px] text-zinc-600 mt-1">Example: We Craft *Digital Experiences* That Matter</p>
                      </div>
                      <div>
                          <label className="block text-xs font-semibold text-zinc-500 uppercase mb-2">Sub Headline</label>
                          <textarea 
                              rows={2}
                              value={configForm.heroSubheadline}
                              onChange={(e) => setConfigForm({...configForm, heroSubheadline: e.target.value})}
                              className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-indigo-500"
                          />
                      </div>
                  </div>

                  <div className="space-y-4 pt-4">
                      <h3 className="text-white font-semibold border-b border-zinc-800 pb-2">Contact Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-semibold text-zinc-500 uppercase mb-2">Email Address</label>
                            <input 
                                type="email" 
                                value={configForm.contactEmail}
                                onChange={(e) => setConfigForm({...configForm, contactEmail: e.target.value})}
                                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-indigo-500"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-zinc-500 uppercase mb-2">WhatsApp Number</label>
                            <input 
                                type="text" 
                                value={configForm.whatsappNumber}
                                onChange={(e) => setConfigForm({...configForm, whatsappNumber: e.target.value})}
                                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-indigo-500"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-zinc-500 uppercase mb-2">Instagram Handle</label>
                            <input 
                                type="text" 
                                value={configForm.instagramHandle}
                                onChange={(e) => setConfigForm({...configForm, instagramHandle: e.target.value})}
                                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-indigo-500"
                            />
                        </div>
                      </div>
                  </div>
              </form>
            </div>
          )}
        </div>
      </main>

      {/* Project Modal */}
      {isProjectModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl">
            <div className="flex justify-between items-center p-6 border-b border-zinc-800">
              <h2 className="text-xl font-bold text-white">{editingProject ? 'Edit Project' : 'Create New Project'}</h2>
              <button onClick={() => setIsProjectModalOpen(false)} className="text-zinc-400 hover:text-white">
                <X size={24} />
              </button>
            </div>
            
            <form onSubmit={handleProjectSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-zinc-500 uppercase mb-1">Project Title</label>
                  <input
                    type="text"
                    required
                    value={projectForm.title}
                    onChange={e => setProjectForm({...projectForm, title: e.target.value})}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-white focus:border-indigo-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-zinc-500 uppercase mb-1">Category</label>
                  <select
                    required
                    value={projectForm.category}
                    onChange={e => setProjectForm({...projectForm, category: e.target.value})}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-white focus:border-indigo-500 focus:outline-none"
                  >
                    <option value="">Select Category</option>
                    {categories.map(cat => (
                      <option key={cat.id} value={cat.name}>{cat.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                 <label className="block text-xs font-semibold text-zinc-500 uppercase mb-1">Image URL</label>
                 <div className="flex gap-2">
                   <input
                     type="url"
                     required
                     placeholder="https://..."
                     value={projectForm.imageUrl}
                     onChange={e => setProjectForm({...projectForm, imageUrl: e.target.value})}
                     className="flex-1 bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-white focus:border-indigo-500 focus:outline-none"
                   />
                   <button type="button" className="p-2 bg-zinc-800 rounded-lg text-zinc-400" title="Uses URL for demo">
                      <Image size={20} />
                   </button>
                 </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-500 uppercase mb-1">Description</label>
                <textarea
                  rows={4}
                  value={projectForm.description}
                  onChange={e => setProjectForm({...projectForm, description: e.target.value})}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-white focus:border-indigo-500 focus:outline-none"
                ></textarea>
              </div>

              <div className="flex justify-end pt-4">
                <button 
                  type="button" 
                  onClick={() => setIsProjectModalOpen(false)}
                  className="mr-3 px-4 py-2 text-zinc-400 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-6 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-lg transition-colors"
                >
                  {editingProject ? 'Save Changes' : 'Create Project'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;