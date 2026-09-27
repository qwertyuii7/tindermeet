import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Attendee } from '../types';

interface DeckViewProps {
  attendees: Attendee[];
  onConnect: (attendee: Attendee) => void;
  onPass: (attendee: Attendee) => void;
  onSuperSpark: (attendee: Attendee) => void;
  onInspect: (attendee: Attendee) => void;
  onRewind: () => void;
  canRewind: boolean;
  boostSwipes: number;
  onUseBoost: () => void;
}

export const DeckView: React.FC<DeckViewProps> = ({
  attendees,
  onConnect,
  onPass,
  onSuperSpark,
  onInspect,
  onRewind,
  canRewind,
  boostSwipes,
  onUseBoost,
}) => {
  const currentAttendee = attendees[0] || null;
  const nextAttendee = attendees[1] || null;
  const thirdAttendee = attendees[2] || null;

  // Drag physics state
  const [dragOffset, setDragOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [stampType, setStampType] = useState<'connect' | 'pass' | 'spark' | null>(null);
  const [stampOpacity, setStampOpacity] = useState(0);
  const [flyOutDirection, setFlyOutDirection] = useState<'left' | 'right' | 'up' | null>(null);
  const startPos = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  // Handle pointer down
  const handlePointerDown = (e: React.PointerEvent) => {
    if (!currentAttendee || flyOutDirection) return;
    setIsDragging(true);
    startPos.current = { x: e.clientX, y: e.clientY };
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
  };

  // Handle pointer move
  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging || !currentAttendee || flyOutDirection) return;
    const dx = e.clientX - startPos.current.x;
    const dy = e.clientY - startPos.current.y;
    setDragOffset({ x: dx, y: dy });

    if (dy < -60 && Math.abs(dx) < 60) {
      setStampType('spark');
      setStampOpacity(Math.min(1, Math.abs(dy) / 120));
    } else if (dx > 25) {
      setStampType('connect');
      setStampOpacity(Math.min(1, dx / 100));
    } else if (dx < -25) {
      setStampType('pass');
      setStampOpacity(Math.min(1, Math.abs(dx) / 100));
    } else {
      setStampType(null);
      setStampOpacity(0);
    }
  };

  // Handle pointer up
  const handlePointerUp = () => {
    if (!isDragging || !currentAttendee || flyOutDirection) return;
    setIsDragging(false);

    const { x, y } = dragOffset;
    const triggerThreshold = 100;

    if (y < -120 && Math.abs(x) < 80) {
      // Super Spark
      triggerFlyOut('up', () => onSuperSpark(currentAttendee));
    } else if (x > triggerThreshold) {
      // Connect
      triggerFlyOut('right', () => onConnect(currentAttendee));
    } else if (x < -triggerThreshold) {
      // Pass
      triggerFlyOut('left', () => onPass(currentAttendee));
    } else {
      // Return spring
      setDragOffset({ x: 0, y: 0 });
      setStampType(null);
      setStampOpacity(0);
    }
  };

  const triggerFlyOut = (direction: 'left' | 'right' | 'up', callback: () => void) => {
    setFlyOutDirection(direction);
    setTimeout(() => {
      callback();
      setFlyOutDirection(null);
      setDragOffset({ x: 0, y: 0 });
      setStampType(null);
      setStampOpacity(0);
    }, 320);
  };

  const handleManualPass = useCallback(() => {
    if (!currentAttendee || flyOutDirection) return;
    setStampType('pass');
    setStampOpacity(1);
    triggerFlyOut('left', () => onPass(currentAttendee));
  }, [currentAttendee, flyOutDirection, onPass]);

  const handleManualConnect = useCallback(() => {
    if (!currentAttendee || flyOutDirection) return;
    setStampType('connect');
    setStampOpacity(1);
    triggerFlyOut('right', () => onConnect(currentAttendee));
  }, [currentAttendee, flyOutDirection, onConnect]);

  const handleManualSpark = useCallback(() => {
    if (!currentAttendee || flyOutDirection) return;
    setStampType('spark');
    setStampOpacity(1);
    triggerFlyOut('up', () => onSuperSpark(currentAttendee));
  }, [currentAttendee, flyOutDirection, onSuperSpark]);

  // Keyboard navigation support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!currentAttendee || flyOutDirection) return;
      if (e.key === 'ArrowRight') {
        handleManualConnect();
      } else if (e.key === 'ArrowLeft') {
        handleManualPass();
      } else if (e.key === 'ArrowUp') {
        handleManualSpark();
      } else if (e.key === ' ' || e.key === 'Enter') {
        onInspect(currentAttendee);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentAttendee, flyOutDirection, handleManualConnect, handleManualPass, handleManualSpark, onInspect]);

  const getCardTransformStyle = () => {
    if (flyOutDirection === 'right') {
      return {
        transform: 'translateX(500px) rotate(24deg)',
        transition: 'transform 0.32s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        opacity: 0.2,
      };
    }
    if (flyOutDirection === 'left') {
      return {
        transform: 'translateX(-500px) rotate(-24deg)',
        transition: 'transform 0.32s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        opacity: 0.2,
      };
    }
    if (flyOutDirection === 'up') {
      return {
        transform: 'translateY(-550px) scale(1.05)',
        transition: 'transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)',
        opacity: 0.1,
      };
    }
    if (isDragging) {
      const rotate = dragOffset.x * 0.08;
      return {
        transform: `translate3d(${dragOffset.x}px, ${dragOffset.y}px, 0) rotate(${rotate}deg)`,
        transition: 'none',
      };
    }
    return {
      transform: 'translate3d(0, 0, 0) rotate(0deg)',
      transition: 'transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
    };
  };

  const getRoleBadgeClasses = (role: string) => {
    switch (role) {
      case 'SPEAKER':
        return 'bg-[#c59a00]/90 text-[#1a1400] shadow-[0_4px_16px_rgba(202,243,0,0.2)] font-bold';
      case 'MENTOR':
        return 'bg-[#b76dff]/90 text-[#2c0051] shadow-[0_4px_16px_rgba(183,109,255,0.3)] font-bold';
      case 'RECRUITER':
        return 'bg-[#00d6b2]/90 text-[#002f26] shadow-[0_4px_16px_rgba(0,214,178,0.3)] font-bold';
      case 'ORGANIZER':
        return 'bg-[#ff5167]/90 text-white shadow-[0_4px_16px_rgba(255,81,103,0.3)] font-bold';
      default:
        return 'bg-[#34343c]/90 text-white font-medium';
    }
  };

  return (
    <div className="flex flex-col w-full relative select-none overflow-hidden max-w-md mx-auto pt-2 pb-24">
      {/* Subtle Ambient Atmospheric Glow Behind Arena */}
      <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-80 h-80 rounded-full bg-[#ff5167]/10 blur-[100px] pointer-events-none"></div>
      <div className="absolute top-48 -right-20 w-64 h-64 rounded-full bg-[#caf300]/10 blur-[90px] pointer-events-none"></div>

      {/* Live Pulse Session Boost / Proximity Bar */}
      <div className="px-4 pt-1 pb-3 w-full">
        <div 
          onClick={onUseBoost}
          className="flex items-center justify-between gap-2 bg-[#292931] px-4 py-2 rounded-full shadow-md border border-white/5 cursor-pointer hover:bg-[#34343c] transition-colors"
        >
          <div className="flex items-center gap-2 min-w-0">
            <span className="text-[#caf300] text-[14px] animate-pulse">⚡</span>
            <span className="font-mono text-[11px] text-[#e3e1ec] truncate">
              <span className="text-[#caf300] font-semibold">{boostSwipes} Boost Swipes</span> remaining • 2 mutuals nearby
            </span>
          </div>
          <div className="flex items-center gap-1 shrink-0 bg-[#0d0e15] px-2 py-0.5 rounded-full border border-[#caf300]/20">
            <span className="w-1.5 h-1.5 rounded-full bg-[#caf300] animate-ping"></span>
            <span className="font-mono text-[10px] text-[#caf300] uppercase font-bold tracking-wider">Live</span>
          </div>
        </div>
      </div>

      {/* Main Card Arena Stage */}
      <div className="relative w-full px-4 flex items-center justify-center pt-1 pb-4 min-h-[500px]">
        {currentAttendee ? (
          <>
            {/* Depth Underlay Card 2 (Bottom Stack) */}
            {thirdAttendee && (
              <div className="absolute w-[calc(100%-2.5rem)] max-w-sm aspect-[3/4.4] rounded-2xl bg-[#0d0e15] translate-y-5 scale-[0.91] shadow-2xl opacity-40 pointer-events-none border border-white/5"></div>
            )}

            {/* Depth Underlay Card 1 (Mid Stack) */}
            {nextAttendee && (
              <div className="absolute w-[calc(100%-2rem)] max-w-sm aspect-[3/4.4] rounded-2xl bg-[#1a1b22] translate-y-2.5 scale-[0.96] shadow-xl opacity-75 pointer-events-none flex flex-col justify-end p-4 border border-white/5">
                <div className="w-24 h-2 bg-[#34343c] rounded-full mb-1"></div>
                <div className="w-40 h-2 bg-[#34343c]/50 rounded-full"></div>
              </div>
            )}

            {/* Active Holographic Attendee Discovery Card */}
            <div
              style={getCardTransformStyle()}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              className="relative w-full max-w-sm aspect-[3/4.4] rounded-2xl bg-[#1e1f27] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.85)] flex flex-col justify-between cursor-grab active:cursor-grabbing border border-white/10 touch-none z-20"
            >
              {/* Holographic Card Foil Rim Accents */}
              <div className="absolute inset-0 bg-gradient-to-tr from-[#ff5167]/20 via-transparent to-[#caf300]/25 pointer-events-none mix-blend-screen z-20"></div>
              <div className="absolute -top-32 -left-32 w-64 h-64 bg-gradient-to-br from-[#b76dff]/30 to-transparent rounded-full blur-2xl pointer-events-none z-20"></div>

              {/* Dynamic Action Stamp: CONNECT */}
              {stampType === 'connect' && (
                <div
                  style={{ opacity: stampOpacity }}
                  className="absolute top-4 right-4 z-30 transform rotate-12 bg-[#caf300] text-[#12131a] px-4 py-1.5 rounded-lg shadow-[0_0_24px_rgba(202,243,0,0.6)] font-headline text-[18px] uppercase tracking-wider font-bold flex items-center gap-1 pointer-events-none"
                >
                  <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                    bolt
                  </span>
                  <span>CONNECT</span>
                </div>
              )}

              {/* Dynamic Action Stamp: PASS */}
              {stampType === 'pass' && (
                <div
                  style={{ opacity: stampOpacity }}
                  className="absolute top-4 left-4 z-30 transform -rotate-12 bg-[#ff5167] text-[#5b0015] px-4 py-1.5 rounded-lg shadow-[0_0_24px_rgba(255,81,103,0.6)] font-headline text-[18px] uppercase tracking-wider font-bold flex items-center gap-1 pointer-events-none"
                >
                  <span className="material-symbols-outlined text-[20px]">close</span>
                  <span>PASS</span>
                </div>
              )}

              {/* Dynamic Action Stamp: SUPER SPARK */}
              {stampType === 'spark' && (
                <div
                  style={{ opacity: stampOpacity }}
                  className="absolute top-1/3 inset-x-0 mx-auto w-max z-30 bg-[#b76dff] text-[#2c0051] px-5 py-2 rounded-xl shadow-[0_0_30px_rgba(183,109,255,0.7)] font-headline text-[19px] uppercase tracking-wider font-bold flex items-center gap-1.5 pointer-events-none"
                >
                  <span className="material-symbols-outlined text-[22px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                    bolt
                  </span>
                  <span>SUPER SPARK</span>
                </div>
              )}

              {/* Top 62%: Attendee Portrait with Cyber-Tactile Grading & Scrim */}
              <div className="relative w-full h-[62%] shrink-0 overflow-hidden bg-[#0d0e15]">
                <img
                  alt={currentAttendee.name}
                  className="w-full h-full object-cover object-top scale-105 pointer-events-none"
                  src={currentAttendee.photo}
                  referrerPolicy="no-referrer"
                />
                {/* Top Stage Edge Vignette & Header Badges */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#0d0e15]/85 via-transparent to-[#1e1f27] z-10 flex flex-col justify-between p-4">
                  {/* Top Row: Venue Radar Ping & Collectible Rarity Index */}
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0d0e15]/85 backdrop-blur-md shadow-sm border border-white/10">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#caf300] opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-[#caf300]"></span>
                      </span>
                      <span className="font-mono text-[10px] text-[#caf300] font-medium tracking-wide truncate max-w-[190px]">
                        {currentAttendee.location}
                      </span>
                    </div>

                    {/* Card Mint & Match Score */}
                    <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#0d0e15]/90 backdrop-blur-md border border-[#ff5167]/30">
                      <span className="font-mono text-[10px] text-[#ffb3b5]">MATCH</span>
                      <span className="font-mono text-[11px] text-white font-bold">{currentAttendee.matchScore}%</span>
                    </div>
                  </div>

                  {/* Mid-Bottom Foil Badge */}
                  <div className="flex flex-col gap-1 items-start">
                    <div className={`flex items-center gap-1.5 px-3 py-1 rounded-lg backdrop-blur-md ${getRoleBadgeClasses(currentAttendee.role)}`}>
                      <span className="text-[12px] leading-none">★</span>
                      <span className="font-mono text-[10px] uppercase tracking-wider font-bold">
                        {currentAttendee.roleSubtitle}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom 38%: Stat Block & Deep Profile Deck */}
              <div className="relative w-full h-[38%] shrink-0 p-4 pt-0 flex flex-col justify-between z-10 bg-[#1e1f27]">
                {/* Attendee Identity & Role Block */}
                <div className="flex flex-col gap-1">
                  <div className="flex items-baseline justify-between gap-2">
                    <div className="flex items-center gap-1.5 min-w-0">
                      <h2 className="font-headline text-[22px] font-bold text-white truncate">
                        {currentAttendee.name}, {currentAttendee.age}
                      </h2>
                      <span
                        className="material-symbols-outlined text-[#caf300] text-[19px] shrink-0"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        verified
                      </span>
                    </div>
                    <span className="font-mono text-[10px] text-[#e3bebe] shrink-0 uppercase tracking-widest">
                      {currentAttendee.serial}
                    </span>
                  </div>
                  <p className="font-body text-[13px] text-[#ffb3b5] font-medium truncate">
                    {currentAttendee.title} @ {currentAttendee.company}
                  </p>
                </div>

                {/* Looking For Banner */}
                <div className="w-full bg-[#caf300]/15 px-3 py-1 rounded-lg flex items-center gap-1.5 border border-[#caf300]/20">
                  <span className="font-mono text-[10px] text-[#caf300] font-bold shrink-0">WANTED:</span>
                  <span className="font-body text-[12px] text-[#e3e1ec] font-medium truncate">
                    {currentAttendee.wanted}
                  </span>
                </div>

                {/* Bio Snippet */}
                <p className="font-body text-[13px] text-[#e3e1ec]/85 line-clamp-2 leading-tight">
                  {currentAttendee.bio}
                </p>

                {/* Expertise Tags */}
                <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5 no-scrollbar">
                  {currentAttendee.tags.map((tag) => (
                    <span
                      key={tag}
                      className="shrink-0 px-2.5 py-0.5 rounded-full bg-[#292931] text-[#e3e1ec] font-mono text-[10px] border border-white/5"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </>
        ) : (
          /* Empty Deck State */
          <div className="w-full max-w-sm aspect-[3/4.4] rounded-2xl bg-[#1e1f27] p-8 flex flex-col items-center justify-center text-center border border-white/5 shadow-2xl">
            <div className="w-20 h-20 rounded-full bg-[#292931] flex items-center justify-center mb-4 text-[#caf300] shadow-[0_0_24px_rgba(202,243,0,0.2)]">
              <span className="material-symbols-outlined text-[36px]">style</span>
            </div>
            <h3 className="font-headline text-[22px] font-bold text-white mb-2">Deck Complete</h3>
            <p className="font-body text-[14px] text-[#e3bebe] mb-6 max-w-xs">
              You&apos;ve evaluated every attendee in this radar sector. Reset the deck to discover more summit builders or check your matches!
            </p>
            <button
              onClick={onRewind}
              className="px-6 py-3 rounded-xl bg-[#caf300] text-[#12131a] font-mono text-[12px] uppercase font-bold tracking-wider flex items-center gap-2 hover:bg-[#b0d500] transition-colors shadow-[0_0_20px_rgba(202,243,0,0.3)]"
              type="button"
            >
              <span className="material-symbols-outlined text-[18px]">replay</span>
              <span>Re-Shuffle Deck</span>
            </button>
          </div>
        )}
      </div>

      {/* Tactile Floating Interaction Control Cluster */}
      <div className="w-full px-4 pb-2 flex items-center justify-center">
        <div className="flex items-center justify-between w-full max-w-sm px-2 py-1.5 bg-[#1a1b22] rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.7)] border border-white/10">
          {/* 1. Rewind / Undo */}
          <button
            aria-label="Undo Last Card"
            disabled={!canRewind}
            onClick={onRewind}
            className={`w-12 h-12 rounded-full bg-[#1e1f27] flex items-center justify-center text-[#caf300] transition-all active:scale-90 border border-white/5 ${
              canRewind ? 'hover:bg-[#383941] cursor-pointer' : 'opacity-30 cursor-not-allowed'
            }`}
            type="button"
          >
            <span className="material-symbols-outlined text-[20px]">undo</span>
          </button>

          {/* 2. Dislike / Pass (Electric Crimson) */}
          <button
            aria-label="Pass Attendee"
            disabled={!currentAttendee}
            onClick={handleManualPass}
            className="w-14 h-14 rounded-full bg-[#1e1f27] hover:bg-[#383941] flex items-center justify-center text-[#ff5167] shadow-[inset_0_0_12px_rgba(255,81,103,0.15)] transition-transform active:scale-90 border border-[#ff5167]/30"
            type="button"
          >
            <span className="material-symbols-outlined text-[28px] font-bold">close</span>
          </button>

          {/* 3. Super-Connect / Spark (Electric Center Elevated Accent) */}
          <button
            aria-label="Instant Super Spark"
            disabled={!currentAttendee}
            onClick={handleManualSpark}
            className="w-16 h-16 rounded-full bg-[#34343c] hover:bg-[#383941] flex items-center justify-center text-[#ddb7ff] shadow-[0_0_24px_rgba(183,109,255,0.45)] -translate-y-2.5 transition-transform active:scale-95 border border-[#b76dff]/40"
            type="button"
          >
            <span className="material-symbols-outlined text-[32px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              bolt
            </span>
          </button>

          {/* 4. Connect / Match (Acid Lime Heart) */}
          <button
            aria-label="Connect with Attendee"
            disabled={!currentAttendee}
            onClick={handleManualConnect}
            className="w-14 h-14 rounded-full bg-[#caf300] hover:bg-[#b0d500] text-[#12131a] flex items-center justify-center shadow-[0_0_20px_rgba(202,243,0,0.4)] transition-transform active:scale-90"
            type="button"
          >
            <span className="material-symbols-outlined text-[26px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              favorite
            </span>
          </button>

          {/* 5. Profile Deep Dive / Full Card Sheet */}
          <button
            aria-label="Inspect Full Profile"
            disabled={!currentAttendee}
            onClick={() => currentAttendee && onInspect(currentAttendee)}
            className="w-12 h-12 rounded-full bg-[#1e1f27] hover:bg-[#383941] flex items-center justify-center text-[#e3bebe] transition-transform active:scale-90 border border-white/5"
            type="button"
          >
            <span className="material-symbols-outlined text-[20px]">expand_less</span>
          </button>
        </div>
      </div>
    </div>
  );
};
