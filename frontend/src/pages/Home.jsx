import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../context/userContext';
import { 
  HiArrowRight, HiOutlineLightningBolt, HiOutlineShieldCheck, 
  HiOutlineSparkles, HiPlus, HiMinus 
} from 'react-icons/hi';
import { MicrophoneIcon, VideoIcon } from '../components/Microphone';

const Home = () => {
  const { user } = useContext(UserContext);
  const [openFaq, setOpenFaq] = useState(null);

  const faqs = [
    {
    q: "What is MikeAI?",
    a: "MikeAI is designed for students, educators, professionals and researchers who want fast, reliable, and intelligent AI assistance in one place."
  },
  {
    q: "Is my data used for training?",
    a: "Absolutely not. We use enterprise-grade APIs where your data is private and never used to train global models."
  },
  {
    q: "Which models power MikeAI?",
    a: "We unify Gemini 1.5 Pro, GPT-4o, and Claude 3.5 Sonnet into a single seamless workflow."
  },
  {
    q: "Does MikeAI require an internet connection?",
    a: "Yes. An active internet connection is required to securely communicate with the AI models and process your requests."
  },
  {
    q: "Can I choose which AI model to use?",
    a: "MikeAI automatically selects the best model for each task, but advanced users may have options to manually choose or prioritize specific models."
  },
  {
    q: "Is MikeAI free to use?",
    a: "MikeAI offers free access with usage limits, along with premium plans for higher limits, advanced features, and priority performance."
  },
  {
    q: "How accurate are the responses?",
    a: "MikeAI delivers highly accurate results, but outputs should be reviewed for critical decisions, especially in legal, medical, or financial contexts."
  }
];

const revs = [
  {
    name: "Nana Wiredu", // Added name to match your UI structure
    image: `https://i.pravatar.cc/150?u=${1}`,
    position: "Student, CU",
    comment: "I love this mike Ai, it helps me with my studies, It is easier to learn with this platform",
  },
  {
    name: "Dr. Kofi Appiah",
    image: `https://i.pravatar.cc/150?u=${2}`,
    position: "Professor, CU",
    comment: "Preparing slides and texts are much easier, I'd recommend this to every teacher and all students.",
  },
  {
    name: "Josephine Mensah",
    image: `https://i.pravatar.cc/150?u=${3}`,
    position: "Student, CU",
    comment: "I've used so many platforms but this makes is so good it feels like an extension of my brain.",
  }
];


  return (
    <div className="bg-[#F2F2F7] text-slate-900 font-sans selection:bg-red-200">
      
      {/* 1. HERO SECTION */}
     <section className="relative pt-32 pb-20 px-6 lg:px-10 overflow-hidden">
  {/* Animated Mesh Gradients */}
  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full z-0 pointer-events-none">
    <div className="absolute top-[-10%] left-[10%] w-125 h-125 bg-red-400/20 rounded-full blur-[120px] animate-pulse" />
    <div className="absolute top-[10%] right-[10%] w-100 h-100 bg-orange-300/20 rounded-full blur-[100px]" />
  </div>

  {/* Main Hero Container */}
  <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12 relative z-10">
    
    {/* Left Side: Text Content */}
    <div className="w-full md:w-1/2 text-center md:text-left">
      <div className="inline-flex items-center gap-2 liquid-glass border-white/80 px-4 py-2 rounded-full text-[10px] font-black tracking-widest text-red-600 mb-6 uppercase">
        <HiOutlineSparkles className="text-sm" /> The Future of Learning is AI
      </div>
      
      <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-[-0.06em] leading-[0.9] mb-8">
        Work at the speed <br />
        <span className="bg-clip-text text-transparent bg-linear-to-b from-red-600 to-orange-500">of thought.</span>
      </h1>
      
      <p className="max-w-xl mx-auto md:mx-0 text-slate-500 text-lg md:text-xl mb-10 font-medium leading-relaxed">
        MikeAI is your high-performance workspace. Make quizzes from your documents, 
        automate research, thoughts to promts and create with world-class intelligence.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start items-center">
        <Link 
          to={user ? "/dashboard" : "/register"} 
          className="w-full sm:w-auto flex items-center justify-center gap-3 bg-slate-900 text-white font-black py-5 px-10 rounded-3xl text-lg shadow-2xl active:scale-95 transition-all group"
        >
          {user ? "Enter Dashboard" : "Get Started Free"} 
          <HiArrowRight className="group-hover:translate-x-2 transition-transform" />
        </Link>
      </div>
    </div>

    {/* Right Side: Image/Dashboard Preview */}
    <div className="w-full md:w-1/2 relative">
      <div className="liquid-glass rounded-[2.5rem] shadow-2xl overflow-hidden">
        <img 
          src="https://media.istockphoto.com/id/2122148349/photo/writing-an-exam-at-the-university.jpg?s=612x612&w=0&k=20&c=LgVzLcd_cxNDQrolZFFqg7AIQnTd_xBrvdWfr-eVoK8=" 
          alt="Dashboard Preview" 
          className="rounded-[2.2rem] w-full h-100 md:h-150 object-cover shadow-inner"
        />
      </div>
    </div>

  </div>
</section>

      {/* 2. BENTO FEATURE GRID */}
<section className="py-24 px-6 max-w-7xl mx-auto">
  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
    {/* Main Bento Card */}
    <div className="md:col-span-2 bg-linear-to-br from-white to-slate-50 rounded-[3rem] relative overflow-hidden group min-h-125 flex flex-col lg:flex-row border border-slate-100 shadow-xl">
      
      {/* 1. Text Content Area */}
      <div className="p-8 md:p-12 relative z-10 flex-1 flex flex-col justify-center">
        <div className="w-14 h-14 bg-red-600 rounded-2xl flex items-center justify-center text-white text-2xl mb-6 shadow-lg shadow-red-200">
          <HiOutlineLightningBolt />
        </div>
        <h3 className="text-3xl md:text-4xl font-black tracking-tighter mb-4 text-slate-900">
         Document Chat
        </h3>
        <p className="text-slate-500 font-medium text-lg max-w-sm">
          Drop any PDF, Spreadsheet, or Deck. Generate quizzies, summaries, get indept information, precise answers to your questions all in one place designed for your convinience.
        </p>
      </div>

      <div className="w-full md:w-1/2 overflow-hidden">
        <img 
          src="./doc.png" 
          className="w-full h-80 lg:h-full group-hover:scale-105 transition-transform duration-700" 
          alt="Docs Interface"
        />
      </div>
      
    </div>

          {/* Security Bento Card */}
          <div className="bg-slate-900 rounded-[3rem] p-12 text-white flex flex-col justify-between overflow-hidden relative group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/20 blur-[60px] rounded-full" />
            <HiOutlineShieldCheck className="text-6xl text-red-500 mb-8" />
            <div>
              <h3 className="text-3xl font-black tracking-tighter mb-4">Privacy by Design</h3>
              <p className="text-slate-400 font-medium">Your intelligence is yours alone. Enterprise-grade encryption on every interaction.</p>
            </div>
          </div>

          {/* Smaller Cards */}
          <div className="liquid-glass rounded-[3rem]  flex flex-col items-center text-center">
          <div className="w-full rounded-t-[3rem] mb-6 bg-linear-to-tr from-red-700 via-red-600 to-orange-500 flex items-center justify-center p-6">
          <VideoIcon className="w-48 h-48" />
        </div>
            <h4 className="text-2xl font-black tracking-tighter mb-2">Video Synthesis</h4>
            <p className="text-slate-500 text-sm mb-6 font-bold">Instantly summarize videos form youtube or lectures into structured notes.</p>
          </div>


          <div className="md:col-span-2 liquid-glass rounded-[3rem] flex flex-col md:flex-row items-stretch overflow-hidden group">
  {/* Text Content */}
  <div className="p-10 flex-1 flex flex-col justify-center">
    <h4 className="text-3xl font-black tracking-tighter mb-4">Audio Intelligence</h4>
    <p className="text-slate-500 font-bold">
      Turn meetings and voice notes into perfect transcripts and action items with one click.
    </p>
  </div>

  {/* Image - now flush to the right and bottom */}
  <div className="w-full md:w-1/2 bg-linear-to-br from-slate-800 to-slate-900 flex items-center justify-center p-8">
         <MicrophoneIcon className="w-full h-full max-h-64 object-contain" />
      </div>
</div>
        </div>
      </section>

      {/* 3. REVIEWS SECTION */}
      <section className="py-24 bg-white/30 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-black tracking-tighter text-center mb-16">Loved by the next generation.</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {revs.map((rev, index) => (
              <div key={index} className="liquid-glass p-8 rounded-[2.5rem] border-white/80">
                <div className="flex items-center gap-4 mb-6">
                  <img src={rev.image} className="w-12 h-12 rounded-full border-2 border-white shadow-md" alt={rev.name} />
                  <div>
                    <p className="font-black text-sm">{rev.name}</p>
                    <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">{rev.position}</p>
                  </div>
                </div>
                <p className="text-slate-600 font-medium italic">{rev.comment}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. PRICING SECTION */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto text-center mb-16">
          <h2 className="text-5xl font-black tracking-tighter mb-4">Pricing starts from.</h2>
          <p className="text-slate-500 font-bold">Choose the power that fits your workflow.</p>
        </div>
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="liquid-glass p-12 rounded-[3rem] border-white/60">
            <h4 className="text-xl font-black mb-2">Free</h4>
            <div className="text-5xl font-black tracking-tighter mb-6">₵0 <span className="text-lg text-slate-400">/mo</span></div>
            <ul className="text-left space-y-4 mb-10 text-slate-500 font-bold text-sm">
              <li className="flex items-center gap-2"><HiOutlineSparkles className="text-red-500" /> Basic AI Models</li>
              <li className="flex items-center gap-2"><HiOutlineSparkles className="text-red-500" /> 15 Document Uploads</li>
            </ul>
            <Link to="/register" className="block text-center w-full py-4 bg-white border border-slate-200 rounded-2xl font-black text-sm hover:bg-slate-50 transition-all">Current Plan</Link>
          </div>
          <div className="bg-slate-900 p-12 rounded-[3rem] text-white shadow-2xl shadow-red-100 relative overflow-hidden group">
            <div className="absolute top-0 right-0 px-6 py-2 bg-red-600 font-black text-[10px] uppercase tracking-widest rounded-bl-2xl">Most Popular</div>
            <h4 className="text-xl font-black mb-2">Pro</h4>
            <div className="text-5xl font-black tracking-tighter mb-6">₵19 <span className="text-lg text-slate-500">/mo</span><span className='text-lg ml-2'>₵ 200</span><span className="text-lg ml-1 text-slate-500">/yr</span></div>
            <ul className="text-left space-y-4 mb-10 text-slate-400 font-bold text-sm">
              <li className="flex items-center gap-2"><HiOutlineSparkles className="text-red-500" /> GPT-4o & Claude 3.5</li>
              <li className="flex items-center gap-2"><HiOutlineSparkles className="text-red-500" /> Unlimited Docs & Audio</li>
            </ul>
            <button className="w-full py-4 bg-red-600 hover:bg-red-700 text-white rounded-2xl font-black text-sm transition-all shadow-xl shadow-red-900/20">Upgrade to Pro</button>
          </div>
          <div className="bg-slate-500 p-12 rounded-[3rem] text-white shadow-2xl shadow-red-100 relative overflow-hidden group">
            <div className="absolute top-0 right-0 px-6 py-2 bg-slate-700 font-black text-[10px] uppercase tracking-widest rounded-bl-2xl">Not Available</div>
            <h4 className="text-xl font-black mb-2">Pro</h4>
            <div className="text-5xl font-black tracking-tighter mb-6">₵25 <span className="text-lg text-slate-900">/mo</span><span className='text-lg ml-2'>₵ 260</span><span className="text-lg ml-1 text-slate-900">/yr</span></div>
            <ul className="text-left space-y-2 mb-10 text-slate-400 font-bold text-sm">
              <li className="flex items-center gap-2"><HiOutlineSparkles className="text-slate-900" />Gemini + GPT-4o & Claude 3.5</li>
              <li className="flex items-center gap-2"><HiOutlineSparkles className="text-slate-900" /> Unlimited Docs, Audio, Videos</li>
              <li className="flex items-center gap-2"><HiOutlineSparkles className="text-slate-900" /> More tools</li>
            </ul>
            <button className="w-full py-4 bg-slate-800 hover:bg-slate-700 text-white rounded-2xl font-black text-sm transition-all shadow-xl shadow-stone-900/20">Upgrade to Max</button>
          </div>
        </div>
      </section>

      {/* 5. FAQ SECTION */}
      <section className="py-24 px-6 max-w-3xl mx-auto">
        <h2 className="text-4xl font-black tracking-tighter text-center mb-16">Questions?</h2>
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="liquid-glass rounded-3xl overflow-hidden border-white/50">
              <button 
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full p-6 flex items-center justify-between text-left transition-colors cursor-pointer"
              >
                <span className="font-black text-slate-800">{faq.q}</span>
                {openFaq === idx ? <HiMinus className="text-red-600" /> : <HiPlus className="text-slate-400" />}
              </button>
              {openFaq === idx && (
                <div className="px-6 pb-6 text-slate-500 font-medium text-sm animate-in slide-in-from-top-2 duration-300">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto bg-linear-to-br from-red-600 to-orange-500 rounded-[4rem] p-16 text-center text-white shadow-2xl shadow-red-200 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 blur-[100px] rounded-full translate-x-1/2 -translate-y-1/2" />
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-10 relative z-10">Start your intelligent <br />workflow today.</h2>
          <Link to="/register" className="relative z-10 bg-white text-red-600 font-black py-6 px-16 rounded-4xl text-xl hover:scale-105 active:scale-95 transition-all inline-block shadow-2xl">
            Join MikeAI Plus
          </Link>
        </div>
      </section>

    </div>
  );
};

export default Home;