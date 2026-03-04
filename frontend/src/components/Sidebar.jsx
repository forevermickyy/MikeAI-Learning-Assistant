import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  HiOutlineHome, HiOutlineViewGrid, HiOutlineInformationCircle, 
  HiOutlineLightningBolt, HiOutlineQuestionMarkCircle, HiOutlineChatAlt2, 
  HiOutlineDocumentText, HiOutlineUserCircle, HiOutlineCog,
  HiChevronRight, HiChevronLeft, HiChevronDown, HiOutlinePencilAlt,
  HiOutlineDocumentAdd, HiOutlineCollection, HiOutlinePhotograph,
  HiOutlineVideoCamera, HiOutlineMicrophone, HiOutlineMusicNote
} from 'react-icons/hi';

const Sidebar = ({ isOpen, isExpanded, setIsExpanded, closeSidebar, onChatOpen }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isDashExpanded, setIsDashExpanded] = useState(false);

  const menuItems = [
    { name: 'Home', icon: <HiOutlineHome />, path: '/' },
    { 
      name: 'Dashboard', 
      icon: <HiOutlineViewGrid />, 
      path: '/dashboard',
      isExpandable: true,
      subItems: [
        { name: 'Generate Quizzes', path: '/dashboard/quizzes', icon: <HiOutlinePencilAlt />, tier: 'free' },
        { name: 'Make Document', path: '/dashboard/make-document', icon: <HiOutlineDocumentAdd />, tier: 'free' },
        { name: 'Summarize Notes', path: '/dashboard/summarize', icon: <HiOutlineCollection />, tier: 'free' },
        { name: 'Generate Image', path: '/dashboard/generate-image', icon: <HiOutlinePhotograph />, tier: 'free' },
        { name: 'Transcribe Video', path: '/dashboard/transcribe-video', icon: <HiOutlineVideoCamera />, tier: 'plus' },
        { name: 'Transcribe Audio', path: '/dashboard/transcribe-audio', icon: <HiOutlineMicrophone />, tier: 'plus' },
        { name: 'Summarize Video', path: '/dashboard/summarize-video', icon: <HiOutlineVideoCamera />, tier: 'plus' },
        { name: 'Summarize Audio', path: '/dashboard/summarize-audio', icon: <HiOutlineMicrophone />, tier: 'plus' },
        { name: 'Generate Audio', path: '/dashboard/generate-audio', icon: <HiOutlineMusicNote />, tier: 'plus' },
        { name: 'Generate Video', path: '/dashboard/generate-video', icon: <HiOutlineVideoCamera />, tier: 'plus' },
      ]
    }, 
    { name: 'About', icon: <HiOutlineInformationCircle />, path: '/about' },
    { 
      name: 'About +', 
      icon: <HiOutlineLightningBolt />, 
      path: '/about', 
      action: () => {
        const element = document.getElementById('about-plus');
        if (element) element.scrollIntoView({ behavior: 'smooth' });
        else navigate('/about#about-plus');
      } 
    },
    { name: 'FAQ', icon: <HiOutlineQuestionMarkCircle />, path: '/faq' },
    { name: 'Chat with MikeAi', icon: <HiOutlineChatAlt2 />, path: '#', action: onChatOpen },
    { name: 'My Account', icon: <HiOutlineUserCircle />, path: '/account' },
    { name: 'Settings', icon: <HiOutlineCog />, path: '/settings' },
  ];

  const isLabelsVisible = isExpanded || (window.innerWidth < 1024 && isOpen);

  if (['/login', '/register'].includes(location.pathname)) return null;

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-slate-900/10 backdrop-blur-sm z-60 lg:hidden" onClick={closeSidebar} />
      )}

      <aside className={`
        fixed left-4 bottom-4 z-70 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]
        top-24 liquid-glass rounded-[2.5rem]
        ${isOpen ? 'translate-x-0 w-72' : '-translate-x-[120%] lg:translate-x-0'}
        ${isExpanded ? 'lg:w-80' : 'lg:w-20'}
      `}>
        <button onClick={() => setIsExpanded(!isExpanded)} className="hidden lg:flex absolute -right-3 top-12 w-8 h-8 bg-white border border-slate-100 rounded-full items-center justify-center text-slate-400 hover:text-red-600 shadow-xl z-80 hover:scale-110 transition-all">
          {isExpanded ? <HiChevronLeft size={16} /> : <HiChevronRight size={16} />}
        </button>

        <div className="flex flex-col h-full py-8 px-3 overflow-y-auto no-scrollbar">
          <div className="flex-1 space-y-1">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path;
              const hasSubItems = item.isExpandable && item.subItems;

              return (
                <div key={item.name} className="space-y-1">
                  <div className="relative flex items-center">
                    <Link 
                      to={item.path} 
                      onClick={(e) => {
                        if (item.action) {
                          e.preventDefault(); 
                          item.action();
                        }
                        if (window.innerWidth < 1024 && !item.isExpandable) closeSidebar();
                      }}
                      className={`flex-1 flex items-center p-3.5 rounded-3xl transition-all duration-300 group
                        ${isActive ? 'bg-white shadow-lg text-red-600 ring-1 ring-black/5' : 'text-slate-500 hover:bg-white/40'}
                      `}
                    >
                      <div className="text-2xl min-w-8 flex justify-center group-hover:scale-110 transition-transform">
                        {item.icon}
                      </div>
                      {isLabelsVisible && (
                        <span className="ml-3 font-black text-xs uppercase tracking-widest truncate">
                          {item.name}
                        </span>
                      )}
                    </Link>

                    {/* Expansion Trigger */}
                    {hasSubItems && isLabelsVisible && (
                      <button 
                        onClick={() => setIsDashExpanded(!isDashExpanded)}
                        className={`absolute right-2 p-2 rounded-full transition-transform duration-300 ${isDashExpanded ? 'rotate-180 text-red-600' : 'text-slate-400'}`}
                      >
                        <HiChevronDown size={18} />
                      </button>
                    )}
                  </div>

                  {/* Sub-menu rendering */}
                  {hasSubItems && isDashExpanded && isLabelsVisible && (
                    <div className="ml-6 pl-4 border-l-2 border-slate-100 space-y-1 animate-in slide-in-from-top-2 duration-300">
                      {item.subItems.map((sub) => (
                        <Link
                          key={sub.name}
                          to={sub.path}
                          onClick={() => window.innerWidth < 1024 && closeSidebar()}
                          className={`flex items-center justify-between p-2.5 rounded-2xl text-[10px] font-bold uppercase tracking-wider transition-all
                            ${location.pathname === sub.path ? 'bg-red-50 text-red-600' : 'text-slate-400 hover:bg-white/50 hover:text-slate-600'}
                          `}
                        >
                          <div className="flex items-center gap-2">
                            <span className="text-lg">{sub.icon}</span>
                            {sub.name}
                          </div>
                          {sub.tier === 'plus' && (
                            <span className="px-1.5 py-0.5 rounded-md bg-linear-to-r from-red-500 to-orange-400 text-[8px] text-white">PLUS</span>
                          )}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Upgrade Card stays here */}
          {isLabelsVisible && (
            <div className="mt-8 p-1 animate-in zoom-in-95 duration-500">
               <div className="bg-linear-to-br from-red-500 to-orange-400 p-5 rounded-4xl shadow-lg shadow-red-200 relative overflow-hidden group">
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                <p className="text-[10px] font-black text-white uppercase tracking-[0.2em] opacity-80">MikeAI Plus</p>
                <button className="mt-3 w-full py-3 bg-white text-red-600 text-[10px] font-black rounded-2xl shadow-sm hover:scale-105 transition-transform">
                  UPGRADE NOW
                </button>
              </div>
            </div>
          )}
        </div>
      </aside>
    </>
  );
};

export default Sidebar;