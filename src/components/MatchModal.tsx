import React from 'react';
import { Attendee, UserProfile } from '../types';
import { MEETME_LOGO_URL } from '../data/mockData';

interface MatchModalProps {
  attendee: Attendee;
  userProfile: UserProfile;
  remainingDeckCount: number;
  onClose: () => void;
  onSendIcebreaker: (attendee: Attendee) => void;
  onFindAtVenue: (attendee: Attendee) => void;
}

export const MatchModal: React.FC<MatchModalProps> = ({
  attendee,
  userProfile,
  remainingDeckCount,
  onClose,
  onSendIcebreaker,
  onFindAtVenue,
}) => {
  // Pre-calculated confetti particles for pure declarative rendering
  const confettiPieces = Array.from({ length: 24 }).map((_, i) => {
    const colors = ['#ff5167', '#caf300', '#ddb7ff', '#ffffff'];
    const color = colors[i % colors.length];
    const size = (i % 4) + 4;
    const left = (i * 4.2 + (i % 7) * 3) % 96;
    const top = (i * 3.8 + (i % 5) * 5) % 80;
    const delay = ((i % 5) * 0.4).toFixed(2);
    const duration = ((i % 3) * 0.8 + 2.5).toFixed(2);
    const rotation = (i * 37) % 360;

    return { id: i, color, size, left, top, delay, duration, rotation };
  });

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#12131a] flex flex-col justify-start">
      {/* Fixed Header */}
      <header className="fixed top-0 inset-x-0 z-50 bg-[#0d0e15]/85 backdrop-blur-xl pt-safe shadow-[0_4px_24px_rgba(0,0,0,0.6)] border-b border-white/5">
        <div className="h-16 px-3 flex items-center justify-between gap-2 max-w-md mx-auto w-full">
          <div className="flex items-center gap-2 min-w-0 flex-1">
            <button
              aria-label="Back to Deck"
              onClick={onClose}
              className="w-11 h-11 flex items-center justify-center rounded-xl bg-[#1e1f27] hover:bg-[#383941] text-[#e3e1ec] active:scale-95 transition-all border border-white/5"
              type="button"
            >
              <span className="material-symbols-outlined text-[20px]">arrow_back_ios_new</span>
            </button>
            <img
              alt="MeetMe Electric Emblem"
              className="h-7 w-auto object-contain shrink-0"
              src={MEETME_LOGO_URL}
            />
            <h1 className="font-headline text-[18px] font-bold tracking-tight text-white truncate">
              Attendee Detail
            </h1>
          </div>
          <div className="flex items-center shrink-0">
            <img
              alt="Elena Vance Profile"
              className="w-8 h-8 rounded-full object-cover border border-white/10"
              src={userProfile.photo}
            />
          </div>
        </div>
      </header>

      {/* Main Collision Content Body */}
      <main className="flex flex-col relative w-full pt-16 bg-[#12131a] min-h-screen">
        <div className="flex flex-col w-full relative overflow-hidden pb-12 max-w-md mx-auto">
          {/* Ambient Particles & Glowing Beams */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
            <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#ff5167]/20 rounded-full blur-[90px]"></div>
            <div className="absolute top-1/4 -left-20 w-72 h-72 bg-[#caf300]/15 rounded-full blur-[80px]"></div>
            <div className="absolute top-1/3 -right-20 w-80 h-80 bg-[#b76dff]/20 rounded-full blur-[80px]"></div>

            {/* Radar Beam Circles */}
            <svg className="absolute inset-0 w-full h-full opacity-60" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="beamGrad" x1="0%" x2="100%" y1="0%" y2="100%">
                  <stop offset="0%" stopColor="#ff5167" stopOpacity="0.4" />
                  <stop offset="50%" stopColor="#caf300" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#b76dff" stopOpacity="0" />
                </linearGradient>
              </defs>
              <circle
                className="animate-pulse"
                cx="50%"
                cy="28%"
                fill="none"
                r="180"
                stroke="url(#beamGrad)"
                strokeDasharray="8 12"
                strokeWidth="1.5"
              />
              <circle
                cx="50%"
                cy="28%"
                fill="none"
                opacity="0.5"
                r="240"
                stroke="url(#beamGrad)"
                strokeDasharray="4 8"
                strokeWidth="1"
              />
            </svg>

            {/* Declarative floating confetti */}
            {confettiPieces.map((piece) => (
              <div
                key={piece.id}
                className="absolute rounded-sm pointer-events-none opacity-80 animate-confetti"
                style={{
                  width: `${piece.size}px`,
                  height: `${piece.size * 1.6}px`,
                  left: `${piece.left}%`,
                  top: `${piece.top}%`,
                  backgroundColor: piece.color,
                  transform: `rotate(${piece.rotation}deg)`,
                  animationDelay: `${piece.delay}s`,
                  animationDuration: `${piece.duration}s`,
                }}
              />
            ))}
          </div>

          {/* High Voltage Collision Title Header */}
          <div className="relative z-10 flex flex-col items-center px-4 pt-4 text-center">
            <div className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-[#292931]/90 shadow-md backdrop-blur-md mb-2 border border-[#caf300]/30">
              <span className="material-symbols-outlined text-[16px] text-[#caf300] animate-spin" style={{ animationDuration: '3s' }}>
                bolt
              </span>
              <span className="font-mono text-[11px] text-[#caf300] tracking-wider uppercase font-semibold">
                High-Voltage Collision
              </span>
            </div>
            <div className="relative flex flex-col items-center">
              <h2 className="font-headline text-[32px] sm:text-[36px] font-extrabold uppercase tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#ffb3b5] via-white to-[#caf300] drop-shadow-[0_0_25px_rgba(255,81,103,0.5)]">
                IT&apos;S A MATCH!
              </h2>
              <p className="font-body text-[15px] text-[#e3bebe] max-w-xs mt-1">
                You and <span className="font-semibold text-white">{attendee.name}</span> both sparked each other&apos;s frequency.
              </p>
            </div>
          </div>

          {/* Dual Holographic Colliding Cards Stage */}
          <div className="relative z-10 w-full px-4 mt-4 mb-4">
            <div className="relative w-full max-w-sm mx-auto h-72 flex items-center justify-center">
              {/* Central Glowing Spark Core */}
              <div className="absolute z-20 flex items-center justify-center pointer-events-none">
                <div className="w-16 h-16 rounded-full bg-[#ff5167] flex items-center justify-center shadow-[0_0_35px_#ff5167] animate-pulse">
                  <span className="material-symbols-outlined text-white text-[32px]">electric_bolt</span>
                </div>
                <div
                  className="absolute w-28 h-28 rounded-full bg-[#caf300]/20 blur-xl animate-ping"
                  style={{ animationDuration: '2s' }}
                ></div>
              </div>

              {/* Left Card: Elena Vance (You) */}
              <div className="absolute left-2 w-44 rounded-xl bg-[#292931] shadow-xl p-1.5 transform -rotate-12 translate-y-1 hover:rotate-0 transition-transform duration-300 border border-white/10">
                <div className="relative w-full aspect-[4/5] rounded-lg overflow-hidden bg-[#0d0e15]">
                  <img
                    alt={userProfile.name}
                    className="w-full h-full object-cover"
                    src={userProfile.photo}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0d0e15] via-transparent to-transparent"></div>
                  <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-[#0d0e15]/80 backdrop-blur-md border border-[#caf300]/30">
                    <span className="font-mono text-[10px] text-[#caf300] uppercase tracking-wider font-semibold">
                      FOUNDER
                    </span>
                  </div>
                  <div className="absolute bottom-2 inset-x-2 text-left">
                    <p className="font-headline text-[15px] text-white font-bold truncate leading-tight">
                      {userProfile.name}
                    </p>
                    <p className="font-mono text-[10px] text-[#e3bebe] truncate">
                      Product & AI Arc
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Card: Matched Attendee (Alex Chen) */}
              <div className="absolute right-2 w-44 rounded-xl bg-[#292931] shadow-xl p-1.5 transform rotate-12 -translate-y-1 hover:rotate-0 transition-transform duration-300 border border-white/10">
                <div className="relative w-full aspect-[4/5] rounded-lg overflow-hidden bg-[#0d0e15]">
                  <img
                    alt={attendee.name}
                    className="w-full h-full object-cover"
                    src={attendee.photo}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0d0e15] via-transparent to-transparent"></div>
                  <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-[#0d0e15]/80 backdrop-blur-md border border-[#ff5167]/30">
                    <span className="font-mono text-[10px] text-[#ffb3b5] uppercase tracking-wider font-semibold">
                      ★ {attendee.role}
                    </span>
                  </div>
                  <div className="absolute bottom-2 inset-x-2 text-left">
                    <p className="font-headline text-[15px] text-white font-bold truncate leading-tight">
                      {attendee.name}
                    </p>
                    <p className="font-mono text-[10px] text-[#e3bebe] truncate">
                      {attendee.role === 'SPEAKER' ? 'Keynote • Quantum ML' : attendee.title}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mutual Alignment & Venue Radar Cards */}
          <div className="relative z-10 px-4 space-y-3 max-w-md mx-auto w-full">
            {/* 1. Mutual Alignment */}
            <div className="rounded-xl bg-[#292931] p-4 shadow-md flex items-center gap-3 border border-white/5">
              <div className="w-10 h-10 rounded-lg bg-[#0d0e15] flex items-center justify-center shrink-0 border border-white/5 text-[#caf300]">
                <span className="material-symbols-outlined text-[22px]">flare</span>
              </div>
              <div className="min-w-0 flex-1 text-left">
                <div className="flex items-center gap-1.5">
                  <span className="font-mono text-[10px] text-[#caf300] uppercase tracking-wider font-semibold">
                    Mutual Alignment
                  </span>
                  <span className="px-1.5 py-0.5 rounded bg-[#1e1f27] font-mono text-[10px] text-[#e3e1ec] font-bold border border-white/5">
                    {attendee.matchScore}% Synergy
                  </span>
                </div>
                <p className="font-body text-[15px] text-white font-medium truncate mt-0.5">
                  &ldquo;{attendee.synergyTopic}&rdquo;
                </p>
              </div>
            </div>

            {/* 2. Instant Venue Radar */}
            <div className="rounded-xl bg-[#1e1f27] p-4 shadow-lg space-y-2 border border-white/5">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-[#ff5167] text-[20px] mt-0.5">
                    near_me
                  </span>
                  <div>
                    <p className="font-mono text-[10px] text-[#e3bebe] uppercase tracking-wider font-medium">
                      Instant Venue Radar
                    </p>
                    <p className="font-headline text-[18px] text-white font-bold">
                      {attendee.stageName}
                    </p>
                  </div>
                </div>
                <div className="px-2.5 py-1 rounded-full bg-[#34343c] flex items-center gap-1 shrink-0 border border-[#caf300]/20">
                  <span className="w-2 h-2 rounded-full bg-[#caf300] animate-pulse"></span>
                  <span className="font-mono text-[10px] text-[#caf300] font-bold uppercase">
                    Hot Radar
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between text-left pt-1 border-t border-white/5">
                <div className="flex items-center gap-1.5">
                  <span className="font-body text-[13px] text-[#e3bebe]">Estimated Distance:</span>
                  <span className="font-mono text-[12px] text-white font-bold">{attendee.distance}</span>
                </div>
                <div className="flex items-center gap-1 font-mono text-[11px] text-[#e3bebe]">
                  <span className="material-symbols-outlined text-[14px] text-[#ff5167]">local_fire_department</span>
                  <span>{attendee.activeTime}</span>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="pt-2 space-y-2.5">
              {/* CTA 1: Send Spark Icebreaker */}
              <button
                onClick={() => onSendIcebreaker(attendee)}
                className="w-full h-13 py-3.5 px-4 rounded-xl bg-[#ff5167] hover:bg-[#ff5167]/90 active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-[0_0_24px_rgba(255,81,103,0.4)] text-white"
                type="button"
              >
                <span className="material-symbols-outlined text-[22px]">bolt</span>
                <span className="font-mono text-[13px] uppercase font-bold tracking-wider">
                  Send Spark Icebreaker
                </span>
              </button>

              {/* CTA 2: Radar Route */}
              <button
                onClick={() => onFindAtVenue(attendee)}
                className="w-full h-12 py-3 px-4 rounded-xl bg-[#292931] hover:bg-[#383941] active:scale-[0.98] transition-all flex items-center justify-center gap-2 text-white border border-white/5"
                type="button"
              >
                <span className="material-symbols-outlined text-[#caf300] text-[20px]">explore</span>
                <span className="font-mono text-[11px] uppercase font-semibold tracking-wider">
                  Radar Route: Find at Venue
                </span>
              </button>

              {/* CTA 3: Keep Swiping */}
              <div className="pt-1 flex justify-center">
                <button
                  onClick={onClose}
                  className="px-4 py-2 rounded-lg font-mono text-[11px] text-[#e3bebe] hover:text-white transition-colors flex items-center gap-1.5"
                  type="button"
                >
                  <span>Keep Swiping Deck</span>
                  <span className="px-1.5 py-0.5 rounded-full bg-[#34343c] text-[#caf300] font-mono text-[10px] font-bold">
                    {remainingDeckCount} wait
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
