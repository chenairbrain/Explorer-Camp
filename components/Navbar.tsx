import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar: React.FC = () => {
  const location = useLocation();

  return (
    <nav className="bg-white/95 backdrop-blur-lg sticky top-0 z-50 border-b border-brand-accent shadow-sm">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-4 group">
          <div className="w-12 h-12 bg-brand-primary rounded-2xl flex items-center justify-center text-white shadow-xl shadow-brand-primary/20 group-hover:rotate-12 transition-transform">
            <i className="fas fa-mountain-sun text-xl"></i>
          </div>
          <span className="font-black text-2xl tracking-tighter text-slate-900 hidden sm:inline">探索山林</span>
        </Link>

        <div className="flex gap-3">
          <Link
            to="/"
            className={`px-6 py-3 rounded-2xl text-sm font-black transition-all ${
              location.pathname === '/' || location.pathname.startsWith('/team') 
                ? 'bg-brand-primary text-white shadow-lg' 
                : 'text-slate-500 hover:bg-brand-soft hover:text-brand-primary'
            }`}
          >
            <i className="fas fa-th-large mr-2"></i>小隊
          </Link>
          <Link
            to="/admin"
            className={`px-6 py-3 rounded-2xl text-sm font-black transition-all ${
              location.pathname === '/admin' 
                ? 'bg-brand-primary text-white shadow-lg' 
                : 'text-slate-500 hover:bg-brand-soft hover:text-brand-primary'
            }`}
          >
            <i className="fas fa-chart-pie mr-2"></i>管理
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;