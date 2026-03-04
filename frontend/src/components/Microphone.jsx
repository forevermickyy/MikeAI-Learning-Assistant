
// The Microphone Component
export const MicrophoneIcon = ({ className }) => (
  <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="micBody" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#94a3b8" />
        <stop offset="50%" stopColor="#cbd5e1" />
        <stop offset="100%" stopColor="#94a3b8" />
      </linearGradient>
      <linearGradient id="accentGlow" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#6366f1" stopOpacity="0.2" />
        <stop offset="100%" stopColor="#ec4899" stopOpacity="0.2" />
      </linearGradient>
    </defs>
    <circle cx="100" cy="100" r="80" fill="url(#accentGlow)" />
    <ellipse cx="100" cy="170" rx="35" ry="10" fill="#64748b" />
    <rect x="95" y="145" width="10" height="25" fill="#94a3b8" />
    <path d="M65 100 C 65 140, 135 140, 135 100" stroke="#94a3b8" strokeWidth="8" fill="none" strokeLinecap="round" />
    <rect x="75" y="40" width="50" height="85" rx="25" fill="url(#micBody)" />
    <g stroke="#1e293b" strokeWidth="2" strokeLinecap="round">
      {[55, 65, 75, 85, 95, 105].map((y) => (
        <line key={y} x1="75" y1={y} x2="125" y2={y} />
      ))}
    </g>
    <rect x="75" y="80" width="50" height="6" fill="#f1f5f9" />
    <rect x="85" y="45" width="6" height="75" rx="3" fill="white" fillOpacity="0.3" />
  </svg>
);

// The Video Component
export const VideoIcon = ({ className }) => (
  <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="videoBody" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#cbd5e1" />
        <stop offset="100%" stopColor="#94a3b8" />
      </linearGradient>
    </defs>
    {/* Background Glow */}
    <circle cx="100" cy="100" r="80" fill="url(#accentGlow)" />
    
    {/* Camera Body */}
    <rect x="45" y="65" width="80" height="70" rx="12" fill="url(#videoBody)" />
    
    {/* Camera Lens (Triangle) */}
    <path d="M135 75 L165 55 V145 L135 125 V75Z" fill="#94a3b8" />
    
    {/* Lens Detail */}
    <circle cx="85" cy="100" r="15" stroke="#1e293b" strokeWidth="4" />
    <circle cx="85" cy="100" r="5" fill="#1e293b" />
    
    {/* Top Buttons/Dials */}
    <rect x="60" y="55" width="20" height="10" rx="2" fill="#64748b" />
    <rect x="90" y="55" width="10" height="10" rx="2" fill="#ef4444" />
    
    {/* Highlight */}
    <rect x="55" y="75" width="4" height="50" rx="2" fill="white" fillOpacity="0.3" />
  </svg>
);