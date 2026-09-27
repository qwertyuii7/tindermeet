import React from 'react';
import { Attendee } from '../types';

interface AttendeeDetailModalProps {
  attendee: Attendee | null;
  onClose: () => void;
  onConnect: (attendee: Attendee) => void;
  onPass: (attendee: Attendee) => void;
  onSpark: (attendee: Attendee) => void;
}

export const AttendeeDetailModal: React.FC<AttendeeDetailModalProps> = ({
  attendee,
  onClose,
  onConnect,
  onPass,
  onSpark,
}) => {
  if (!attendee) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex flex-col justify-end sm:justify-center items-center p-0 sm:p-4">
      <div className="w-full max-w-md bg-[#1e1f27] rounded-t-3xl sm:rounded-2xl max-h-[90vh] overflow-y-auto border border-white/10 shadow-2xl flex flex-col relative animate-slide-up">
        {/* Sticky Header with Close */}
        <div className="sticky top-0 z-20 flex items-center justify-between p-4 bg-[#0d0e15]/80 backdrop-blur-md border-b border-white/5">
          <div className="flex items-center gap-2">
            <span className="font-mono text-[10px] uppercase tracking-wider text-[#caf300] font-bold">
              Collector Card Inspection
            </span>
            <span className="font-mono text-[10px] text-[#e3bebe]">{attendee.serial}</span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#292931] flex items-center justify-center text-[#e3bebe] hover:text-white"
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Hero Image */}
        <div className="relative w-full aspect-[4/3] bg-[#0d0e15] overflow-hidden">
          <img
            alt={attendee.name}
            src={attendee.photo}
            className="w-full h-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1e1f27] via-transparent to-transparent"></div>

          <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#0d0e15]/80 backdrop-blur-md border border-[#caf300]/30 font-mono text-[10px] text-[#caf300] font-bold">
            ★ {attendee.roleSubtitle}
          </div>

          <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-headline text-[24px] font-bold text-white">
                  {attendee.name}, {attendee.age}
                </h2>
                <span
                  className="material-symbols-outlined text-[#caf300] text-[20px]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  verified
                </span>
              </div>
              <p className="font-body text-[14px] text-[#ffb3b5]">
                {attendee.title} @ {attendee.company}
              </p>
            </div>
            <div className="flex flex-col items-end">
              <span className="font-mono text-[10px] text-[#e3bebe] uppercase">Match Score</span>
              <span className="font-headline text-[20px] font-bold text-[#caf300]">
                {attendee.matchScore}%
              </span>
            </div>
          </div>
        </div>

        {/* Profile Content */}
        <div className="p-4 space-y-4">
          {/* Radar Location Info */}
          <div className="bg-[#292931] p-3 rounded-xl flex items-center justify-between border border-white/5">
            <div className="flex items-center gap-2 min-w-0">
              <span className="material-symbols-outlined text-[#ff5167] text-[18px]">near_me</span>
              <div className="flex flex-col min-w-0">
                <span className="font-mono text-[9px] uppercase text-[#e3bebe]">Current Radar Presence</span>
                <span className="font-headline text-[13px] text-white font-bold truncate">
                  {attendee.location}
                </span>
              </div>
            </div>
            <span className="font-mono text-[11px] text-[#caf300] font-bold shrink-0">
              {attendee.distance}
            </span>
          </div>

          {/* Wanted / Goals */}
          <div className="bg-[#caf300]/10 p-3 rounded-xl border border-[#caf300]/20">
            <span className="font-mono text-[10px] uppercase tracking-wider text-[#caf300] font-bold block mb-1">
              Summit Objective
            </span>
            <p className="font-body text-[14px] text-white font-medium">
              {attendee.wanted}
            </p>
          </div>

          {/* Full Bio */}
          <div>
            <span className="font-mono text-[10px] uppercase tracking-wider text-[#e3bebe] font-semibold block mb-1">
              About & Background
            </span>
            <p className="font-body text-[14px] text-[#e3e1ec]/90 leading-relaxed">
              {attendee.bio}
            </p>
          </div>

          {/* Mutual Alignment Topic */}
          <div className="bg-[#12131a] p-3 rounded-xl border border-white/5">
            <span className="font-mono text-[10px] uppercase tracking-wider text-[#ddb7ff] font-bold block mb-0.5">
              Predicted Synergy Zone
            </span>
            <p className="font-body text-[14px] text-white">
              &ldquo;{attendee.synergyTopic}&rdquo;
            </p>
          </div>

          {/* Tags */}
          <div>
            <span className="font-mono text-[10px] uppercase tracking-wider text-[#e3bebe] font-semibold block mb-1.5">
              Expertise & Domains
            </span>
            <div className="flex flex-wrap gap-1.5">
              {attendee.tags.map((t) => (
                <span
                  key={t}
                  className="px-2.5 py-1 rounded-full bg-[#292931] text-[#e3e1ec] font-mono text-[11px] border border-white/5"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Action Dock */}
          <div className="pt-2 flex items-center justify-between gap-3 border-t border-white/5">
            <button
              onClick={() => {
                onClose();
                onPass(attendee);
              }}
              className="flex-1 py-3 rounded-xl bg-[#292931] hover:bg-[#34343c] text-[#ff5167] font-mono text-[11px] font-bold uppercase tracking-wider flex items-center justify-center gap-1 transition-colors"
              type="button"
            >
              <span className="material-symbols-outlined text-[16px]">close</span>
              <span>Pass</span>
            </button>

            <button
              onClick={() => {
                onClose();
                onSpark(attendee);
              }}
              className="px-4 py-3 rounded-xl bg-[#34343c] hover:bg-[#383941] text-[#ddb7ff] shadow-[0_0_16px_rgba(183,109,255,0.4)] font-mono text-[11px] font-bold uppercase tracking-wider flex items-center justify-center gap-1 border border-[#b76dff]/30 transition-colors"
              type="button"
            >
              <span className="material-symbols-outlined text-[18px]">bolt</span>
              <span>Spark</span>
            </button>

            <button
              onClick={() => {
                onClose();
                onConnect(attendee);
              }}
              className="flex-1 py-3 rounded-xl bg-[#caf300] hover:bg-[#b0d500] text-[#12131a] font-mono text-[12px] font-bold uppercase tracking-wider flex items-center justify-center gap-1 shadow-[0_0_20px_rgba(202,243,0,0.3)] transition-colors"
              type="button"
            >
              <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                favorite
              </span>
              <span>Connect</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
