import { useState, useContext } from 'react';
import { API } from '../context/userContext';
import { toast } from 'react-hot-toast';
import { useNavigate, Link } from 'react-router-dom';
import { UserContext } from '../context/userContext';

const Register = () => {
  const navigate = useNavigate();
  const { ready } = useContext(UserContext);
  const [data, setData] = useState({ name: '', email: '', password: '', giftCode: '' });
  const [agreed, setAgreed] = useState(false);

  const registerUser = async (e) => {
    e.preventDefault();
    if (!agreed) return toast.error("Please agree to the terms");
    
    try {
      const response = await API.post('/register', data);
      if (response.data.error) {
        toast.error(response.data.error);
      } else {
        if (response.data.giftApplied) toast.success('🎉 Bonus Activated!');
        toast.success('Account Created!');
        navigate('/login');
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occurred during registration");
    }
  };

  if (!ready) return (
    <div className="min-h-screen bg-[#F2F2F7] flex items-center justify-center">
      <div className="w-10 h-10 border-4 border-red-500/20 border-t-red-600 rounded-full animate-spin"></div>
    </div>
  );

  return (
    <div className="min-h-screen pt-24 bg-[#F2F2F7] flex items-center justify-center p-6 relative overflow-hidden font-sans">
      <div className="absolute top-[-5%] right-[-10%] w-150 h-150 bg-red-500/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-[5%] left-[-5%] w-100 h-100 bg-orange-400/10 rounded-full blur-[100px]" />

      <div className="w-full max-w-120 liquid-glass rounded-[3rem] p-10 md:p-12 relative z-10 border border-white/60 shadow-2xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-black tracking-tighter text-slate-900 mb-2">Initialize <span className="text-red-600">MikeAi</span></h1>
          <p className="text-slate-500 font-bold text-sm">Experience intelligence without limits.</p>
        </div>

        <form onSubmit={registerUser} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Name</label>
              <input 
                type="text" placeholder="Enter Your Name" required
                className="w-full bg-white/40 border border-white/80 rounded-2xl px-5 py-4 text-sm font-bold text-slate-800 outline-none focus:bg-white transition-all"
                onChange={(e) => setData({...data, name: e.target.value})}
              />
            </div>
            
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Email Address</label>
            <input 
              type="email" placeholder="hello@world.com" required
              className="w-full bg-white/40 border border-white/80 rounded-2xl px-5 py-4 text-sm font-bold text-slate-800 outline-none focus:bg-white transition-all"
              onChange={(e) => setData({...data, email: e.target.value})}
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Secure Password</label>
            <input 
              type="password" placeholder="••••••••" required
              className="w-full bg-white/40 border border-white/80 rounded-2xl px-5 py-4 text-sm font-bold text-slate-800 outline-none focus:bg-white transition-all"
              onChange={(e) => setData({...data, password: e.target.value})}
            />
          </div>
          <div className="space-y-1.5">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Gift Code</label>
              <input 
                type="text" placeholder="Optional"
                className="w-full bg-red-50/50 border border-red-100 rounded-2xl px-5 py-4 text-sm font-bold text-red-600 placeholder:text-red-200 outline-none focus:bg-white transition-all"
                onChange={(e) => setData({...data, giftCode: e.target.value})}
              />
            </div>

          <div className="flex items-center gap-3 py-2 px-2">
            <input 
              id="terms" type="checkbox" checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="w-5 h-5 rounded-lg border-white bg-white/50 text-red-600 focus:ring-0 cursor-pointer" 
            />
            <label htmlFor="terms" className="text-[11px] font-bold text-slate-500 leading-tight">
              I agree to the <Link to="/about" className="text-red-600 hover:underline">Liquid Protocol & Terms</Link>
            </label>
          </div>

          <button 
            type="submit" 
            className="w-full py-5 bg-linear-to-r from-red-700 via-red-600 to-orange-500 text-white font-black rounded-3xl tracking-widest hover:brightness-110 active:scale-95 transition-all shadow-xl shadow-red-200 uppercase text-[11px]"
          >
            Launch Account
          </button>
        </form>

        <p className="text-center mt-8 text-sm font-bold text-slate-400">
          Already a member? <Link to="/login" className="text-red-600 hover:underline">Sign In</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;