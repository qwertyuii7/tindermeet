import React, { useState } from 'react';

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyFilters: (filters: { roles: string[]; minScore: number; maxDistance: number }) => void;
}

export const FilterModal: React.FC<FilterModalProps> = ({
  isOpen,
  onClose,
  onApplyFilters,
}) => {
  const [selectedRoles, setSelectedRoles] = useState<string[]>([
    'SPEAKER',
    'MENTOR',
    'RECRUITER',
    'ORGANIZER',
    'ATTENDEE',
  ]);
  const [minScore, setMinScore] = useState<number>(80);
  const [maxDistance, setMaxDistance] = useState<number>(100);

  if (!isOpen) return null;

  const toggleRole = (role: string) => {
    if (selectedRoles.includes(role)) {
      if (selectedRoles.length > 1) {
        setSelectedRoles(selectedRoles.filter((r) => r !== role));
      }
    } else {
      setSelectedRoles([...selectedRoles, role]);
    }
  };

  const handleApply = () => {
    onApplyFilters({
      roles: selectedRoles,
      minScore,
      maxDistance,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="w-full max-w-md bg-[#1e1f27] rounded-t-3xl sm:rounded-2xl p-5 border border-white/10 shadow-2xl flex flex-col gap-4 animate-slide-up">
        {/* Grab bar affordance for mobile */}
        <div className="w-12 h-1 bg-white/20 rounded-full mx-auto sm:hidden mb-1"></div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[20px] text-[#caf300]">tune</span>
            <h3 className="font-headline text-[18px] font-bold text-white">Deck Match Filters</h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#292931] flex items-center justify-center text-[#e3bebe] hover:text-white"
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Roles Filter */}
        <div className="flex flex-col gap-2">
          <span className="font-mono text-[10px] text-[#e3bebe] uppercase tracking-wider font-semibold">
            Attendee Roles
          </span>
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'SPEAKER', label: 'Keynote Speakers', color: 'amber' },
              { id: 'MENTOR', label: 'Mentors', color: 'purple' },
              { id: 'RECRUITER', label: 'Sponsors & Hiring', color: 'emerald' },
              { id: 'ORGANIZER', label: 'Summit Crew', color: 'coral' },
              { id: 'ATTENDEE', label: 'Builders & Hackers', color: 'slate' },
            ].map((r) => {
              const active = selectedRoles.includes(r.id);
              return (
                <button
                  key={r.id}
                  onClick={() => toggleRole(r.id)}
                  className={`px-3 py-1.5 rounded-full font-mono text-[11px] font-semibold transition-all border ${
                    active
                      ? 'bg-[#caf300] text-[#12131a] border-[#caf300] shadow-[0_0_12px_rgba(202,243,0,0.3)]'
                      : 'bg-[#292931] text-[#e3bebe] border-white/5 hover:bg-[#34343c]'
                  }`}
                  type="button"
                >
                  {r.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Min Synergy Score Slider */}
        <div className="flex flex-col gap-1.5 bg-[#12131a] p-3 rounded-xl border border-white/5">
          <div className="flex justify-between items-center font-mono text-[11px]">
            <span className="text-[#e3bebe]">Minimum Synergy Score</span>
            <span className="text-[#caf300] font-bold">{minScore}%</span>
          </div>
          <input
            type="range"
            min="60"
            max="99"
            value={minScore}
            onChange={(e) => setMinScore(Number(e.target.value))}
            className="w-full accent-[#caf300] cursor-pointer"
          />
        </div>

        {/* Proximity Radius */}
        <div className="flex flex-col gap-1.5 bg-[#12131a] p-3 rounded-xl border border-white/5">
          <div className="flex justify-between items-center font-mono text-[11px]">
            <span className="text-[#e3bebe]">Proximity Radar Radius</span>
            <span className="text-[#ff5167] font-bold">&lt; {maxDistance}m</span>
          </div>
          <input
            type="range"
            min="20"
            max="150"
            step="10"
            value={maxDistance}
            onChange={(e) => setMaxDistance(Number(e.target.value))}
            className="w-full accent-[#ff5167] cursor-pointer"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 pt-2">
          <button
            onClick={() => {
              setSelectedRoles(['SPEAKER', 'MENTOR', 'RECRUITER', 'ORGANIZER', 'ATTENDEE']);
              setMinScore(80);
              setMaxDistance(100);
            }}
            className="flex-1 py-3 rounded-xl bg-[#292931] hover:bg-[#383941] text-[#e3bebe] font-mono text-[11px] font-semibold uppercase tracking-wider transition-colors"
            type="button"
          >
            Reset
          </button>
          <button
            onClick={handleApply}
            className="flex-2 py-3 rounded-xl bg-[#caf300] hover:bg-[#b0d500] text-[#12131a] font-mono text-[12px] font-bold uppercase tracking-wider shadow-[0_0_20px_rgba(202,243,0,0.3)] transition-colors"
            type="button"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
};
