'use client';

import { useChat } from '@ai-sdk/react';
import { motion } from 'framer-motion';
import { Briefcase, User, Code, Smile, Mail, ArrowUp } from 'lucide-react';

export default function Portfolio() {
  const { messages, input, handleInputChange, handleSubmit, setInput } = useChat();

  const handleSuggestionClick = (text: string) => {
    setInput(text);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white text-black p-4 font-sans selection:bg-gray-100">
      
      {/* 1. Header Section (Only visible when chat is empty) */}
      {messages.length === 0 && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center flex flex-col items-center mb-10"
        >
          {/* Greeting */}
          <div className="flex items-center gap-2 mb-8">
            <span className="text-xl md:text-2xl text-gray-800 font-medium">Hey, I'm Avinash Sangisetti</span>
            <span className="text-xl md:text-2xl animate-pulse">👋</span>
          </div>

          {/* Avatar Image (Bitmoji) */}
          <div className="relative w-40 h-40 mb-4">
            <img 
              src="/avatar.jpg" 
              alt="Avinash" 
              className="rounded-full shadow-lg hover:scale-105 transition-transform duration-300 object-cover"
            />
          </div>
        </motion.div>
      )}

      {/* 2. Chat Area (Appears once you start talking) */}
      <div className="w-full max-w-2xl flex-1 overflow-y-auto space-y-4 mb-4 px-4 scrollbar-hide">
        {messages.map(m => (
          <motion.div 
            key={m.id} 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`px-4 py-2.5 rounded-2xl max-w-[85%] text-sm md:text-base leading-relaxed ${
              m.role === 'user' 
                ? 'bg-black text-white rounded-br-none' 
                : 'bg-gray-100 text-gray-800 rounded-bl-none'
            }`}>
              {m.content}
            </div>
          </motion.div>
        ))}
      </div>

      {/* 3. Input Area */}
      <div className="w-full max-w-xl mx-auto z-10">
        <form onSubmit={handleSubmit} className="relative flex items-center shadow-lg rounded-full border border-gray-100 bg-white">
          <input
            className="w-full py-4 pl-6 pr-12 rounded-full focus:outline-none text-gray-700 placeholder-gray-400"
            value={input}
            placeholder="Ask me anything..."
            onChange={handleInputChange}
          />
          <button 
            type="submit" 
            disabled={!input}
            className="absolute right-2 p-2 bg-blue-500 rounded-full text-white hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            <ArrowUp size={20} />
          </button>
        </form>

        {/* Suggestion Buttons (Only visible when chat is empty) */}
        {messages.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap justify-center gap-3 mt-8"
          >
            <SuggestionBtn icon={<User size={16}/>} label="Me" onClick={() => handleSuggestionClick("Tell me about yourself")} />
            <SuggestionBtn icon={<Briefcase size={16}/>} label="Projects" onClick={() => handleSuggestionClick("Tell me about your SGuardian project")} />
            <SuggestionBtn icon={<Code size={16}/>} label="Skills" onClick={() => handleSuggestionClick("What are your technical skills?")} />
            <SuggestionBtn icon={<Smile size={16}/>} label="Fun" onClick={() => handleSuggestionClick("What games do you play?")} />
            <SuggestionBtn icon={<Mail size={16}/>} label="Contact" onClick={() => handleSuggestionClick("How can I contact you?")} />
          </motion.div>
        )}
      </div>
      
    </div>
  );
}

// Helper component for the buttons
function SuggestionBtn({ icon, label, onClick }: { icon: any, label: string, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className="flex flex-col items-center justify-center w-16 h-16 md:w-20 md:h-20 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200 group"
    >
      <div className="text-gray-400 group-hover:text-blue-500 mb-2">{icon}</div>
      <span className="text-xs font-medium text-gray-600">{label}</span>
    </button>
  );
}