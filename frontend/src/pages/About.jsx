import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { HiOutlineLightningBolt, HiOutlineShieldCheck, HiOutlineSparkles } from 'react-icons/hi';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

const About = () => {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash === '#about-plus') {
      const element = document.getElementById('about-plus');
      if (element) element.scrollIntoView({ behavior: 'smooth' });
    }
  }, [hash]);

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 space-y-24">
      
      {/* --- Standard About Section --- */}
      <section className="space-y-8">
        <div className="inline-block px-4 py-1.5 rounded-full bg-red-50 text-red-600 text-xs font-black uppercase tracking-widest">
          The Genesis
        </div>
        <h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter">
          Intelligence <br /> 
          <span className="text-transparent bg-clip-text bg-linear-to-r from-red-600 to-orange-500">
            Reimagined.
          </span>
        </h1>
        <p className="max-w-2xl text-lg text-slate-500 leading-relaxed font-medium">
          MikeAI was born from a simple vision: to bridge the gap between complex neural networks and 
          everyday productivity. We build tools that don't just process data, but understand intent.
        </p>
      </section>

      {/* --- About+ Section (The Premium Experience) --- */}
      <section id="about-plus" className="relative scroll-mt-24">
        {/* Background Glow */}
        <div className="absolute -inset-4 bg-linear-to-r from-red-500/10 to-orange-500/10 blur-3xl rounded-4xl -z-10" />
        
        <div className="liquid-glass border border-white/40 rounded-[3rem] p-8 md:p-16 overflow-hidden relative">
          <div className="relative z-10 space-y-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-orange-500 font-black tracking-tighter text-2xl">
                  <HiOutlineLightningBolt />
                  <span>MIKEAI <span className="text-red-600">+</span></span>
                </div>
                <h2 className="text-4xl font-black text-slate-900">Push the boundaries of AI.</h2>
              </div>
              <button className="px-8 py-4 bg-linear-to-r from-red-600 to-orange-500 text-white font-black rounded-2xl shadow-xl shadow-red-200 hover:scale-105 transition-all active:scale-95 text-xs uppercase tracking-widest">
                Explore Plus Features
              </button>
            </div>

            {/* Feature Grid */}
            <div className="grid md:grid-cols-3 gap-6">
              <FeatureCard 
                icon={<HiOutlineSparkles />}
                title="Neural Memory"
                desc="MikeAI+ remembers your preferences across sessions for a truly personalized link."
              />
              <FeatureCard 
                icon={<HiOutlineLightningBolt />}
                title="Priority Access"
                desc="Skip the queue with dedicated high-speed lanes for Gemini 1.5 Pro processing."
              />
              <FeatureCard 
                icon={<HiOutlineShieldCheck />}
                title="Vault Encryption"
                desc="Military-grade end-to-end encryption for all your uploaded documents."
              />
            </div>
          </div>

          {/* Decorative Circle */}
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-red-500/5 rounded-full blur-3xl" />
        </div>
      </section>

      {/* --- Mission Statement --- */}
      <section className="text-center py-20 border-t border-slate-100">
        <h3 className="text-slate-400 font-bold uppercase tracking-widest text-xs mb-4">Our Mission</h3>
        <p className="text-2xl font-medium text-slate-800 italic">
          "To empower every individual with a private, powerful, and empathetic neural companion."
        </p>
      </section>
    </div>
  );
};

// Sub-component for clean code
const FeatureCard = ({ icon, title, desc }) => (
  <div className="p-8 rounded-4xl bg-white/50 border border-white/80 hover:bg-white transition-colors group">
    <div className="w-12 h-12 rounded-2xl bg-red-50 flex items-center justify-center text-red-600 text-2xl mb-6 group-hover:scale-110 transition-transform">
      {icon}
    </div>
    <h4 className="font-black text-slate-900 mb-2">{title}</h4>
    <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
  </div>
);

export default About;