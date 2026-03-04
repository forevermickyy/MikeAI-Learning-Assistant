import React, { useContext, useState } from 'react';
import { UserContext, API } from '../context/userContext';
import { 
  HiOutlineMail, HiOutlineIdentification, HiOutlineChip, 
  HiOutlineLocationMarker, HiOutlineSparkles, HiOutlinePencilAlt, 
  HiOutlineCheck, HiOutlineX 
} from 'react-icons/hi';
import { toast } from 'react-hot-toast';

const Account = () => {
  const { user, setUser } = useContext(UserContext);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({});

  // Helper to format date for display
  const formatDate = (dateString) => {
    if (!dateString) return 'Not set';
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: 'numeric', month: 'long', year: 'numeric'
    });
  };

  const startEditing = () => {
    setEditData({
      ...user.profile,
      location: { ...user.profile?.location },
      metadata: { ...user.profile?.metadata }
    });
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      const { data } = await API.post('/update-profile', editData);
      if (data.error) return toast.error(data.error);
      
      setUser(data);
      setIsEditing(false);
      toast.success("Intelligence profile updated!");
    } catch  {
      toast.error("Failed to sync changes");
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 pt-32 pb-20">
      {/* Header with Toggle Controls */}
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-4xl font-black tracking-tighter text-slate-800">Account</h1>
          <p className="text-slate-500 font-medium">Manage your identity and preferences</p>
        </div>
        <div className="flex gap-3">
          {isEditing && (
            <button 
              onClick={() => setIsEditing(false)}
              className="p-3 rounded-2xl bg-slate-100 text-slate-500 hover:bg-slate-200 transition-all"
            >
              <HiOutlineX className="text-xl" />
            </button>
          )}
          <button 
            onClick={isEditing ? handleSave : startEditing}
            className={`flex items-center gap-2 px-8 py-3 rounded-2xl font-black uppercase text-[11px] tracking-widest transition-all shadow-xl ${
              isEditing 
              ? 'bg-green-500 text-white hover:bg-green-600 shadow-green-100' 
              : 'bg-white text-slate-800 hover:bg-slate-50 border border-slate-200'
            }`}
          >
            {isEditing ? <><HiOutlineCheck className="text-lg"/> Save Profile</> : <><HiOutlinePencilAlt className="text-lg"/> Edit Identity</>}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT COLUMN: Profile Summary */}
        <div className="lg:col-span-4 space-y-6">
          <div className="liquid-glass rounded-[3.5rem] p-10 text-center border-white/60 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-linear-to-r from-red-600 to-orange-500" />
            
            <div className="w-40 h-40 bg-slate-100 rounded-full mx-auto mb-6 border-4 border-white shadow-2xl overflow-hidden group">
              <img 
                src={user?.profile?.photo || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.name}`} 
                alt="Profile" 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>
            
            <h2 className="text-3xl font-black tracking-tighter text-slate-800">{user?.name}</h2>
            
            {isEditing ? (
              <select 
                value={editData.role}
                onChange={(e) => setEditData({...editData, role: e.target.value})}
                className="mt-4 w-full bg-white/50 border border-slate-200 rounded-xl px-4 py-2 font-bold text-xs outline-none text-center"
              >
                <option value="Student">STUDENT</option>
                <option value="Teacher">TEACHER</option>
                <option value="Professional">PROFESSIONAL</option>
              </select>
            ) : (
              <p className="text-red-600 font-black uppercase text-[10px] tracking-[0.3em] mt-2 mb-6">
                {user?.profile?.role || 'Member'}
              </p>
            )}

            <div className="pt-6 border-t border-slate-100 space-y-4">
              <div className="flex items-center gap-3 text-slate-500 bg-white/40 p-3 rounded-2xl">
                <HiOutlineMail className="text-xl text-red-500" />
                <span className="text-sm font-bold truncate">{user?.email}</span>
              </div>
              <div className="flex items-center gap-3 text-slate-500 bg-white/40 p-3 rounded-2xl">
                <HiOutlineIdentification className="text-xl text-orange-500" />
                {isEditing ? (
                  <input 
                    className="bg-transparent border-b border-orange-200 outline-none w-full text-xs font-black"
                    value={editData.idNumber}
                    onChange={(e) => setEditData({...editData, idNumber: e.target.value})}
                  />
                ) : (
                  <span className="text-xs font-black uppercase tracking-widest">{user?.profile?.idNumber || 'No ID Linked'}</span>
                )}
              </div>
            </div>
          </div>

          <div className="liquid-glass rounded-[2.5rem] p-8 border-white/60 bg-white/20">
            <h3 className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-3">Personal Bio</h3>
            {isEditing ? (
              <textarea 
                className="w-full bg-white/60 border border-white/80 rounded-2xl p-4 text-sm font-bold outline-none min-h-30"
                value={editData.bio}
                onChange={(e) => setEditData({...editData, bio: e.target.value})}
              />
            ) : (
              <p className="text-sm font-bold text-slate-600 leading-relaxed italic">
                "{user?.profile?.bio || 'No bio provided.'}"
              </p>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: Vital Details */}
        <div className="lg:col-span-8 space-y-6">
          <div className="liquid-glass rounded-[3.5rem] p-10 border-white/60 shadow-lg">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 bg-red-100 rounded-2xl"><HiOutlineLocationMarker className="text-red-600 text-xl"/></div>
              <h3 className="text-xl font-black tracking-tight text-slate-800">Vital Information</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-12">
              <InfoItem 
                label="Institution / Workplace" 
                value={user?.profile?.institution} 
                isEditing={isEditing}
                onChange={(val) => setEditData({...editData, institution: val})}
              />
              <InfoItem 
                label="Focus / Course" 
                value={user?.profile?.specialization} 
                isEditing={isEditing}
                onChange={(val) => setEditData({...editData, specialization: val})}
              />
              <InfoItem 
                label="Country" 
                value={user?.profile?.location?.country} 
                isEditing={isEditing}
                onChange={(val) => setEditData({...editData, location: {...editData.location, country: val}})}
              />
              <InfoItem 
                label="Region / State" 
                value={user?.profile?.location?.region} 
                isEditing={isEditing}
                onChange={(val) => setEditData({...editData, location: {...editData.location, region: val}})}
              />
              <InfoItem 
                label="Date of Birth" 
                value={isEditing ? editData.metadata?.dob : formatDate(user?.profile?.metadata?.dob)} 
                isEditing={isEditing}
                type="date"
                onChange={(val) => setEditData({...editData, metadata: {...editData.metadata, dob: val}})}
              />
              <InfoItem label="Member Type" value={user?.gift ? "Premium (Gift Applied)" : "Standard"} highlight />
            </div>
          </div>

          {/* AI Preferences */}
          <div className="liquid-glass rounded-[3.5rem] p-10 border-white/60 shadow-lg">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 bg-orange-100 rounded-2xl"><HiOutlineChip className="text-orange-600 text-xl"/></div>
              <h3 className="text-xl font-black tracking-tight text-slate-800">Intelligence Preferences</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <AiCard 
                label="Favorite AI" 
                value={user?.profile?.metadata?.favAi} 
                isEditing={isEditing}
                onChange={(val) => setEditData({...editData, metadata: {...editData.metadata, favAi: val}})}
                color="text-purple-600" 
              />
             <AiCard 
                label="Tone Preference" 
                value={isEditing ? editData.tonePreference : user?.profile?.tonePreference} 
                isEditing={isEditing}
                type="select"
                options={["Professional", "Casual", "Academic"]}
                onChange={(val) => setEditData({...editData, tonePreference: val})}
                color="text-blue-600" 
             />
              <AiCard 
                label="Smartness Level" 
                value={isEditing ? editData.metadata?.smartnessRating : user?.profile?.metadata?.smartnessRating} 
                isEditing={isEditing}
                type="range"
                onChange={(val) => setEditData({...editData, metadata: {...editData.metadata, smartnessRating: val}})}
                color="text-red-600" 
              />
              
              <div className="md:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                <div className="bg-white/40 p-6 rounded-3xl border border-white/80">
                  <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">Primary Goal</p>
                  {isEditing ? (
                    <input 
                      className="w-full bg-transparent border-b border-slate-300 outline-none font-bold"
                      value={editData.metadata?.intent}
                      onChange={(e) => setEditData({...editData, metadata: {...editData.metadata, intent: e.target.value}})}
                    />
                  ) : (
                    <p className="font-bold text-slate-700">{user?.profile?.metadata?.intent || 'Innovation'}</p>
                  )}
                </div>
                <div className="bg-white/40 p-6 rounded-3xl border border-white/80">
                  <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">Expectations</p>
                  {isEditing ? (
                    <input 
                      className="w-full bg-transparent border-b border-slate-300 outline-none font-bold"
                      value={editData.metadata?.expectations}
                      onChange={(e) => setEditData({...editData, metadata: {...editData.metadata, expectations: e.target.value}})}
                    />
                  ) : (
                    <p className="font-bold text-slate-700">{user?.profile?.metadata?.expectations || 'Not defined'}</p>
                  )}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

// --- Sub-components ---

const InfoItem = ({ label, value, highlight, isEditing, onChange, type = "text" }) => (
  <div>
    <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">{label}</p>
    {isEditing && onChange ? (
      <input 
        type={type}
        className="w-full bg-white/60 border border-slate-200 rounded-xl px-4 py-2 font-bold text-slate-800 outline-none focus:border-red-400 transition-colors"
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
      />
    ) : (
      <p className={`text-lg font-bold ${highlight ? 'text-red-600' : 'text-slate-800'}`}>
        {value || 'Not provided'}
      </p>
    )}
  </div>
);

const AiCard = ({ label, value, color, isEditing, onChange, type = "text", options = [] }) => (
  <div className="bg-white/60 p-6 rounded-4xl border border-white/80 shadow-sm">
    <div className="flex justify-between items-start mb-1">
      <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">{label}</p>
      <HiOutlineSparkles className={color} />
    </div>
    
    {isEditing ? (
      type === "range" ? (
        <div className="space-y-2">
          <input 
            type="range" min="1" max="10" 
            className="w-full accent-red-600 cursor-pointer"
            value={value || 5}
            onChange={(e) => onChange(e.target.value)}
          />
          <p className="text-right text-[10px] font-black text-slate-400">{value}/10</p>
        </div>
      ) : type === "select" ? (
        <select 
          className="w-full bg-transparent border-b border-slate-200 outline-none font-black text-sm py-1"
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
        >
          {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
        </select>
      ) : (
        <input 
          className="w-full bg-transparent border-b border-slate-200 outline-none font-black text-sm py-1 focus:border-blue-400 transition-colors"
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
        />
      )
    ) : (
      <p className={`text-xl font-black ${color}`}>
        {value ? (
          <>
            {value}
            {type === "range" && "/10"}
          </>
        ) : (
          'N/A'
        )}
      </p>
    )}
  </div>
);

export default Account;