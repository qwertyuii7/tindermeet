import React, { useState } from 'react';
import { Attendee, UserProfile } from '../types';
import { VENUE_ZONES } from '../data/mockData';

interface VenueRadarViewProps {
  attendees: Attendee[];
  userProfile: UserProfile;
  routedAttendee?: Attendee | null;
  onOpenChat: (attendee: Attendee) => void;
  onClearRoute: () => void;
}

export const VenueRadarView: React.FC<VenueRadarViewProps> = ({
  attendees,
  userProfile,
  routedAttendee,
  onOpenChat,
  onClearRoute,
}) => {
  const [selectedAttendee, setSelectedAttendee] = useState<Attendee | null>(
    routedAttendee || attendees[0] || null
  );
  const [activeZoneFilter, setActiveZoneFilter] = useState<string>('all');
  const [radarRange, setRadarRange] = useState<'near' | 'mid' | 'all'>('all');

  // Elena's coordinates on the floor plan
  const userCoords = { x: 62, y: 58 };

  const getPinColor = (role: string) => {
    switch (role) {
      case 'SPEAKER':
        return 'bg-amber-400 text-black border-amber-300';
      case 'MENTOR':
        return 'bg-[#b76dff] text-white border-[#ddb7ff]';
      case 'RECRUITER':
        return 'bg-emerald-400 text-black border-emerald-300';
      case 'ORGANIZER':
        return 'bg-[#ff5167] text-white border-[#ffb3b5]';
      default:
        return 'bg-slate-400 text-black border-slate-300';
    }
  };

  return (
    <div className="flex flex-col w-full text-[#e3e1ec] max-w-md mx-auto pt-2 pb-24 px-4">
      {/* Top Radar Status Strip */}
      <div className="flex items-center justify-between mb-3 bg-[#1e1f27] p-3 rounded-xl border border-white/5 shadow-md">
        <div className="flex items-center gap-2">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#caf300] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-[#caf300]"></span>
          </span>
          <div className="flex flex-col">
            <span className="font-mono text-[10px] uppercase text-[#caf300] font-bold tracking-wider">
              Summit Mesh Radar Active
            </span>
            <span className="font-body text-[12px] text-[#e3bebe] truncate max-w-[200px]">
              You are at <span className="text-white font-semibold">{userProfile.presenceZone}</span>
            </span>
          </div>
        </div>

        {/* Range Selector */}
        <div className="flex items-center bg-[#0d0e15] rounded-lg p-0.5 border border-white/5">
          {(['near', 'all'] as const).map((rng) => (
            <button
              key={rng}
              onClick={() => setRadarRange(rng)}
              className={`px-2 py-0.5 rounded font-mono text-[10px] uppercase font-bold transition-all ${
                radarRange === rng ? 'bg-[#caf300] text-[#12131a]' : 'text-[#e3bebe]'
              }`}
              type="button"
            >
              {rng === 'near' ? '<50m' : 'Full'}
            </button>
          ))}
        </div>
      </div>

      {/* Main Interactive Radar Map Arena */}
      <div className="relative w-full aspect-square rounded-2xl bg-[#0d0e15] overflow-hidden border border-[#caf300]/20 shadow-[0_0_40px_rgba(0,0,0,0.9)] mb-4">
        {/* Radar Circular Grid & Concentric Rings */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[85%] h-[85%] rounded-full border border-dashed border-[#caf300]/20"></div>
          <div className="w-[60%] h-[60%] rounded-full border border-[#caf300]/25"></div>
          <div className="w-[35%] h-[35%] rounded-full border border-dashed border-[#caf300]/30"></div>
          <div className="w-[10%] h-[10%] rounded-full border border-[#caf300]/40"></div>

          {/* Crosshairs */}
          <div className="absolute inset-x-0 h-px bg-white/5"></div>
          <div className="absolute inset-y-0 w-px bg-white/5"></div>

          {/* Sweeping Radar Beam */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-full h-full animate-radar-sweep">
              <div
                className="w-1/2 h-1/2 origin-bottom-right"
                style={{
                  background: 'conic-gradient(from 180deg at 100% 100%, rgba(202,243,0,0.18) 0deg, rgba(202,243,0,0) 60deg)',
                }}
              />
            </div>
          </div>
        </div>

        {/* Venue Floorplan Zones Backdrops */}
        {VENUE_ZONES.map((zone) => (
          <div
            key={zone.id}
            style={{ left: `${zone.coordinates.x}%`, top: `${zone.coordinates.y}%` }}
            className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none text-center"
          >
            <span className="font-mono text-[9px] uppercase tracking-wider text-white/30 font-bold bg-[#1e1f27]/40 px-1.5 py-0.5 rounded border border-white/5">
              {zone.shortCode}
            </span>
          </div>
        ))}

        {/* Vector Route Line (if routed to attendee) */}
        {selectedAttendee && (
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
            <line
              x1={`${userCoords.x}%`}
              y1={`${userCoords.y}%`}
              x2={`${selectedAttendee.coordinates.x}%`}
              y2={`${selectedAttendee.coordinates.y}%`}
              stroke="#caf300"
              strokeWidth="2"
              strokeDasharray="4 4"
              className="animate-pulse"
            />
          </svg>
        )}

        {/* Elena Vance (You) Pin Beacon */}
        <div
          style={{ left: `${userCoords.x}%`, top: `${userCoords.y}%` }}
          className="absolute -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center"
        >
          <div className="relative">
            <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-[#caf300] shadow-[0_0_15px_#caf300]">
              <img alt="You" src={userProfile.photo} className="w-full h-full object-cover" />
            </div>
            <span className="absolute -bottom-1 -right-1 px-1 rounded-full bg-[#caf300] text-[#12131a] font-mono text-[8px] font-bold">
              YOU
            </span>
          </div>
        </div>

        {/* Attendee Pins */}
        {attendees.map((att) => {
          const isSelected = selectedAttendee?.id === att.id;
          return (
            <div
              key={att.id}
              onClick={() => setSelectedAttendee(att)}
              style={{ left: `${att.coordinates.x}%`, top: `${att.coordinates.y}%` }}
              className={`absolute -translate-x-1/2 -translate-y-1/2 z-20 cursor-pointer transition-transform duration-200 ${
                isSelected ? 'scale-125 z-30' : 'hover:scale-110'
              }`}
            >
              <div className="relative flex flex-col items-center">
                <div
                  className={`w-8 h-8 rounded-full overflow-hidden border-2 shadow-lg ${getPinColor(
                    att.role
                  )} ${isSelected ? 'ring-4 ring-[#ff5167] shadow-[0_0_20px_#ff5167]' : ''}`}
                >
                  <img
                    alt={att.name}
                    src={att.photo}
                    className="w-full h-full object-cover"
                  />
                </div>
                <span
                  className={`font-mono text-[9px] font-bold px-1 rounded mt-0.5 whitespace-nowrap ${
                    isSelected
                      ? 'bg-[#ff5167] text-white shadow-md'
                      : 'bg-[#0d0e15]/90 text-white border border-white/10'
                  }`}
                >
                  {att.name.split(' ')[0]}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Attendee Radar Card */}
      {selectedAttendee && (
        <div className="bg-[#1e1f27] rounded-xl p-4 border border-white/10 shadow-xl mb-4 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-[#caf300]/10 rounded-full blur-xl pointer-events-none"></div>

          <div className="flex items-start justify-between gap-3 mb-2">
            <div className="flex items-center gap-3">
              <img
                alt={selectedAttendee.name}
                src={selectedAttendee.photo}
                className="w-12 h-12 rounded-xl object-cover border border-white/10"
              />
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <h3 className="font-headline text-[16px] font-bold text-white">
                    {selectedAttendee.name}
                  </h3>
                  <span className="font-mono text-[9px] uppercase px-1.5 py-0.5 rounded bg-[#caf300]/20 text-[#caf300] font-bold">
                    {selectedAttendee.role}
                  </span>
                </div>
                <p className="font-body text-[12px] text-[#ffb3b5]">
                  {selectedAttendee.title} @ {selectedAttendee.company}
                </p>
              </div>
            </div>

            <div className="flex flex-col items-end">
              <span className="font-mono text-[13px] font-bold text-[#caf300]">
                {selectedAttendee.distance}
              </span>
              <span className="font-mono text-[9px] text-[#e3bebe]">
                {selectedAttendee.activeTime}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 text-[#e3bebe] font-body text-[12px] mb-3 bg-[#292931] p-2 rounded-lg border border-white/5">
            <span className="material-symbols-outlined text-[16px] text-[#ff5167]">location_on</span>
            <span className="truncate">{selectedAttendee.location}</span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => onOpenChat(selectedAttendee)}
              className="py-2.5 px-3 rounded-xl bg-[#ff5167] hover:bg-[#ff5167]/90 text-white font-mono text-[11px] font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-[0_0_16px_rgba(255,81,103,0.3)] active:scale-95 transition-all"
              type="button"
            >
              <span className="material-symbols-outlined text-[16px]">bolt</span>
              <span>Send Spark</span>
            </button>

            <button
              onClick={() => {
                alert(`Navigating to ${selectedAttendee.name} at ${selectedAttendee.stageName}! Follow the flashing green radar path.`);
              }}
              className="py-2.5 px-3 rounded-xl bg-[#292931] hover:bg-[#34343c] text-[#caf300] font-mono text-[11px] font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 border border-[#caf300]/20 active:scale-95 transition-all"
              type="button"
            >
              <span className="material-symbols-outlined text-[16px]">turn_sharp_right</span>
              <span>Follow Route</span>
            </button>
          </div>
        </div>
      )}

      {/* Active Attendees Nearby List */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <span className="font-headline text-[15px] font-bold text-white">Nearby Radar Beacons</span>
          <span className="font-mono text-[10px] text-[#caf300]">{attendees.length} active</span>
        </div>

        <div className="space-y-1.5">
          {attendees.map((att) => (
            <div
              key={att.id}
              onClick={() => setSelectedAttendee(att)}
              className={`flex items-center justify-between p-2.5 rounded-xl cursor-pointer transition-all border ${
                selectedAttendee?.id === att.id
                  ? 'bg-[#292931] border-[#caf300]/30'
                  : 'bg-[#1e1f27] hover:bg-[#292931] border-white/5'
              }`}
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <img
                  alt={att.name}
                  src={att.photo}
                  className="w-9 h-9 rounded-lg object-cover"
                />
                <div className="flex flex-col min-w-0">
                  <span className="font-headline text-[13px] font-bold text-white truncate">
                    {att.name}
                  </span>
                  <span className="font-body text-[11px] text-[#e3bebe] truncate">
                    {att.location}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <span className="font-mono text-[11px] text-[#caf300] font-bold">
                  {att.distance}
                </span>
                <span className="material-symbols-outlined text-[18px] text-[#e3bebe]">
                  chevron_right
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
