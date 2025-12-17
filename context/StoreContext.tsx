import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Project, Category, SiteConfig, DEFAULT_CATEGORIES, DEFAULT_PROJECTS, DEFAULT_SITE_CONFIG } from '../types';
import { supabase } from '../lib/supabaseClient';

interface StoreContextType {
  projects: Project[];
  categories: Category[];
  siteConfig: SiteConfig;
  isAuthenticated: boolean;
  login: (password: string) => boolean;
  logout: () => void;
  addProject: (project: Project) => void;
  deleteProject: (id: string) => void;
  updateProject: (project: Project) => void;
  addCategory: (name: string) => void;
  deleteCategory: (id: string) => void;
  updateSiteConfig: (config: SiteConfig) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider = ({ children }: { children?: ReactNode }) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [siteConfig, setSiteConfig] = useState<SiteConfig>(DEFAULT_SITE_CONFIG);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // --- Auth Logic (Local Session) ---
  useEffect(() => {
    const storedAuth = localStorage.getItem('shah_auth');
    if (storedAuth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const login = (password: string) => {
    if (password === 'commatoze') {
      setIsAuthenticated(true);
      localStorage.setItem('shah_auth', 'true');
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('shah_auth');
  };

  // --- Supabase Data Fetching ---
  const fetchData = async () => {
    try {
      // 1. Fetch Projects
      const { data: projData, error: projError } = await supabase
        .from('projects')
        .select('*')
        .order('date', { ascending: false });

      if (projError) {
        console.warn("⚠️ Supabase Project Error (Using fallback data):", projError.message);
        if (projects.length === 0) setProjects(DEFAULT_PROJECTS);
      } else if (projData) {
        console.log("✅ Supabase Projects Connected:", projData.length, "items found");
        
        if (projData.length === 0) {
           // Optional: keep default if DB is empty so site isn't blank
           if (projects.length === 0) setProjects(DEFAULT_PROJECTS);
        } else {
           // Map snake_case to camelCase
          const mappedProjects: Project[] = projData.map((p: any) => ({
            id: p.id,
            title: p.title,
            category: p.category,
            description: p.description,
            imageUrl: p.image_url,
            date: p.date
          }));
          setProjects(mappedProjects);
        }
      }

      // 2. Fetch Categories
      const { data: catData, error: catError } = await supabase
        .from('categories')
        .select('*');

      if (catError) {
        console.warn("⚠️ Supabase Category Error:", catError.message);
        setCategories(DEFAULT_CATEGORIES);
      } else if (catData && catData.length > 0) {
        setCategories(catData);
      } else {
        setCategories(DEFAULT_CATEGORIES);
      }

      // 3. Fetch Site Config
      const { data: configData, error: configError } = await supabase
        .from('site_config')
        .select('*')
        .single();

      if (configError) {
         console.warn("⚠️ Supabase Config Error:", configError.message);
      } else if (configData) {
        setSiteConfig({
          heroHeadline: configData.hero_headline,
          heroSubheadline: configData.hero_subheadline,
          contactEmail: configData.contact_email,
          instagramHandle: configData.instagram_handle,
          whatsappNumber: configData.whatsapp_number
        });
      }

    } catch (error) {
      console.error("❌ Critical Error fetching data from Supabase:", error);
      // Ensure defaults are loaded if critical failure
      if (projects.length === 0) setProjects(DEFAULT_PROJECTS);
      if (categories.length === 0) setCategories(DEFAULT_CATEGORIES);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // --- Supabase Mutations ---

  const addProject = async (project: Project) => {
    // Optimistic Update
    setProjects([project, ...projects]);

    const { error } = await supabase.from('projects').insert([{
      id: project.id,
      title: project.title,
      category: project.category,
      description: project.description,
      image_url: project.imageUrl,
      date: project.date
    }]);

    if (error) {
      console.error("Error adding project:", error);
      fetchData(); // Revert on error
    }
  };

  const deleteProject = async (id: string) => {
    // Optimistic Update
    setProjects(projects.filter(p => p.id !== id));

    const { error } = await supabase.from('projects').delete().eq('id', id);

    if (error) {
      console.error("Error deleting project:", error);
      fetchData();
    }
  };

  const updateProject = async (project: Project) => {
    // Optimistic Update
    setProjects(projects.map(p => p.id === project.id ? project : p));

    const { error } = await supabase.from('projects').update({
      title: project.title,
      category: project.category,
      description: project.description,
      image_url: project.imageUrl,
      date: project.date
    }).eq('id', project.id);

    if (error) {
      console.error("Error updating project:", error);
      fetchData();
    }
  };

  const addCategory = async (name: string) => {
    const newId = name.toLowerCase().replace(/\s+/g, '-');
    const newCat = { id: newId, name };
    
    // Optimistic
    setCategories([...categories, newCat]);

    const { error } = await supabase.from('categories').insert([newCat]);

    if (error) {
       console.error("Error adding category:", error);
       fetchData();
    }
  };

  const deleteCategory = async (id: string) => {
    // Optimistic
    setCategories(categories.filter(c => c.id !== id));

    const { error } = await supabase.from('categories').delete().eq('id', id);

    if (error) {
        console.error("Error deleting category:", error);
        fetchData();
    }
  };

  const updateSiteConfig = async (config: SiteConfig) => {
    // Optimistic
    setSiteConfig(config);

    const { error } = await supabase.from('site_config').update({
        hero_headline: config.heroHeadline,
        hero_subheadline: config.heroSubheadline,
        contact_email: config.contactEmail,
        instagram_handle: config.instagramHandle,
        whatsapp_number: config.whatsappNumber
    }).eq('id', 1); // Assuming single row with ID 1

    if (error) {
        console.error("Error updating config:", error);
        fetchData();
    }
  };

  return (
    <StoreContext.Provider value={{
      projects,
      categories,
      siteConfig,
      isAuthenticated,
      login,
      logout,
      addProject,
      deleteProject,
      updateProject,
      addCategory,
      deleteCategory,
      updateSiteConfig
    }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};