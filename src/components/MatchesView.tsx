import React, { useState } from 'react';
import { Attendee } from '../types';
import { ICEBREAKER_PROMPTS } from '../data/mockData';

interface MatchesViewProps {
  matches: Attendee[];
  onOpenChat: (attendee: Attendee, initialMessage?: string) => void;
  onOpenProfile: (attendee: Attendee) => void;
}

export const MatchesView: React.FC<MatchesViewProps> = ({
  matches,
  onOpenChat,
  onOpenProfile,
}) => {
  const [icebreakerIndex, setIcebreakerIndex] = useState(0);
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [copiedNotification, setCopiedNotification] = useState(false);

  const currentIcebreaker = ICEBREAKER_PROMPTS[icebreakerIndex % ICEBREAKER_PROMPTS.length];

  const handleRollIcebreaker = () => {
    setIcebreakerIndex((prev) => (prev + 1) % ICEBREAKER_PROMPTS.length);
  };

  const handleCopyIcebreaker = () => {
    navigator.clipboard?.writeText(currentIcebreaker);
    setCopiedNotification(true);
    setTimeout(() => setCopiedNotification(false), 2000);
  };

  // Filter logic
  const filteredMatches = matches.filter((attendee) => {
    if (selectedFilter === 'unread') return attendee.unread;
    if (selectedFilter === 'speakers') return attendee.role === 'SPEAKER';
    if (selectedFilter === 'mentors') return attendee.role === 'MENTOR';
    if (selectedFilter === 'recruiters') return attendee.role === 'RECRUITER';
    if (selectedFilter === 'nearby') return attendee.distance.includes('2') || attendee.distance.includes('3') || attendee.distance.includes('4');
    return true;
  });

  const getBorderColorForRole = (role: string) => {
    switch (role) {
      case 'SPEAKER':
        return 'bg-amber-400';
      case 'MENTOR':
        return 'bg-[#b76dff]';
      case 'RECRUITER':
        return 'bg-emerald-400';
      case 'ORGANIZER':
        return 'bg-[#ff5167]';
      default:
        return 'bg-slate-500';
    }
  };

  const getRoleBadgeClasses = (role: string) => {
    switch (role) {
      case 'SPEAKER':
        return 'bg-amber-400/15 text-amber-300';
      case 'MENTOR':
        return 'bg-[#b76dff]/15 text-[#ddb7ff]';
      case 'RECRUITER':
        return 'bg-emerald-400/15 text-emerald-300';
      case 'ORGANIZER':
        return 'bg-[#ff5167]/15 text-[#ffb3b5]';
      default:
        return 'bg-[#34343c] text-white';
    }
  };

  const getAvatarRingClass = (role: string) => {
    switch (role) {
      case 'SPEAKER':
        return 'from-amber-400 via-yellow-200 to-amber-600 shadow-[0_0_16px_rgba(251,191,36,0.35)]';
      case 'MENTOR':
        return 'from-[#b76dff] via-[#ddb7ff] to-purple-400 shadow-[0_0_16px_rgba(183,109,255,0.35)]';
      case 'RECRUITER':
        return 'from-emerald-400 via-teal-300 to-emerald-600 shadow-[0_0_16px_rgba(52,211,153,0.35)]';
      case 'ORGANIZER':
        return 'from-[#ff5167] via-orange-400 to-rose-600 shadow-[0_0_16px_rgba(255,81,103,0.35)]';
      default:
        return 'from-slate-400 to-slate-700';
    }
  };

  return (
    <div className="flex flex-col w-full text-[#e3e1ec] max-w-md mx-auto pt-2 pb-24">
      {/* Gamified Top Stats Bar */}
      <div className="px-4 pt-2 pb-2">
        <div className="relative overflow-hidden rounded-xl bg-[#292931] p-4 shadow-lg border border-white/5">
          <div className="absolute -right-8 -top-8 w-28 h-28 rounded-full bg-[#caf300]/10 blur-2xl pointer-events-none"></div>
          <div className="relative flex items-center justify-between gap-3">
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-1.5 mb-1">
                <span className="material-symbols-outlined text-[16px] text-[#caf300]">inventory_2</span>
                <span className="font-mono text-[10px] uppercase tracking-wider text-[#e3bebe] font-semibold">
                  Your Conference Rolodex
                </span>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-baseline gap-1.5">
                  <span className="font-headline text-[24px] text-white font-bold">{matches.length}</span>
                  <span className="font-mono text-[10px] uppercase text-[#e3bebe]">Matches</span>
                </div>
                <div className="h-3 w-px bg-white/10"></div>
                <div className="flex items-center gap-1.5">
                  <span className="flex h-2 w-2 rounded-full bg-[#ff5167] shadow-[0_0_8px_#ff5167]"></span>
                  <span className="font-mono text-[11px] text-[#ffb3b5] font-bold uppercase tracking-wider">
                    3 New Sparks
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-end shrink-0">
              <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#0d0e15] shadow-inner border border-white/5">
                <span className="material-symbols-outlined text-[14px] text-[#ddb7ff]">hourglass_bottom</span>
                <span className="font-mono text-[10px] text-[#f0dbff] font-bold">23h 48m</span>
              </div>
              <span className="font-mono text-[9px] text-[#e3bebe]/70 mt-1 uppercase">Reset Sync</span>
            </div>
          </div>
        </div>
      </div>

      {/* Expiring Sparks Carousel Section */}
      <div className="flex flex-col pt-2 pb-3">
        <div className="flex items-center justify-between px-4 mb-2">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[18px] text-[#ff5167]">local_fire_department</span>
            <h2 className="font-headline text-[18px] font-bold tracking-tight text-white">New Matches</h2>
          </div>
          <span className="font-mono text-[10px] uppercase px-2 py-0.5 rounded-full bg-[#ff5167]/15 text-[#ff5167] font-semibold border border-[#ff5167]/30">
            Expiring in 24h
          </span>
        </div>

        {/* Horizontal Scroll Deck */}
        <div className="flex gap-3.5 overflow-x-auto px-4 pb-2 pt-1 no-scrollbar">
          {matches.slice(0, 6).map((match) => (
            <div
              key={match.id}
              onClick={() => onOpenChat(match)}
              className="flex flex-col items-center shrink-0 w-24 group cursor-pointer"
            >
              <div
                className={`relative p-1 rounded-full bg-gradient-to-tr ${getAvatarRingClass(
                  match.role
                )} transition-transform duration-300 group-hover:scale-105`}
              >
                <div className="relative w-16 h-16 rounded-full overflow-hidden bg-[#0d0e15]">
                  <img
                    alt={match.name}
                    className="w-full h-full object-cover"
                    src={match.photo}
                  />
                </div>
                {match.statusBadge && (
                  <span className="absolute -bottom-1 inset-x-0 mx-auto w-max px-1.5 py-0.5 rounded-full bg-[#caf300] text-[#12131a] font-mono text-[9px] font-bold uppercase shadow-[0_2px_8px_rgba(202,243,0,0.5)]">
                    {match.statusBadge}
                  </span>
                )}
              </div>
              <span className="font-headline text-[13px] text-white font-bold mt-2 truncate w-full text-center">
                {match.name}
              </span>
              <span className="font-mono text-[10px] text-amber-300 uppercase tracking-wider truncate w-full text-center">
                {match.role}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Dynamic Icebreaker Generator Pill */}
      <div className="px-4 py-1">
        <div className="relative group overflow-hidden rounded-xl bg-gradient-to-r from-[#292931] via-[#1e1f27] to-[#292931] p-3 shadow-md border border-white/5 transition-all duration-300 hover:shadow-[0_0_20px_rgba(202,243,0,0.15)]">
          <div className="flex items-center justify-between gap-3">
            <div
              onClick={handleCopyIcebreaker}
              className="flex items-start gap-2 min-w-0 cursor-pointer flex-1"
              title="Click to copy icebreaker"
            >
              <span className="text-[18px] leading-none select-none">🎲</span>
              <div className="flex flex-col min-w-0">
                <span className="font-mono text-[10px] uppercase tracking-wider text-[#caf300] font-bold flex items-center gap-1">
                  Roll an Icebreaker
                  <span className="material-symbols-outlined text-[12px] opacity-75">autorenew</span>
                </span>
                <p className="font-body text-[13px] text-[#e3e1ec] truncate font-medium">
                  &ldquo;{currentIcebreaker}&rdquo;
                </p>
                {copiedNotification && (
                  <span className="font-mono text-[9px] text-[#caf300] font-bold">✓ Copied to clipboard!</span>
                )}
              </div>
            </div>

            <button
              onClick={handleRollIcebreaker}
              className="shrink-0 px-2.5 py-1.5 rounded-lg bg-[#383941] hover:bg-[#4a4b55] text-white font-mono text-[11px] font-semibold transition-colors flex items-center gap-1 active:scale-95 border border-white/10"
              type="button"
            >
              <span className="material-symbols-outlined text-[14px]">casino</span>
              <span>SPARK</span>
            </button>
          </div>
        </div>
      </div>

      {/* Interactive Filter Chips Row */}
      <div className="flex gap-2 overflow-x-auto px-4 py-2.5 no-scrollbar">
        {[
          { key: 'all', label: `All (${matches.length})` },
          { key: 'unread', label: 'Unread (3)', icon: '⚡', iconColor: 'text-[#ff5167]' },
          { key: 'speakers', label: 'Speakers (2)', icon: '★', iconColor: 'text-amber-400' },
          { key: 'mentors', label: 'Mentors (2)', icon: '🔮', iconColor: 'text-[#ddb7ff]' },
          { key: 'recruiters', label: 'Recruiters (1)', icon: '💼', iconColor: 'text-emerald-400' },
          { key: 'nearby', label: 'Nearby (3)', icon: '📍', iconColor: 'text-[#caf300]' },
        ].map((chip) => {
          const isActive = selectedFilter === chip.key;
          return (
            <button
              key={chip.key}
              onClick={() => setSelectedFilter(chip.key)}
              className={`shrink-0 px-3 py-1.5 rounded-full font-mono text-[11px] font-bold tracking-wider uppercase transition-all flex items-center gap-1 ${
                isActive
                  ? 'bg-[#caf300] text-[#12131a] shadow-[0_0_12px_rgba(202,243,0,0.3)]'
                  : 'bg-[#1e1f27] hover:bg-[#383941] text-[#e3e1ec] border border-white/5'
              }`}
              type="button"
            >
              {chip.icon && <span className={chip.iconColor}>{chip.icon}</span>}
              <span>{chip.label}</span>
            </button>
          );
        })}
      </div>

      {/* Active Conversations Feed */}
      <div className="flex flex-col px-4 gap-2.5 pt-1 pb-8">
        {filteredMatches.map((match) => (
          <div
            key={match.id}
            onClick={() => onOpenChat(match)}
            className="relative overflow-hidden rounded-xl bg-[#292931] p-3.5 transition-all duration-200 hover:bg-[#383941] active:scale-[0.99] shadow-md flex items-center gap-3 group cursor-pointer border border-white/5"
          >
            {/* Role Accent Left Bar */}
            <div className={`absolute left-0 top-0 bottom-0 w-1 ${getBorderColorForRole(match.role)}`} />

            {/* Avatar with Glow */}
            <div className="relative shrink-0 ml-1">
              <div className="w-13 h-13 rounded-xl overflow-hidden bg-[#0d0e15] p-0.5 shadow-md">
                <img
                  alt={match.name}
                  className="w-12 h-12 rounded-lg object-cover"
                  src={match.photo}
                />
              </div>
              {match.unread && (
                <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-[#ff5167] shadow-[0_0_10px_#ff5167] flex items-center justify-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
                </span>
              )}
            </div>

            {/* Content */}
            <div className="flex flex-col min-w-0 flex-1">
              <div className="flex items-center justify-between gap-1 mb-1">
                <div className="flex items-center gap-1.5 min-w-0">
                  <h3 className="font-headline text-[15px] font-bold text-white truncate">
                    {match.name}
                  </h3>
                  <span
                    className={`px-1.5 py-0.5 rounded font-mono text-[9px] font-bold tracking-wider uppercase shrink-0 ${getRoleBadgeClasses(
                      match.role
                    )}`}
                  >
                    {match.role}
                  </span>
                  <span className="px-1.5 py-0.5 rounded bg-[#0d0e15] text-[#caf300] font-mono text-[9px] font-bold uppercase tracking-wider shrink-0 flex items-center gap-0.5 border border-white/5">
                    <span className="material-symbols-outlined text-[10px]">near_me</span>
                    {match.stageName.split('/')[0].trim()}
                  </span>
                </div>
                <span className="font-mono text-[11px] text-[#ffb3b5] font-bold shrink-0">
                  {match.lastMessage?.time || 'Now'}
                </span>
              </div>

              <p className="font-body text-[14px] text-white truncate">
                {match.lastMessage?.isYou ? (
                  <span className="text-[#e3bebe] flex items-center gap-1">
                    <span className="material-symbols-outlined text-[13px] text-[#caf300]">done_all</span>
                    You: {match.lastMessage.text}
                  </span>
                ) : (
                  <span>
                    <span className="font-semibold text-white">{match.name.split(' ')[0]}: </span>
                    <span className="text-[#e3e1ec]/85">{match.lastMessage?.text || 'Sent you a high-voltage spark!'}</span>
                  </span>
                )}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
