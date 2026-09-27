import React, { useState, useRef, useEffect } from 'react';
import { Attendee, ChatMessage } from '../types';
import { ICEBREAKER_PROMPTS } from '../data/mockData';

interface ChatModalProps {
  attendee: Attendee;
  initialMessage?: string;
  onClose: () => void;
  onNavigateToRadar: (attendee: Attendee) => void;
}

export const ChatModal: React.FC<ChatModalProps> = ({
  attendee,
  initialMessage,
  onClose,
  onNavigateToRadar,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    const list: ChatMessage[] = [];
    if (attendee.lastMessage) {
      list.push({
        id: 'msg-prev',
        senderId: attendee.lastMessage.isYou ? 'you' : attendee.id,
        senderName: attendee.lastMessage.isYou ? 'You' : attendee.name,
        text: attendee.lastMessage.text,
        time: attendee.lastMessage.time,
        isYou: !!attendee.lastMessage.isYou,
      });
    }
    if (initialMessage) {
      list.push({
        id: 'msg-init-' + Date.now(),
        senderId: 'you',
        senderName: 'You',
        text: initialMessage,
        time: 'Just now',
        isYou: true,
        isIcebreaker: true,
      });
    }
    return list;
  });

  const [inputVal, setInputVal] = useState('');
  const [icebreakerIdx, setIcebreakerIdx] = useState(0);
  const [meetupProposed, setMeetupProposed] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (textToSend?: string) => {
    const messageText = textToSend || inputVal.trim();
    if (!messageText) return;

    const userMsg: ChatMessage = {
      id: 'msg-' + Date.now(),
      senderId: 'you',
      senderName: 'You',
      text: messageText,
      time: 'Just now',
      isYou: true,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputVal('');

    // Simulated responsive reply
    setTimeout(() => {
      let reply = `Great to connect! I'm heading over to ${attendee.stageName} right now.`;
      if (messageText.toLowerCase().includes('coffee')) {
        reply = `Sounds perfect! Let's grab an espresso at the Hacker Den bar right after the panel.`;
      } else if (messageText.toLowerCase().includes('pitch') || messageText.toLowerCase().includes('co-founder')) {
        reply = `I saw your card tags on autonomous agents—very aligned with what I'm cooking up. Let's exchange decks!`;
      } else if (messageText.toLowerCase().includes('spiciest')) {
        reply = `Honestly? That prompt engineering will be fully obsoleted by self-compiling latent graph models before Q4.`;
      }

      const botMsg: ChatMessage = {
        id: 'msg-reply-' + Date.now(),
        senderId: attendee.id,
        senderName: attendee.name,
        text: reply,
        time: 'Just now',
        isYou: false,
      };
      setMessages((prev) => [...prev, botMsg]);
    }, 1200);
  };

  const handleProposeMeetup = () => {
    setMeetupProposed(true);
    handleSendMessage(`📍 Sent Venue Ping: Proposing we meet at ${attendee.stageName} in 10 minutes!`);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#12131a] flex flex-col justify-between max-w-md mx-auto">
      {/* Top Chat App Bar */}
      <header className="h-16 px-3 bg-[#0d0e15]/95 backdrop-blur-md border-b border-white/5 flex items-center justify-between gap-2 shrink-0">
        <div className="flex items-center gap-2.5 min-w-0">
          <button
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center rounded-xl bg-[#1e1f27] hover:bg-[#292931] text-white active:scale-95 transition-all"
            type="button"
          >
            <span className="material-symbols-outlined text-[20px]">arrow_back_ios_new</span>
          </button>

          <div className="relative">
            <img
              alt={attendee.name}
              className="w-10 h-10 rounded-full object-cover border border-white/10"
              src={attendee.photo}
            />
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-[#caf300] shadow-[0_0_6px_#caf300] border border-[#0d0e15]"></span>
          </div>

          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-1.5">
              <h2 className="font-headline text-[16px] font-bold text-white truncate">
                {attendee.name}
              </h2>
              <span className="font-mono text-[9px] uppercase px-1.5 py-0.5 rounded bg-[#caf300]/20 text-[#caf300] font-bold">
                {attendee.role}
              </span>
            </div>
            <div className="flex items-center gap-1 text-[#e3bebe] font-mono text-[10px]">
              <span className="material-symbols-outlined text-[12px] text-[#ff5167]">near_me</span>
              <span className="truncate">{attendee.location}</span>
            </div>
          </div>
        </div>

        {/* Find on Radar action */}
        <button
          onClick={() => {
            onClose();
            onNavigateToRadar(attendee);
          }}
          className="px-2.5 py-1.5 rounded-lg bg-[#292931] hover:bg-[#34343c] text-[#caf300] font-mono text-[10px] uppercase font-bold tracking-wider flex items-center gap-1 border border-[#caf300]/20 shrink-0"
          type="button"
        >
          <span className="material-symbols-outlined text-[14px]">explore</span>
          <span>Radar</span>
        </button>
      </header>

      {/* Proximity / Rendezvous Banner */}
      <div className="bg-[#1e1f27] px-4 py-2 flex items-center justify-between gap-2 border-b border-white/5">
        <div className="flex items-center gap-2 min-w-0">
          <span className="text-[#caf300] text-[16px]">⚡</span>
          <p className="font-body text-[12px] text-[#e3e1ec] truncate">
            {attendee.name} is <span className="text-[#caf300] font-bold">{attendee.distance}</span> near {attendee.stageName}
          </p>
        </div>
        <button
          onClick={handleProposeMeetup}
          disabled={meetupProposed}
          className={`shrink-0 px-2.5 py-1 rounded-full font-mono text-[10px] font-bold uppercase transition-all ${
            meetupProposed
              ? 'bg-[#34343c] text-[#caf300]'
              : 'bg-[#caf300] hover:bg-[#b0d500] text-[#12131a] shadow-[0_0_12px_rgba(202,243,0,0.3)]'
          }`}
          type="button"
        >
          {meetupProposed ? '✓ Ping Sent' : 'Ping Meetup'}
        </button>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {/* Match Announcement Header Pill inside conversation */}
        <div className="flex flex-col items-center my-3">
          <div className="px-3 py-1 rounded-full bg-[#292931] border border-white/5 text-[#e3bebe] font-mono text-[10px] uppercase tracking-wider flex items-center gap-1.5 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-[#caf300] shadow-[0_0_6px_#caf300]"></span>
            <span>Matched via High-Voltage Collision • {attendee.matchScore}% Synergy</span>
          </div>
        </div>

        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col ${msg.isYou ? 'items-end' : 'items-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-2xl p-3 shadow-md ${
                msg.isYou
                  ? 'bg-[#ff5167] text-white rounded-br-xs shadow-[0_2px_12px_rgba(255,81,103,0.3)]'
                  : 'bg-[#292931] text-[#e3e1ec] rounded-bl-xs border border-white/5'
              }`}
            >
              {msg.isIcebreaker && (
                <div className="flex items-center gap-1 mb-1 font-mono text-[9px] uppercase tracking-wider text-[#ffdada] font-bold">
                  <span>⚡ SPARK ICEBREAKER</span>
                </div>
              )}
              <p className="font-body text-[14px] leading-relaxed">{msg.text}</p>
            </div>
            <span className="font-mono text-[9px] text-[#e3bebe]/60 mt-1 px-1">
              {msg.time}
            </span>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Prompts Bar */}
      <div className="px-3 py-1.5 bg-[#1a1b22] border-t border-white/5 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
        <button
          onClick={() => {
            const nextIdx = (icebreakerIdx + 1) % ICEBREAKER_PROMPTS.length;
            setIcebreakerIdx(nextIdx);
            setInputVal(ICEBREAKER_PROMPTS[nextIdx]);
          }}
          className="shrink-0 px-2 py-1 rounded-md bg-[#292931] text-[#caf300] font-mono text-[10px] uppercase font-bold flex items-center gap-1 border border-[#caf300]/20"
          type="button"
        >
          <span className="material-symbols-outlined text-[12px]">casino</span>
          <span>Prompt</span>
        </button>

        {[
          "Are you free for a 5m coffee chat?",
          "Loved your keynote! Can I ask about your stack?",
          "Let's sync up at the VIP mixer!",
        ].map((quickText) => (
          <button
            key={quickText}
            onClick={() => handleSendMessage(quickText)}
            className="shrink-0 px-2.5 py-1 rounded-full bg-[#292931] hover:bg-[#383941] text-[#e3e1ec] font-mono text-[10px] truncate max-w-[200px] border border-white/5"
            type="button"
          >
            {quickText}
          </button>
        ))}
      </div>

      {/* Input Message Area */}
      <div className="p-3 bg-[#0d0e15] border-t border-white/5 flex items-center gap-2">
        <input
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSendMessage();
          }}
          placeholder={`Message ${attendee.name.split(' ')[0]}...`}
          className="flex-1 bg-[#1e1f27] text-white px-4 py-2.5 rounded-full font-body text-[14px] border border-white/10 focus:outline-none focus:border-[#ff5167] transition-colors"
        />

        <button
          onClick={() => handleSendMessage()}
          disabled={!inputVal.trim()}
          className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
            inputVal.trim()
              ? 'bg-[#ff5167] text-white shadow-[0_0_12px_rgba(255,81,103,0.5)] active:scale-95'
              : 'bg-[#1e1f27] text-[#e3bebe]/40 cursor-not-allowed'
          }`}
          type="button"
        >
          <span className="material-symbols-outlined text-[20px]">send</span>
        </button>
      </div>
    </div>
  );
};
