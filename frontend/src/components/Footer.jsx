/* eslint-disable no-unused-vars */
import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { UserContext } from '../context/userContext';
import { FaGithub, FaTwitter, FaDiscord, FaIceCream } from 'react-icons/fa';

const Footer = () => {
  const location = useLocation();
  if (['/login', '/register'].includes(location.pathname)) return null;

  return (
    <footer className="lg:px-6 pb-10 pt-20">
      <div className="max-w-7xl mx-auto liquid-glass rounded-[3rem] p-12 border-white/50">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex lg:pl-10 items-center gap-3 mb-6">
              <div className="">
                <img src="/logo.png" className="w-8 h-8" alt="Logo" />
              </div>
              <span className="font-black  text-2xl tracking-tighter">MikeAI</span>
            </div>
            <p className="text-slate-500 lg:pl-10 font-bold text-sm max-w-xs leading-relaxed">
              Getting the best from AI, connected with fast workflows.
            </p>
          </div>
          <div>
            <h4 className="font-black text-[10px] tracking-[0.3em] uppercase mb-6 text-slate-400">Platform</h4>
            <ul className="space-y-4 text-sm font-black text-slate-800">
              <li><Link to="/dashboard" className="hover:text-red-600 transition-colors">Dashboard</Link></li>
              <li><Link to="/documents" className="hover:text-red-600 transition-colors">Documents</Link></li>
              <li><Link to="/documents" className="hover:text-red-600 transition-colors">About</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-black text-[10px] tracking-[0.3em] uppercase mb-6 text-slate-400">Connect</h4>
            <div className="flex gap-6 text-slate-800">
              <FaTwitter size={20} className="hover:text-red-600 cursor-pointer transition-colors" />
              <FaGithub size={20} className="hover:text-red-600 cursor-pointer transition-colors" />
              <FaIceCream size={20} className="hover:text-red-600 cursor-pointer transition-colors" />
            </div>
          </div>
        </div>
        <div className="pt-8 border-t border-white/20 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">
          <p className='lg:pl-10 '>© 2026 MikeAI Workspace</p>
          <p>Privacy • Terms • Security</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;