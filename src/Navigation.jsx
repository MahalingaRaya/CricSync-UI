import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Briefcase, Activity, User } from 'lucide-react';

export const Navigation = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const navItems = [
    { name: 'Feed', path: '/', icon: <Home size={20} /> },
    { name: 'Organize', path: '/organize', icon: <Briefcase size={20} /> },
    { name: 'Live Scoring', path: '/create-match', icon: <Activity size={20} /> },
    { name: 'Identity', path: '/profile', icon: <User size={20} /> }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black/90 backdrop-blur-md border-t border-zinc-800 z-50">
      <div className="max-w-md mx-auto flex justify-between items-center px-6 py-3">
        {navItems.map((item) => {
          // Updated to check for 'Live Scoring' instead of 'Live Engine'
          const isActive = currentPath === item.path || (item.name === 'Live Scoring' && currentPath.includes('/match-center'));
          
          return (
            <Link 
              key={item.name} 
              to={item.path} 
              className={`flex flex-col items-center gap-1 transition-colors ${isActive ? 'text-emerald-400' : 'text-zinc-500 hover:text-zinc-300'}`}
            >
              {item.icon}
              <span className="text-[10px] font-black uppercase tracking-wider">{item.name}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
