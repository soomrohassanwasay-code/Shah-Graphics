import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { Lock } from 'lucide-react';

const Footer = () => {
  const { isAuthenticated, logout } = useStore();
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-zinc-950 py-12 border-t border-zinc-900 mt-auto">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-zinc-500 text-sm">
          &copy; {currentYear} Shah Graphics. All rights reserved.
        </div>
        
        <div className="flex items-center gap-6">
           {isAuthenticated ? (
             <div className="flex items-center gap-4">
                <Link to="/admin" className="text-zinc-600 hover:text-zinc-400 text-xs transition-colors">
                  Dashboard
                </Link>
                <button 
                  onClick={logout}
                  className="text-zinc-600 hover:text-red-400 text-xs transition-colors"
                >
                  Logout
                </button>
             </div>
           ) : (
            <div className="flex items-center gap-2">
               {/* Hidden Textbox Access */}
               <div className="relative group h-8 w-32 flex items-center justify-end">
                  <input 
                      type="text"
                      className="w-full h-full bg-transparent text-zinc-400 text-xs px-3 rounded
                                border border-transparent 
                                group-hover:bg-zinc-900 group-hover:border-zinc-800
                                focus:bg-zinc-900 focus:border-zinc-700 focus:opacity-100
                                opacity-0 group-hover:opacity-100 
                                transition-all duration-300 outline-none placeholder-zinc-700"
                      placeholder="Admin Access..."
                      autoComplete="off"
                      onChange={(e) => {
                        if (e.target.value.toLowerCase() === 'admin') {
                          navigate('/admin-login');
                        }
                      }}
                  />
               </div>

               {/* New Icon Access Point */}
               <Link 
                 to="/admin-login" 
                 className="p-2 text-zinc-800 hover:text-zinc-500 transition-colors"
                 title="Admin Login"
               >
                 <Lock size={14} />
               </Link>
            </div>
           )}
        </div>
      </div>
    </footer>
  );
};

export default Footer;