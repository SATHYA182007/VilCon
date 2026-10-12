'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Bot,
  X,
  Send,
  Mic,
  MicOff,
  Sparkles,
  Radio,
  Volume2,
  Globe,
  CheckCircle2,
  AlertTriangle,
} from 'lucide-react';
import { useApp } from '@/lib/context/AppContext';
import { askGramAICopilot, AIChatMessage } from '@/lib/ai/gemini';

export const VillageCopilotModal: React.FC = () => {
  const { copilotOpen, setCopilotOpen, networkMode } = useApp();
  const [messages, setMessages] = useState<AIChatMessage[]>([
    {
      sender: 'assistant',
      text: 'Namaste! I am GramAI, your rural connectivity & service assistant. Ask me about Telemedicine, Government Schemes, Emergency First Aid, or Local Weather tips.',
      timestamp: 'Just now',
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const chatEndRef = useRef<HTMLDivElement>(null);

  const isOffline = networkMode === 'Offline';

  const quickPrompts = [
    'Am I eligible for PM-Kisan subsidy?',
    'Emergency first-aid for snakebite',
    'Network relay status in Bhojpur',
    'Weather forecast for harvesting pulse crops',
  ];

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend || inputText;
    if (!text.trim()) return;

    const userMsg: AIChatMessage = {
      sender: 'user',
      text: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputText('');
    setIsLoading(true);

    try {
      const response = await askGramAICopilot(text, isOffline, selectedLanguage);
      const assistantMsg: AIChatMessage = {
        sender: 'assistant',
        text: response,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, assistantMsg]);
    } catch {
      const fallbackMsg: AIChatMessage = {
        sender: 'assistant',
        text: 'GramAI offline fallback engaged. Request cached.',
        timestamp: 'Just now',
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleVoiceRecording = () => {
    if (!isRecording) {
      setIsRecording(true);
      // Simulate voice input recognition after 2.5s
      setTimeout(() => {
        setIsRecording(false);
        handleSendMessage('How do I apply for PM-Kisan scheme offline?');
      }, 2500);
    } else {
      setIsRecording(false);
    }
  };

  if (!copilotOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-2xl rounded-2xl bg-dark-900 border border-violet-500/30 shadow-2xl shadow-violet-500/20 overflow-hidden flex flex-col h-[650px]"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 bg-gradient-to-r from-violet-950/80 via-dark-800 to-electric-950/80 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="relative p-2.5 rounded-xl bg-violet-600/30 border border-violet-500/40 text-violet-300">
                <Bot className="w-6 h-6 animate-pulse" />
                <span className="absolute -top-1 -right-1 flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500"></span>
                </span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-poppins font-bold text-white text-base">GramAI Voice & Text Copilot</h3>
                  {isOffline ? (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 font-semibold flex items-center gap-1">
                      <AlertTriangle className="w-3 h-3" /> Offline Engine
                    </span>
                  ) : (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-semibold flex items-center gap-1">
                      <Radio className="w-3 h-3 animate-spin-slow" /> Gemini AI Online
                    </span>
                  )}
                </div>
                <p className="text-xs text-gray-400">Regional Rural Intelligence • Multi-Language Support</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {/* Language Selector */}
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="bg-dark-800 border border-white/10 text-xs text-gray-200 rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-violet-500"
              >
                <option value="English">English</option>
                <option value="Hindi">हिंदी (Hindi)</option>
                <option value="Tamil">தமிழ் (Tamil)</option>
                <option value="Telugu">తెలుగు (Telugu)</option>
                <option value="Bengali">বাংলা (Bengali)</option>
              </select>

              <button
                onClick={() => setCopilotOpen(false)}
                className="p-1.5 rounded-lg bg-dark-800 text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Messages Container */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-dark-950/50">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] p-3.5 rounded-2xl text-sm leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-gradient-to-r from-electric-600 to-cyan-600 text-white rounded-br-none shadow-lg shadow-electric-600/20'
                      : 'bg-dark-800/90 border border-white/10 text-gray-200 rounded-bl-none shadow-md'
                  }`}
                >
                  <p className="whitespace-pre-line">{msg.text}</p>
                </div>
                <span className="text-[10px] text-gray-500 mt-1 px-1">{msg.timestamp}</span>
              </div>
            ))}

            {isLoading && (
              <div className="flex items-center gap-2 p-3.5 rounded-2xl bg-dark-800/90 border border-white/10 text-gray-400 max-w-[50%]">
                <Sparkles className="w-4 h-4 text-violet-400 animate-spin" />
                <span className="text-xs">GramAI is thinking...</span>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Quick Prompts */}
          <div className="p-3 bg-dark-900 border-t border-white/10 overflow-x-auto flex gap-2 no-scrollbar">
            {quickPrompts.map((prompt, i) => (
              <button
                key={i}
                onClick={() => handleSendMessage(prompt)}
                className="px-3 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-300 text-xs hover:bg-violet-500/20 whitespace-nowrap transition-colors flex items-center gap-1.5"
              >
                <Sparkles className="w-3 h-3 text-cyan-400" />
                <span>{prompt}</span>
              </button>
            ))}
          </div>

          {/* Input Controls */}
          <div className="p-4 bg-dark-900 border-t border-white/10 flex items-center gap-3">
            <button
              onClick={toggleVoiceRecording}
              className={`p-3 rounded-xl border transition-all ${
                isRecording
                  ? 'bg-rose-600 border-rose-400 text-white animate-bounce shadow-lg shadow-rose-600/40'
                  : 'bg-dark-800 border-white/10 text-violet-400 hover:border-violet-500/40'
              }`}
              title={isRecording ? 'Listening...' : 'Voice Search (Simulated)'}
            >
              {isRecording ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
            </button>

            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder={
                isRecording
                  ? 'Listening to voice input in regional dialect...'
                  : isOffline
                  ? 'Ask GramAI offline knowledge base...'
                  : 'Ask GramAI anything...'
              }
              className="flex-1 px-4 py-3 rounded-xl bg-dark-800 border border-white/10 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-violet-500/60"
            />

            <button
              onClick={() => handleSendMessage()}
              disabled={isLoading || !inputText.trim()}
              className="p-3 rounded-xl bg-gradient-to-r from-violet-600 to-electric-600 text-white font-medium shadow-lg shadow-violet-500/20 hover:shadow-violet-500/40 disabled:opacity-40 transition-all"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
