import React, { useState, useContext, useRef, useEffect } from 'react';
import { 
  HiOutlinePaperAirplane, 
  HiOutlineX, 
  HiOutlineSparkles, 
  HiOutlineTrash 
} from 'react-icons/hi';
import { UserContext } from '../context/userContext';
import { FaUserAstronaut, FaFileAlt, FaGem } from 'react-icons/fa';

/**
 * MikeAI Chat Component
 * Features: SSE Streaming, Identity Injection, Suggested Prompts, Auto-scroll
 */
const Chat = ({ isOpen, onClose }) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useContext(UserContext);
  const scrollRef = useRef(null);

  // Pre-defined neural suggestions for the empty state
  const suggestions = [
    { 
      label: "What do I get from AI", 
      icon: <FaUserAstronaut />, 
      prompt: "What are benefits of MikeAI?" 
    },
    { 
      label: "Document Lab help", 
      icon: <FaFileAlt />, 
      prompt: "How do I use the Document Lab to process PDFs?" 
    },
    { 
      label: "Upgrade features", 
      icon: <FaGem />, 
      prompt: "What are the benefits of MikeAI+?" 
    },
  ];

  // 1. Auto-scroll logic: Keep the latest message in view
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  // 2. Clear Chat: Wipe session with confirmation
  const clearChat = () => {
    if (window.confirm("Disconnect current session and wipe neural history?")) {
      setMessages([]);
    }
  };

  // 3. Handle Suggestions: Trigger a message via chip click
  const handleSuggest = (suggestedPrompt) => {
    handleSendMessage(suggestedPrompt);
  };

  // 4. Main Send Logic (Handles both manual input and suggested prompts)
  const handleSendMessage = async (overridePrompt) => {
    const textToSend = overridePrompt || input;
    if (!textToSend.trim() || loading) return;

    // Reset UI state
    const userMsg = { role: 'user', content: textToSend };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    // Prepare empty AI bubble for streaming
    setMessages(prev => [...prev, { role: 'ai', content: '' }]);

    try {
      const response = await fetch('http://localhost:8000/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },

        body: JSON.stringify({ 
          prompt: textToSend, 
          profile: user?.profile || {}
        }),
      });

      if (!response.body) throw new Error("MikeAi link failed.");

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      
      // SSE Stream Consumption
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        
        setMessages(prev => {
          const last = prev[prev.length - 1];
          const others = prev.slice(0, -1);
          return [...others, { ...last, content: last.content + chunk }];
        });
      }
    } catch (error) {
      console.error("Sync Error:", error);
      setMessages(prev => [
        ...prev.slice(0, -1), 
        { role: 'ai', content: "Sync interrupted. Please check your connection." }
      ]);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-6 right-6 w-[90vw] md:w-112.5 h-150 z-100 flex flex-col liquid-glass rounded-[3rem] border-white/60 shadow-[0_20px_50px_rgba(0,0,0,0.2)] bg-white/40 overflow-hidden animate-in fade-in zoom-in duration-300">
      
      {/* --- HEADER --- */}
      <div className="px-8 py-6 bg-linear-to-r from-slate-900 to-slate-800 text-white flex justify-between items-center relative overflow-hidden border-b border-white/10">
        {/* Visual feedback for neural processing */}
        {loading && <div className="absolute inset-0 bg-red-500/10 animate-pulse" />}
        
        <div className="flex items-center gap-3 relative z-10">
          <div className="p-2 bg-red-500/20 rounded-xl">
            <HiOutlineSparkles className={`text-red-400 ${loading ? 'animate-spin' : ''}`} />
          </div>
          <div>
            <h3 className="text-xs font-black uppercase tracking-widest">Mike AI</h3>
            <p className="text-[9px] text-slate-400 uppercase font-bold tracking-tighter">
              {loading ? 'MikeAi Processing...' : 'Encrypted Connection'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 relative z-10">
          <button 
            onClick={clearChat}
            title="Clear History"
            className="p-2 hover:bg-white/10 rounded-full transition-colors text-slate-400 hover:text-red-400"
          >
            <HiOutlineTrash className="text-sm" />
          </button>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-full transition-colors"
          >
            <HiOutlineX className="text-sm" />
          </button>
        </div>
      </div>

      {/* --- MESSAGES AREA --- */}
      <div 
        ref={scrollRef}
        className="flex-1 p-6 overflow-y-auto space-y-6 bg-white/20 scroll-smooth"
      >
        {messages.length === 0 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-700">
            {/* System Welcome Message */}
            <div className="flex flex-col gap-2 max-w-[85%]">
              <div className="p-4 rounded-3xl rounded-bl-none bg-white border border-white shadow-sm">
                <p className="text-sm text-slate-700 font-medium leading-relaxed">
                  MikeAI protocol active. Identity confirmed: <span className="text-red-600 capitalize font-black">{user?.name?.split(' ')[0] || 'User'}</span>. How can I assist your workflow?
                </p>
              </div>
              <span className="text-[9px] font-black text-slate-400 ml-4 uppercase tracking-tighter">System • Protocol Active</span>
            </div>

            {/* Neural Suggestions */}
            <div className="grid grid-cols-1 gap-2">
              <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-2 mb-1">Suggested Syncs</p>
              {suggestions.map((s, i) => (
                <button
                  key={i}
                  onClick={() => handleSuggest(s.prompt)}
                  className="flex items-center gap-3 p-3 text-left bg-white/60 border border-white rounded-2xl hover:bg-white hover:scale-[1.02] hover:shadow-md transition-all group"
                >
                  <span className="text-lg group-hover:scale-110 transition-transform">{s.icon}</span>
                  <span className="text-xs font-bold text-slate-600">{s.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Dynamic Message Mapping */}
        {messages.map((msg, i) => (
          <div key={i} className={`flex flex-col gap-2 ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
            <div className={`p-4 max-w-[90%] rounded-3xl ${
              msg.role === 'user' 
                ? 'bg-slate-900 text-white rounded-br-none shadow-md' 
                : 'bg-white border border-white text-slate-700 rounded-bl-none shadow-sm'
            }`}>
              <p className="text-sm font-medium leading-relaxed whitespace-pre-wrap">{msg.content}</p>
            </div>
            <span className="text-[9px] font-black text-slate-400 mx-4 uppercase tracking-tighter opacity-60">
              {msg.role === 'user' ? 'User Identity' : 'MikeAi Echo'}
            </span>
          </div>
        ))}

        {/* Thinking Indicator */}
        {loading && messages[messages.length - 1]?.content === '' && (
          <div className="flex gap-1.5 p-3.5 bg-white/40 border border-white w-fit rounded-full ml-4 animate-pulse">
            <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
            <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
            <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
          </div>
        )}
      </div>

      {/* --- INPUT AREA --- */}
      <div className="p-6 bg-white/40 border-t border-white/40 backdrop-blur-md">
        <div className="relative flex items-center">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Sync message..."
            className="w-full bg-white/80 border border-white py-4 px-6 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 transition-all pr-14 font-medium placeholder:text-slate-400"
          />
          <button 
            onClick={() => handleSendMessage()}
            disabled={loading || !input.trim()}
            className={`absolute right-2 p-3 rounded-full transition-all hover:scale-105 active:scale-95 shadow-lg ${
              loading || !input.trim() 
                ? 'bg-slate-200 cursor-not-allowed text-slate-400' 
                : 'bg-slate-900 text-white hover:bg-red-600 shadow-red-500/20'
            }`}
          >
            <HiOutlinePaperAirplane 
              className={`rotate-90 text-sm ${loading ? 'animate-pulse' : ''}`} 
            />
          </button>
        </div>
        <p className="text-[8px] text-center text-slate-400 mt-3 font-bold uppercase tracking-widest">
          Secured by MikeAI Neural Link v1.0
        </p>
      </div>
    </div>
  );
};

export default Chat;