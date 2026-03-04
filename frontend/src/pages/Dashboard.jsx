import React, { useContext,useState } from 'react';
import { UserContext } from '../context/userContext';
import Chat from '../components/Chat';
import { 
  HiOutlineDocumentText, HiOutlinePhotograph, HiOutlineVideoCamera, 
  HiOutlineMicrophone, HiOutlineQuestionMarkCircle, HiOutlineLockClosed,
  HiOutlineSparkles,HiOutlineChatAlt2,  HiOutlineUpload, HiOutlineCube, HiOutlineLightningBolt 
} from 'react-icons/hi';

// --- Sub-components (Declared outside to prevent re-render errors) ---

const Tooltip = ({ text }) => (
  <div className="group relative inline-block ml-1">
    <HiOutlineQuestionMarkCircle className="text-slate-400 cursor-help hover:text-red-500 transition-colors" />
    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block w-48 p-3 bg-slate-900 text-white text-[10px] font-bold rounded-xl shadow-2xl z-50 leading-relaxed pointer-events-none border border-white/10">
      {text}
      <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-slate-900" />
    </div>
  </div>
);

const ActionButton = ({ icon, label, disabled }) => (
  <button 
    disabled={disabled}
    className={`w-full flex items-center gap-3 p-3 rounded-2xl text-[10px] font-black uppercase tracking-tight transition-all border ${
      disabled 
      ? 'bg-slate-100/50 text-slate-400 border-transparent cursor-not-allowed opacity-60' 
      : 'bg-white/60 border-white text-slate-700 hover:bg-white hover:scale-[1.02] hover:shadow-md active:scale-95'
    }`}
  >
    <span className="text-sm">{icon}</span>
    {label}
  </button>
);

const LabCard = ({ title, color, children, isLocked, tooltipText, isPlus }) => {
  const colors = {
    blue: "from-blue-500/10 to-indigo-500/10 border-blue-100/50",
    purple: "from-purple-500/10 to-pink-500/10 border-purple-100/50",
    orange: "from-amber-400/20 to-orange-500/20 border-orange-200/50 shadow-orange-100/20",
    red: "from-rose-400/20 to-red-500/20 border-red-200/50 shadow-red-100/20"
  };

  return (
   <div className={`relative p-6 rounded-[2.5rem] border bg-linear-to-br backdrop-blur-xl ${colors[color]} transition-all duration-500 overflow-hidden ${isPlus ? 'hover:shadow-[0_0_40px_rgba(249,115,22,0.25)]' : 'hover:shadow-lg'}`}>
      {/* Premium Unique Effect */}
      {isPlus && (
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/40 to-transparent w-full animate-shimmer-fast opacity-30 shadow-[0_0_30px_rgba(255,255,255,0.5)]" />
        </div>
      )}
      
      <div className="relative z-10 flex justify-between items-center mb-4">
        <h3 className={`text-[10px] font-black uppercase tracking-[0.2em] ${isPlus ? 'text-orange-700' : 'text-slate-500'}`}>
          {title}
        </h3>
        <div className="flex items-center gap-1">
          {isLocked && <HiOutlineLockClosed className="text-orange-600 text-xs animate-pulse" />}
          <Tooltip text={tooltipText} />
        </div>
      </div>

      <div className="relative z-10 space-y-2">
        {children}
      </div>

      {isLocked && (
        <div className="absolute inset-0 bg-slate-50/20 backdrop-blur-xs rounded-[2.5rem] flex items-center justify-center z-20">
            <span className="text-[9px] font-black uppercase text-orange-700 tracking-tighter bg-white/95 px-4 py-1.5 rounded-full shadow-2xl border border-orange-100">
              MikeAI+ Exclusive
            </span>
        </div>
      )}
    </div>
  );
};

// --- Main Dashboard Component ---

const Dashboard = () => {
  const { user } = useContext(UserContext);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const isPremium = user?.gift || user?.isPlus;

  const getGreeting = () => {
    const tone = user?.profile?.tonePreference?.toLowerCase();

   if (!user?.name) return "Welcome back, User.";

    const firstName = user.name.split(' ')[0];
    const formattedName = firstName.charAt(0).toUpperCase() + firstName.slice(1);

    if (tone === 'academic') return "Greetings, Scholar.";
    if (tone === 'casual') return "Yo, what's up?";
    return `Welcome back, ${formattedName}.`;
  };

  return (
    <div className="min-h-screen bg-slate-50/80 pt-28 pb-10 px-6 font-sans">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* --- HEADER SECTION --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8 liquid-glass p-10 rounded-[3.5rem] border-white shadow-2xl bg-linear-to-br from-slate-900 to-slate-800 text-white relative overflow-hidden group">
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-red-500/20 rounded-full blur-[100px] group-hover:bg-red-500/30 transition-all duration-700" />
            <div className="relative z-10">
              <h1 className="text-5xl font-black tracking-tighter mb-4 drop-shadow-md">
                {getGreeting()}
              </h1>
              <p className="text-slate-400 font-bold text-lg max-w-xl leading-relaxed">
                Identity: <span className="text-red-500">{user?.profile?.role || 'User'}</span>. 
                Intelligence: <span className="text-orange-400">{user?.profile?.metadata?.smartnessRating}/10</span>. 
                Tone: <span className="text-blue-400">{user?.profile?.tonePreference}</span>.
              </p>
            </div>
          </div>

          <div className="lg:col-span-4 liquid-glass p-8 rounded-[3.5rem] border-white shadow-xl flex flex-col justify-center gap-6 bg-white/40">
            <div className="flex items-center gap-5 group">
              <div className="p-4 bg-orange-100 rounded-3xl text-orange-600 shadow-inner group-hover:scale-110 transition-transform"><HiOutlineLightningBolt className="text-2xl"/></div>
              <div>
                <p className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em]">Active Link</p>
                <p className="font-black text-slate-800 text-lg">{user?.profile?.metadata?.favAi || 'Gemini 3 Flash'}</p>
              </div>
            </div>
            <div className="flex items-center gap-5 group">
              <div className="p-4 bg-purple-100 rounded-3xl text-purple-600 shadow-inner group-hover:scale-110 transition-transform"><HiOutlineCube className="text-2xl"/></div>
              <div>
                <p className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em]">MiKEAi Focus</p>
                <p className="font-black text-slate-800 text-lg">{user?.profile?.specialization || 'General Innovation'}</p>
              </div>
            </div>
          </div>
        </div>

        {/* --- LABS ROW --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <LabCard title="Document Lab" color="blue" tooltipText="Analyze PDFs or generate DOCX reports.">
            <ActionButton icon={<HiOutlineUpload />} label="Upload PDF/DOCX" />
            <ActionButton icon={<HiOutlineDocumentText />} label="Generate File" />
          </LabCard>

          <LabCard title="Visual Lab" color="purple" tooltipText="OCR for images and AI asset generation.">
            <ActionButton icon={<HiOutlinePhotograph />} label="Upload Image" />
            <ActionButton icon={<HiOutlineSparkles />} label="Generate Visuals" />
          </LabCard>

          <LabCard title="Audio Lab" color="orange" isPlus isLocked={!isPremium} tooltipText="Voice cloning & audio transcription (MikeAI+).">
            <ActionButton icon={<HiOutlineMicrophone />} label="Neural Audio" disabled={!isPremium} />
            <ActionButton icon={<HiOutlineSparkles />} label="Voice Synthesis" disabled={!isPremium} />
          </LabCard>

          <LabCard title="Motion Lab" color="red" isPlus isLocked={!isPremium} tooltipText="Video insight and scene generation (MikeAI+).">
            <ActionButton icon={<HiOutlineVideoCamera />} label="Video Analysis" disabled={!isPremium} />
            <ActionButton icon={<HiOutlineSparkles />} label="Generate Clip" disabled={!isPremium} />
          </LabCard>
        </div>

        {/* --- INTERFACE GRID --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-4">
          
          {/*  Suggestions */}
          <div className="hidden lg:block lg:col-span-3 space-y-5">
            <div className="px-4 flex justify-between items-center">
              <h3 className="text-[11px] font-black uppercase text-slate-400 tracking-[0.2em]">Suggestions</h3>
              <div className="w-8 h-px bg-slate-200" />
            </div>
            <div className="space-y-3">
              {[
                { label: "Refine Coursework", icon: <HiOutlineSparkles/>, color: "text-red-500" },
                { label: "Identity Sync", icon: <HiOutlineCube/>, color: "text-orange-500" },
                { label: "Audit", icon: <HiOutlineLightningBolt/>, color: "text-blue-500" }
              ].map((item, idx) => (
                <button key={idx} className="w-full text-left p-5 rounded-4xl bg-white/40 border border-white hover:bg-white hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                  <div className="flex items-center gap-4">
                    <span className={`${item.color} text-xl group-hover:rotate-12 transition-transform`}>{item.icon}</span>
                    <span className="text-xs font-black text-slate-700 uppercase tracking-tight">{item.label}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="lg:col-span-4">
            <button 
              onClick={() => setIsChatOpen(true)}
              className="w-full h-full p-8 rounded-[3.5rem] bg-linear-to-br from-red-500 to-orange-600 text-white shadow-xl hover:shadow-red-500/20 hover:scale-[1.02] transition-all group relative overflow-hidden"
            >
               <div className="relative z-10 flex flex-col items-center justify-center gap-2">
                  <HiOutlineChatAlt2 className="text-4xl group-hover:rotate-12 transition-transform" />
                  <span className="font-black uppercase tracking-[0.2em] text-xs">Chat With MikeAi</span>
               </div>
               {/* Animated background element */}
               <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -mr-10 -mt-10" />
            </button>
          </div>
        </div>

          

             <div className="flex-1 overflow-hidden relative">
                <Chat isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
                </div>
             </div>
          </div>

  );
};

export default Dashboard;