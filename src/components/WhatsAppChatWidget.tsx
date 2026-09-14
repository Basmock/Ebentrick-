import React, { useState, useEffect, useRef } from 'react';
import { 
  MessageSquare, 
  X, 
  Send, 
  ExternalLink, 
  PhoneCall, 
  Bot, 
  User, 
  CheckCheck, 
  Sparkles,
  Zap,
  Minimize2
} from 'lucide-react';
import { appStore } from '../services/store';
import { ChatMessage } from '../types';

interface WhatsAppChatWidgetProps {
  isOpen: boolean;
  onToggle: () => void;
}

export const WhatsAppChatWidget: React.FC<WhatsAppChatWidgetProps> = ({
  isOpen,
  onToggle,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>(appStore.getChatMessages());
  const [inputText, setInputText] = useState('');
  const [activeTab, setActiveTab] = useState<'whatsapp' | 'live'>('whatsapp');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const unsub = appStore.subscribe(() => {
      setMessages(appStore.getChatMessages());
    });
    return unsub;
  }, []);

  useEffect(() => {
    if (activeTab === 'live' && isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, activeTab, isOpen]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    appStore.sendChatMessage(inputText.trim(), 'client', 'Client User', 'live_chat');
    setInputText('');
  };

  const quickWhatsAppPrompts = [
    {
      title: 'Solar & Inverter Setup',
      desc: 'Sizing calculation, lithium battery backup quote',
      prompt: 'Hello Ebentrick! I want to request a load assessment and quotation for a Solar & Inverter system for my facility.'
    },
    {
      title: 'Smart Home Automation',
      desc: 'Lutron, lighting, shades, mobile app integration',
      prompt: 'Hello Ebentrick! I would like to automate my residence with smart lighting, motorized curtains, and mobile voice control.'
    },
    {
      title: 'ATS & Generator Transfer',
      desc: 'Automatic changeover, zero-downtime switching',
      prompt: 'Hello Ebentrick! I need a quotation for an Automatic Change Over (ATS) switch panel synchronized with my generator.'
    },
    {
      title: 'Academy Cohort Registration',
      desc: 'Reserve a seat in the next technical hands-on batch',
      prompt: 'Hello Ebentrick Academy! I am interested in registering for the upcoming technical engineering training cohort.'
    },
    {
      title: '24/7 Emergency Dispatch',
      desc: 'Urgent electrical or security system troubleshooting',
      prompt: 'EMERGENCY: I require urgent on-site engineering assistance for an electrical/automation fault.'
    }
  ];

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end">
      {/* Floating Trigger Button */}
      {!isOpen && (
        <button
          id="floating-whatsapp-trigger"
          onClick={onToggle}
          className="group flex items-center gap-3 px-4 py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white shadow-xl shadow-emerald-950/40 border border-emerald-400/40 transition-all transform hover:scale-105 active:scale-95"
          title="Customer Support & WhatsApp Desk"
        >
          <div className="relative">
            <MessageSquare className="w-5 h-5 fill-current" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-red-500 ring-2 ring-emerald-600 animate-pulse" />
          </div>
          <div className="text-left hidden sm:block">
            <div className="text-xs font-bold leading-none">Support Desk</div>
            <div className="text-[10px] text-emerald-200 mt-0.5 font-medium flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-300" />
              WhatsApp & Live Chat
            </div>
          </div>
        </button>
      )}

      {/* Expanded Support Drawer */}
      {isOpen && (
        <div className="w-[92vw] sm:w-[380px] h-[520px] max-h-[80vh] flex flex-col bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700/80 rounded-3xl shadow-2xl overflow-hidden animate-in slide-in-from-bottom-5 duration-200">
          {/* Top Brand Header */}
          <div className="p-4 bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-emerald-100 dark:bg-emerald-600/20 text-emerald-600 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-500/30 flex items-center justify-center">
                <MessageSquare className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white leading-none">
                  Ebentrick Support Desk
                </h4>
                <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-1 mt-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse" />
                  Engineering Team Online
                </div>
              </div>
            </div>

            <button
              onClick={onToggle}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <Minimize2 className="w-4 h-4" />
            </button>
          </div>

          {/* Mode Switcher Tabs */}
          <div className="grid grid-cols-2 p-1.5 bg-slate-100/70 dark:bg-slate-950/70 border-b border-slate-200 dark:border-slate-800 text-xs font-semibold">
            <button
              onClick={() => setActiveTab('whatsapp')}
              className={`py-2 rounded-xl transition-all flex items-center justify-center gap-1.5 ${
                activeTab === 'whatsapp'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>WhatsApp Direct</span>
            </button>
            <button
              onClick={() => setActiveTab('live')}
              className={`py-2 rounded-xl transition-all flex items-center justify-center gap-1.5 ${
                activeTab === 'live'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Bot className="w-3.5 h-3.5" />
              <span>In-App Live Chat</span>
            </button>
          </div>

          {/* Content Area */}
          {activeTab === 'whatsapp' ? (
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50/60 dark:bg-slate-900/60">
              <div className="p-3 rounded-xl bg-white dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300 shadow-sm">
                <p className="font-semibold text-slate-900 dark:text-white mb-1">Direct WhatsApp Concierge</p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                  Select a pre-formatted query to launch WhatsApp instantly with our engineering lead:
                </p>
              </div>

              <div className="space-y-2">
                {quickWhatsAppPrompts.map((item, idx) => (
                  <a
                    key={idx}
                    href={appStore.getWhatsAppUrl(item.prompt)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block p-3 rounded-xl bg-white dark:bg-slate-800/80 hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700/60 hover:border-emerald-500/50 transition-all group shadow-sm"
                  >
                    <div className="flex items-center justify-between text-xs font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-300">
                      <span>{item.title}</span>
                      <ExternalLink className="w-3 h-3 text-emerald-600 dark:text-emerald-400 opacity-80 group-hover:opacity-100" />
                    </div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-1">
                      {item.desc}
                    </div>
                  </a>
                ))}
              </div>

              <div className="pt-2">
                <a
                  href={appStore.getWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 shadow-md shadow-emerald-700/20 transition-colors flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Open Custom WhatsApp Chat</span>
                </a>
              </div>
            </div>
          ) : (
            /* Live Chat Content */
            <div className="flex-1 flex flex-col justify-between overflow-hidden bg-slate-50/40 dark:bg-slate-950/40">
              {/* Messages scroll area */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {messages.map((m) => {
                  const isClient = m.sender === 'client';
                  return (
                    <div
                      key={m.id}
                      className={`flex flex-col ${isClient ? 'items-end' : 'items-start'}`}
                    >
                      <div className="flex items-center gap-1 text-[10px] text-slate-400 mb-0.5 px-1 font-mono">
                        <span>{m.senderName}</span>
                        <span>•</span>
                        <span>{m.timestamp}</span>
                      </div>
                      <div
                        className={`max-w-[85%] p-3 rounded-2xl text-xs leading-relaxed shadow-sm ${
                          isClient
                            ? 'bg-blue-600 text-white rounded-br-xs'
                            : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 rounded-bl-xs'
                        }`}
                      >
                        {m.message}
                      </div>
                    </div>
                  );
                })}
                <div ref={messagesEndRef} />
              </div>

              {/* Chat Input Bar */}
              <form onSubmit={handleSendMessage} className="p-3 bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Ask our engineers anything..."
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  className="flex-1 px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-blue-500"
                />
                <button
                  type="submit"
                  className="p-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
