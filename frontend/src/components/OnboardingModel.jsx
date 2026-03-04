import React, { useState, useContext } from 'react';
import { UserContext, API } from '../context/userContext';
import { toast } from 'react-hot-toast';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';

const OnboardingModal = ({ isOpen, onClose }) => {
  const { user, setUser } = useContext(UserContext);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    role: '', country: 'Ghana', region: '', dob: '', 
    specialization: '', institution: '', idNumber: '',
    intent: '', expectations: '', favAi: 'Gemini', smartnessRating: 5,
    bio: '', discoverySource: '', tonePreference: 'Professional',
    usageHabits: '1-3hrs', primaryDevice: 'Desktop'
  });

  const variants = {
  enter: (direction) => ({
    x: direction > 0 ? 50 : -50,
    opacity: 0,
    scale: 0.95,
    filter: "blur(10px)",
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
  },
  exit: (direction) => ({
    x: direction > 0 ? -50 : 50,
    opacity: 0,
    scale: 0.95,
    filter: "blur(10px)",
  }),
};

const [direction, setDirection] = useState(0);

  if (!isOpen) return null;

  const nextStep = () => {
  setDirection(1); 
  setStep(s => s + 1);
};

const prevStep = () => {
  setDirection(-1);
  setStep(s => s - 1);
};

  const handleFinish = async () => {
    try {
        const structuredData = {
      role: formData.role,
      specialization: formData.specialization,
      institution: formData.institution,
      idNumber: formData.idNumber,
      tonePreference: formData.tonePreference,
      bio: formData.bio,
      location: {
        country: formData.country,
        region: formData.region
      },
      metadata: {
        dob: formData.dob,
        favAi: formData.favAi,
        smartnessRating: formData.smartnessRating,
        intent: formData.intent,
        expectations: formData.expectations,
        discoverySource: formData.discoverySource
      }
    };
      const { data } = await API.post('/update-profile', structuredData);
      if (data.error) 
        return toast.error(data.error);
      setUser(data);
      onClose();
      toast.success("Profile fully customized!");
    } catch {
      toast.error("Critical error saving profile");
    }
  };

  const ghanaRegions = ["Ahafo","Ashanti","Bono","Bono East","Central","Eastern","Greater Accra","North East","Northern","Oti","Savannah","Upper East","Upper West","Volta","Western","Western North"];
  const usaStates = ["Alabama","Alaska","Arizona","Arkansas","California","Colorado","Connecticut","Delaware","Florida","Georgia","Hawaii","Idaho","Illinois","Indiana","Iowa","Kansas","Kentucky","Louisiana","Maine","Maryland","Massachusetts","Michigan","Minnesota","Mississippi","Missouri","Montana","Nebraska","Nevada","New Hampshire","New Jersey","New Mexico","New York","North Carolina","North Dakota","Ohio","Oklahoma","Oregon","Pennsylvania","Rhode Island","South Carolina","South Dakota","Tennessee","Texas","Utah","Vermont","Virginia","Washington","West Virginia","Wisconsin","Wyoming"];
  const ukStates= ["England","Scotland","Wales","Northern Ireland"]
  const nigeriaStates = ["Abia","Adamawa","Akwa Ibom","Anambra","Bauchi","Bayelsa","Benue","Borno","Cross River","Delta","Ebonyi","Edo","Ekiti","Enugu","FCT - Abuja","Gombe","Imo","Jigawa","Kaduna","Kano","Katsina","Kebbi","Kogi","Kwara","Lagos","Nasarawa","Niger","Ogun","Ondo","Osun","Oyo","Plateau","Rivers","Sokoto","Taraba","Yobe","Zamfara"]
  const canadaStates = ["Alberta","British Columbia","Manitoba","New Brunswick","Newfoundland and Labrador","Nova Scotia","Ontario","Prince Edward Island","Quebec","Saskatchewan","Northwest Territories","Nunavut","Yukon"]
  const australiaStates = ["New South Wales","Queensland","South Australia","Tasmania","Victoria","Western Australia","Australian Capital Territory","Northern Territory"]
  const indiaStates = ["Andhra Pradesh","Arunachal Pradesh","Assam","Bihar","Chhattisgarh","Goa","Gujarat","Haryana","Himachal Pradesh","Jharkhand","Karnataka","Kerala","Madhya Pradesh","Maharashtra","Manipur","Meghalaya","Mizoram","Nagaland","Odisha","Punjab","Rajasthan","Sikkim","Tamil Nadu","Telangana","Tripura","Uttar Pradesh","Uttarakhand","West Bengal","Delhi","Jammu and Kashmir","Ladakh","Puducherry"]
  const southAfricaStates = ["Eastern Cape","Free State","Gauteng","KwaZulu-Natal","Limpopo","Mpumalanga","North West","Northern Cape","Western Cape"]
  const germanyStates = ["Baden-Württemberg","Bavaria","Berlin","Brandenburg","Bremen","Hamburg","Hesse","Lower Saxony","Mecklenburg-Vorpommern","North Rhine-Westphalia","Rhineland-Palatinate","Saarland","Saxony","Saxony-Anhalt","Schleswig-Holstein","Thuringia"]
  const franceStates = ["Auvergne-Rhône-Alpes","Bourgogne-Franche-Comté","Brittany","Centre-Val de Loire","Corsica","Grand Est","Hauts-de-France","Île-de-France","Normandy","Nouvelle-Aquitaine","Occitanie","Pays de la Loire","Provence-Alpes-Côte d'Azur"]
  const brazilStates = ["Acre","Alagoas","Amapá","Amazonas","Bahia","Ceará","Distrito Federal","Espírito Santo","Goiás","Maranhão","Mato Grosso","Mato Grosso do Sul","Minas Gerais","Pará","Paraíba","Paraná","Pernambuco","Piauí","Rio de Janeiro","Rio Grande do Norte","Rio Grande do Sul","Rondônia","Roraima","Santa Catarina","São Paulo","Sergipe","Tocantins"]
  const mexicoStates = ["Aguascalientes","Baja California","Baja California Sur","Campeche","Chiapas","Chihuahua","Coahuila","Colima","Durango","Guanajuato","Guerrero","Hidalgo","Jalisco","México State","Michoacán","Morelos","Nayarit","Nuevo León","Oaxaca","Puebla","Querétaro","Quintana Roo","San Luis Potosí","Sinaloa","Sonora","Tabasco","Tamaulipas","Tlaxcala","Veracruz","Yucatán","Zacatecas","Mexico City"]

  const statesByCountry = {
  Ghana: ghanaRegions,
  "United States": usaStates,
  "United Kingdom": ukStates,
  Nigeria: nigeriaStates,
  Canada: canadaStates,
  Australia: australiaStates,
  India: indiaStates,
  "South Africa": southAfricaStates,
  Germany: germanyStates,
  France: franceStates,
  Brazil: brazilStates,
  Mexico: mexicoStates
};



  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md">
      <div className="w-full max-w-2xl liquid-glass rounded-[3rem] p-10 relative overflow-hidden animate-in zoom-in-95 duration-300">
        
        {/* Progress Bar */}
        <div className="flex gap-2 mb-8">
          {[1, 2, 3, 4, 5].map(i => (
            <div key={i} className={`h-1.5 flex-1 rounded-full transition-all ${step >= i ? 'bg-red-600' : 'bg-slate-200'}`} />
          ))}
        </div>

        <div className="relative min-h-80"> {/* Set a min-height to prevent jumping */}
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={step} 
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 }
            }}
          >
            {/* Step 1: Role & Core Identity */}
        {step === 1 && (
          <div className="space-y-6">
            <h2 className="text-3xl font-black tracking-tighter">Who are you, <span className="text-red-600 capitalize"> {user?.name || 'User'}? </span></h2>
            <div className="grid grid-cols-3 gap-4">
              {['student', 'teacher', 'other'].map(r => (
                <button 
                  key={r}
                  onClick={() => setFormData({...formData, role: r})}
                  className={`p-6 rounded-3xl border-2 transition-all capitalize font-black ${formData.role === r ? 'border-red-600 bg-red-50 text-red-600' : 'border-white bg-white/40 text-slate-400'}`}
                >
                  {r}
                </button>
              ))}
            </div>
            <input type="text" placeholder={`Where do you ${formData.role === 'student' ? 'study' : 'work/teach'}?`}
              className="w-full bg-white/40 border border-white/80 rounded-2xl px-6 py-4 font-bold"
              onChange={(e) => setFormData({...formData, institution: e.target.value})} />
            <input type="text" placeholder="ID Number (Student/Staff/Work ID)"
              className="w-full bg-white/40 border border-white/80 rounded-2xl px-6 py-4 font-bold"
              onChange={(e) => setFormData({...formData, idNumber: e.target.value})} />
          </div>
        )}

        {/* Step 2: Location & Age */}
        {step === 2 && (
          <div className="space-y-7 animate-in fade-in slide-in-from-bottom-4">
            <h2 className="text-4xl font-black tracking-tighter text-slate-900">Your <span className="text-orange-500">Roots</span></h2>
            <div className="grid grid-cols-2 gap-4">
             
                <div>
  <label className="text-[10px] font-black uppercase text-slate-400 ml-4">State/Region/Province</label>
  <select 
    className="w-full bg-white/40 border border-white/80 rounded-2xl px-5 py-4 font-bold outline-none"
    value={formData.region}
    onChange={(e) => setFormData({...formData, region: e.target.value})} // Add this
  >
    <option value="">Select</option>
    {statesByCountry[formData.country]?.map((state) => (
      <option key={state} value={state}>{state}</option>
    ))}
  </select>
</div>
            

              <div className="col-span-2 space-y-1">
                <label className="text-[10px] font-black uppercase text-slate-400 ml-4">Date of Birth</label>
                <input type="date" className="w-full bg-white/40 border border-white/80 rounded-2xl px-5 py-4 font-bold"
                  onChange={(e) => setFormData({...formData, dob: e.target.value})} />
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: Professional/Academic Depth */}
        {step === 3 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
            <h2 className="text-4xl font-black tracking-tighter">Your <span className="text-red-600">Focus</span></h2>
            <input type="text" placeholder={formData.role === 'teacher' ? "Subjects you teach" : "Course of study"}
              className="w-full bg-white/40 border border-white/80 rounded-2xl px-6 py-4 font-bold"
              onChange={(e) => setFormData({...formData, specialization: e.target.value})} />
            <textarea placeholder="Tell us a bit about your work or studies..."
              className="w-full bg-white/40 border border-white/80 rounded-3xl px-6 py-4 font-bold h-32 outline-none"
              onChange={(e) => setFormData({...formData, bio: e.target.value})} />
          </div>
        )}

        {/* STEP 4: AI Habits (DROPDOWNS) */}
        {step === 4 && (
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4">
            <h2 className="text-4xl font-black tracking-tighter">AI <span className="text-orange-500">Synergy</span></h2>
            <div className="grid grid-cols-2 gap-4">
              <select className="bg-white/40 border border-white/80 rounded-2xl px-4 py-4 font-bold text-sm outline-none"
                onChange={(e) => setFormData({...formData, favAi: e.target.value})}>
                <option>Gemini</option><option>ChatGPT</option><option>DeepSeek</option><option>Claude</option>
              </select>
              <select className="bg-white/40 border border-white/80 rounded-2xl px-4 py-4 font-bold text-sm outline-none"
                onChange={(e) => setFormData({...formData, tonePreference: e.target.value})}>
                <option value="Professional">Professional Tone</option><option value="Casual">Casual Tone</option><option value="Academic">Academic Tone</option>
              </select>
              <select className="bg-white/40 border border-white/80 rounded-2xl px-4 py-4 font-bold text-sm outline-none"
                onChange={(e) => setFormData({...formData, usageHabits: e.target.value})}>
                <option>1-3hrs daily</option><option>Power User (5hr+)</option><option>Occasional</option>
              </select>
              <select className="bg-white/40 border border-white/80 rounded-2xl px-4 py-4 font-bold text-sm outline-none"
                onChange={(e) => setFormData({...formData, primaryDevice: e.target.value})}>
                <option>Desktop</option><option>Mobile</option><option>Hybrid</option>
              </select>
            </div>
            <div className="pt-2">
              <p className="text-[10px] font-black uppercase text-slate-400 ml-2 mb-2">Expected Smartness: {formData.smartnessRating}/10</p>
              <input type="range" min="1" max="10" className="w-full accent-red-600" onChange={(e) => setFormData({...formData, smartnessRating: e.target.value})} />
            </div>
          </div>
        )}

        {/* STEP 5: Intent & Discovery */}
        {step === 5 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
            <h2 className="text-4xl font-black tracking-tighter">Final <span className="text-red-600">Touch</span></h2>
            <select className="w-full bg-white/40 border border-white/80 rounded-2xl px-6 py-4 font-bold outline-none"
              onChange={(e) => setFormData({...formData, discoverySource: e.target.value})}>
              <option value="">How did you find us?</option>
              <option>Social Media</option><option>A Friend</option><option>Online Search</option><option>MikeAI Ad</option>
            </select>
            <input type="text" placeholder="What is your main goal here?"
              className="w-full bg-white/40 border border-white/80 rounded-2xl px-6 py-4 font-bold"
              onChange={(e) => setFormData({...formData, intent: e.target.value})} />
            <input type="text" placeholder="Your Expectations in one word..."
              className="w-full bg-white/40 border border-white/80 rounded-2xl px-6 py-4 font-bold"
              onChange={(e) => setFormData({...formData, expectations: e.target.value})} />
          </div>
        )}
        </motion.div>
        </AnimatePresence>
        </div>

        {/* NAVIGATION */}
        <div className="mt-12 flex gap-4">
          {step > 1 && (
            <button onClick={prevStep} className="flex-1 py-5 bg-white/50 rounded-3xl font-black text-slate-400 uppercase text-[11px] tracking-widest hover:bg-white transition-all">Back</button>
          )}
          <button onClick={step === 5 ? handleFinish : nextStep} 
            className="flex-2 py-5 bg-linear-to-r from-red-600 to-orange-500 text-white rounded-3xl font-black uppercase text-[11px] tracking-widest shadow-xl shadow-red-200 hover:brightness-110 active:scale-95 transition-all">
            {step === 5 ? "Initialize Intelligence" : "Continue"}
          </button>
        </div>
        
        <button onClick={onClose} className="absolute top-4 right-10 text-[10px] font-black uppercase tracking-widest text-slate-300 hover:text-red-600 transition-colors">Skip for now</button>
      </div>
    </div>
  );
};

export default OnboardingModal;