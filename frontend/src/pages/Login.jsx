import { useState, useContext } from 'react';
import { UserContext, API } from '../context/userContext';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const Login = () => {
  const navigate = useNavigate();
  const { setUser, ready } = useContext(UserContext);
  const [data, setData] = useState({ email: '', password: '' });

  const loginUser = async (e) => {
    e.preventDefault();
    try {
      const response = await API.post('/login', data);
      if (response.data.error) {
        toast.error(response.data.error);
      } else {
        setUser(response.data);
        toast.success('Welcome!');
        navigate('/dashboard');
      }
    } catch (error) {
      console.log(error);
      toast.error("Login failed. Please check your credentials.");
    }
  };

  if (!ready) return (
    <div className="min-h-screen bg-[#F2F2F7] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-red-500/20 border-t-red-600 rounded-full animate-spin"></div>
        <p className="text-slate-400 font-black text-[10px] tracking-[0.3em] uppercase">Secure Session</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen pt-24 bg-[#F2F2F7] flex items-center justify-center p-6 relative overflow-hidden font-sans">
      {/* Liquid Background Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-125 h-125 bg-red-500/10 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-100 h-100 bg-orange-400/10 rounded-full blur-[100px]" />

      <div className="w-full max-w-110 liquid-glass rounded-[3rem] p-10 md:p-12 relative z-10 border border-white/60 shadow-2xl">
        {/* Branding Header */}
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-white rounded-2xl shadow-lg flex items-center justify-center mx-auto mb-6 rotate-3">
             <img src="/logo.png" alt="Logo" className="w-10 h-10 object-contain" />
          </div>
          <h1 className="text-4xl font-black tracking-tighter text-slate-900 mb-2">
            Mike<span className="text-red-600">Ai</span>
          </h1>
          <p className="text-slate-500 font-bold text-sm">Access your intelligence dashboard</p>
        </div>

        <form onSubmit={loginUser} className="space-y-5">
          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Email</label>
            <input 
              type="email" 
              placeholder="name@example.com"
              required
              className="w-full bg-white/40 backdrop-blur-md border border-white/80 rounded-2xl px-5 py-4 text-sm font-bold text-slate-800 placeholder:text-slate-300 outline-none focus:ring-4 focus:ring-red-500/10 focus:bg-white transition-all"
              onChange={(e) => setData({...data, email: e.target.value})}
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Password</label>
            <input 
              type="password" 
              placeholder="••••••••"
              required
              className="w-full bg-white/40 backdrop-blur-md border border-white/80 rounded-2xl px-5 py-4 text-sm font-bold text-slate-800 placeholder:text-slate-300 outline-none focus:ring-4 focus:ring-red-500/10 focus:bg-white transition-all"
              onChange={(e) => setData({...data, password: e.target.value})}
            />
          </div>

          <button 
            type="submit" 
            className="w-full py-5 bg-slate-900 text-white font-black rounded-3xl tracking-widest hover:bg-slate-800 active:scale-95 transition-all shadow-xl shadow-slate-300 mt-4 uppercase text-[11px]"
          >
            Authenticate
          </button>
        </form>

        <p className="text-center mt-10 text-sm font-bold text-slate-400">
          New here? <Link to="/register" className="text-red-600 hover:underline">Create Account</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;