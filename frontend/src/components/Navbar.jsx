import { useState, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { UserContext } from '../context/userContext';
import { HiMenuAlt3 } from 'react-icons/hi';

const Navbar = ({ toggleSidebar }) => {
  const { user, logout } = useContext(UserContext);
  const location = useLocation();
  const [showDropdown, setShowDropdown] = useState(false);

  const isDashboard = location.pathname === '/dashboard';
  const isLoggedIn = !!user;

  return (
    // Changed: Removed px-4, top-0, and left/right-0 ensures it sticks to the very edges
    <nav className="fixed top-0 left-0 w-full z-50">
      {/* Changed: Removed rounded-[2rem], added border-b only */}
      <div className="w-full bg-white/70 backdrop-blur-2xl border-b border-white/40 px-6 py-4 flex items-center justify-between shadow-sm">
        
        <div className="flex items-center gap-4">
          {isLoggedIn && isDashboard && (
            <button onClick={toggleSidebar} className="p-2 hover:bg-slate-100 rounded-xl lg:hidden block transition-all active:scale-90">
              <HiMenuAlt3 className="text-2xl text-slate-700" />
            </button>
          )}
          <Link to="/" className="flex items-center gap-2 group">
            <div className=" group-hover:rotate-6 transition-transform">
              <img src="/logo.png" alt="Logo" className="w-10 h-10 object-contain" />
            </div>
            <span className="text-2xl font-black tracking-tighter text-slate-900 flex items-center">
  Mike
  <span className="bg-linear-to-r from-red-600 to-orange-500 bg-clip-text text-transparent ml-0.5">
    AI
  </span>
</span>
          </Link>
        </div>

        <div className="flex items-center gap-4">
          {isLoggedIn && (
            <button className="hidden md:flex items-center bg-linear-to-r from-red-600 to-orange-500 text-white px-5 py-2 rounded-full text-[10px] font-black tracking-widest shadow-lg shadow-red-200 hover:brightness-110 transition-all">
              UPGRADE
            </button>
          )}

          {isLoggedIn ? (
            <div className="relative">
              <button 
                onClick={() => setShowDropdown(!showDropdown)}
                className="w-10 h-10 rounded-full p-0.5 bg-slate-200 shadow-inner overflow-hidden active:scale-90 transition-all"
              >
                {user.avatar ? (
                  <img src={user.avatar} alt="User" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-slate-700 font-black">{user.name[0]}</span>
                )}
              </button>

              {showDropdown && (
                <>
                  <div className="fixed inset-0 z-0" onClick={() => setShowDropdown(false)}></div>
                  {/* Changed: mt-2 to align closer to the flat navbar */}
                  <div className="absolute right-0 mt-2 w-56 liquid-glass border border-white/50 shadow-2xl rounded-3xl py-3 z-10 animate-in fade-in slide-in-from-top-2 duration-200">
                    <Link to='/account'>
                    <div className="px-6 py-3 border-b border-white/20 mb-2">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Account</p>
                      <p className="text-sm font-bold text-slate-800 truncate">{user.name}</p>
                    </div>
                    </Link>
                    <button onClick={logout} className="w-full text-left px-6 py-3 text-sm text-red-600 font-black hover:bg-red-50/50 transition-colors">
                      Sign Out
                    </button>
                  </div>
                </>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link to="/login" className="text-sm font-black text-slate-600 hover:text-red-600 transition-colors">Sign In</Link>
              <Link to="/register" className="bg-slate-900 text-white font-black py-2.5 px-6 rounded-xl text-sm shadow-xl active:scale-95 transition-all">Sign Up</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};
export default Navbar;