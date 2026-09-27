import React, { useState } from 'react';
import { UserProfile, RoleType } from '../types';

interface ProfileViewProps {
  profile: UserProfile;
  onUpdateProfile: (updated: UserProfile) => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  profile,
  onUpdateProfile,
}) => {
  const [isTilted, setIsTilted] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved'>('idle');
  const [showAddTagModal, setShowAddTagModal] = useState(false);
  const [newTagInput, setNewTagInput] = useState('');

  const badges: Array<{
    role: RoleType;
    title: string;
    subtitle: string;
    classes: string;
    icon: string;
  }> = [
    {
      role: 'SPEAKER',
      title: 'SPEAKER',
      subtitle: 'Gold foil • Keynote Presenter',
      classes: 'bg-[#c59a00] text-[#1a1400] shadow-[0_0_16px_rgba(197,154,0,0.5)]',
      icon: 'mic',
    },
    {
      role: 'MENTOR',
      title: '★ MENTOR',
      subtitle: 'Deep purple iridescent • Office Hours Host',
      classes: 'bg-[#b76dff] text-[#2c0051] shadow-[0_0_16px_rgba(183,109,255,0.45)]',
      icon: 'auto_awesome',
    },
    {
      role: 'RECRUITER',
      title: 'SPONSOR / RECRUITER',
      subtitle: 'Sharp teal foil • Hiring Active',
      classes: 'bg-[#00d6b2] text-[#002f26] shadow-[0_0_16px_rgba(0,214,178,0.45)]',
      icon: 'work',
    },
    {
      role: 'ORGANIZER',
      title: 'ORGANIZER',
      subtitle: 'Crimson shield • Summit Operations',
      classes: 'bg-[#ff5167] text-white shadow-[0_0_16px_rgba(255,81,103,0.5)]',
      icon: 'shield',
    },
    {
      role: 'ATTENDEE',
      title: 'REGULAR ATTENDEE',
      subtitle: 'Clean obsidian minimal pill',
      classes: 'bg-[#34343c] text-white shadow-none',
      icon: 'badge',
    },
  ];

  const handleSelectBadge = (badge: typeof badges[0]) => {
    onUpdateProfile({
      ...profile,
      role: badge.role,
      roleBadgeText: badge.title,
      roleBadgeClasses: badge.classes,
      roleIcon: badge.icon,
    });
  };

  const handleZoneChange = (zone: string) => {
    onUpdateProfile({
      ...profile,
      presenceZone: zone,
    });
  };

  const handleToggleIntent = (intent: string) => {
    const isSelected = profile.lookingFor.includes(intent);
    const updated = isSelected
      ? profile.lookingFor.filter((item) => item !== intent)
      : [...profile.lookingFor, intent];

    onUpdateProfile({
      ...profile,
      lookingFor: updated,
    });
  };

  const handleRemoveTag = (tagToRemove: string) => {
    onUpdateProfile({
      ...profile,
      expertiseTags: profile.expertiseTags.filter((t) => t !== tagToRemove),
    });
  };

  const handleAddTag = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTagInput.trim() && !profile.expertiseTags.includes(newTagInput.trim())) {
      onUpdateProfile({
        ...profile,
        expertiseTags: [...profile.expertiseTags, newTagInput.trim()],
      });
      setNewTagInput('');
      setShowAddTagModal(false);
    }
  };

  const handleSaveAnimation = () => {
    setSaveStatus('saving');
    setTimeout(() => {
      setSaveStatus('saved');
      setTimeout(() => setSaveStatus('idle'), 3000);
    }, 800);
  };

  const intentOptions = [
    '🚀 Co-founder',
    '💡 Mentee / Giving Advice',
    '☕ Coffee & Vibe',
    '💼 Hiring Talent',
    '💰 Looking for Angels',
    '🛠️ Hackathon Teammates',
  ];

  return (
    <div className="flex flex-col w-full px-4 pb-28 pt-2 max-w-md mx-auto">
      {/* Top Stat Ticker Strip */}
      <div className="w-full mb-4 mt-1">
        <div className="grid grid-cols-3 gap-2 p-1 rounded-xl bg-[#1e1f27] shadow-md border border-white/5">
          <div className="flex flex-col items-center justify-center py-2 px-1 text-center bg-[#292931] rounded-lg">
            <span className="font-mono text-[10px] text-[#e3bebe] uppercase">Swiped</span>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="font-headline text-[18px] text-white font-bold">{profile.stats.swiped}</span>
              <span className="font-mono text-[9px] text-[#aa8989]">cards</span>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center py-2 px-1 text-center bg-[#292931] rounded-lg">
            <span className="font-mono text-[10px] text-[#ffb3b5] uppercase">Match Rate</span>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="font-headline text-[18px] text-[#ff5167] font-bold">{profile.stats.matchRate}%</span>
              <span className="text-[13px] leading-none">🔥</span>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center py-2 px-1 text-center bg-[#292931] rounded-lg">
            <span className="font-mono text-[10px] text-[#caf300] uppercase">Met In Person</span>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="font-headline text-[18px] text-[#caf300] font-bold">{profile.stats.metInPerson}</span>
              <span className="font-mono text-[9px] text-[#aa8989]">deals</span>
            </div>
          </div>
        </div>
      </div>

      {/* Live Attendee Collector Card Preview */}
      <div className="relative w-full flex flex-col items-center mb-6">
        {/* Perspective Card Shell */}
        <div
          style={{
            transform: isTilted
              ? 'perspective(800px) rotateX(12deg) rotateY(-14deg) scale3d(1.02, 1.02, 1.02)'
              : 'perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
            transition: 'transform 0.4s ease-out',
          }}
          className="relative w-full max-w-[340px] aspect-[3/4.2] rounded-2xl bg-[#1a1b22] shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden select-none flex flex-col justify-between border border-white/10"
        >
          {/* Holographic Foil Dynamic Sheen */}
          <div
            style={{
              opacity: isTilted ? 0.85 : 0.4,
              background: isTilted
                ? 'linear-gradient(135deg, rgba(202,243,0,0.4) 0%, rgba(183,109,255,0.4) 50%, rgba(255,81,103,0.4) 100%)'
                : 'linear-gradient(to top right, transparent, rgba(183,109,255,0.3), rgba(202,243,0,0.2))',
            }}
            className="pointer-events-none absolute inset-0 z-30 mix-blend-color-dodge transition-all duration-300"
          />

          {/* Top Card Header */}
          <div className="relative z-20 flex items-start justify-between p-4 bg-gradient-to-b from-[#0d0e15]/95 via-[#0d0e15]/40 to-transparent">
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#caf300] shadow-[0_0_6px_#caf300]"></span>
                <span className="font-mono text-[10px] text-white font-bold tracking-widest uppercase">
                  SERIES 2024
                </span>
              </div>
              <span className="font-mono text-[9px] text-[#e3bebe] tracking-wider">
                {profile.serial}
              </span>
            </div>

            {/* Dynamic Equipped Badge on Card */}
            <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full ${profile.roleBadgeClasses}`}>
              <span className="material-symbols-outlined text-[15px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                {profile.roleIcon}
              </span>
              <span className="font-mono text-[10px] uppercase font-bold tracking-wider">
                {profile.roleBadgeText}
              </span>
            </div>
          </div>

          {/* Card Photo Portrait */}
          <div className="absolute inset-0 z-0">
            <img
              alt={profile.name}
              className="w-full h-full object-cover object-center"
              src={profile.photo}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0d0e15] via-[#0d0e15]/70 to-transparent"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-[#0d0e15]/70 via-transparent to-transparent"></div>
          </div>

          {/* Bottom Card Information Cluster */}
          <div className="relative z-20 p-4 flex flex-col gap-1 mt-auto">
            {/* Live Ping Indicator */}
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#caf300] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#caf300]"></span>
              </span>
              <span className="font-mono text-[10px] text-[#caf300] uppercase tracking-wider font-semibold">
                📍 {profile.presenceZone}
              </span>
            </div>

            <div className="flex items-baseline justify-between">
              <h2 className="font-headline text-[22px] text-white font-bold tracking-tight">
                {profile.name}
              </h2>
              <span className="font-mono text-[10px] text-[#e3bebe] uppercase">
                {profile.city}
              </span>
            </div>

            <p className="font-body text-[12px] text-[#e3e1ec]/90 leading-tight line-clamp-2">
              {profile.bio}
            </p>

            {/* Quick Tags Preview inside Card */}
            <div className="flex flex-wrap gap-1 mt-1">
              {profile.lookingFor.slice(0, 2).map((item) => (
                <span
                  key={item}
                  className="px-2 py-0.5 rounded-full bg-[#292931]/90 text-[#e3e1ec] font-mono text-[10px] border border-white/5"
                >
                  {item}
                </span>
              ))}
              {profile.lookingFor.length > 2 && (
                <span className="px-2 py-0.5 rounded-full bg-[#292931]/90 text-[#caf300] font-mono text-[10px] border border-white/5">
                  +{profile.lookingFor.length - 2} more
                </span>
              )}
            </div>
          </div>
        </div>

        {/* 3D Tilt Toggle Button */}
        <div className="mt-3 flex items-center gap-2">
          <button
            onClick={() => setIsTilted(!isTilted)}
            className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full transition-all active:scale-95 shadow-sm border border-white/5 ${
              isTilted
                ? 'bg-[#b76dff] text-[#2c0051] font-bold'
                : 'bg-[#1e1f27] hover:bg-[#383941] text-[#e3e1ec]'
            }`}
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">3d_rotation</span>
            <span className="font-mono text-[11px] uppercase tracking-wider">
              {isTilted ? 'Reset Perspective' : 'Interactive Tilt View'}
            </span>
          </button>
        </div>
      </div>

      {/* Role Badge Shelf Selector */}
      <div className="w-full flex flex-col gap-2 mb-6">
        <div className="flex items-baseline justify-between">
          <div className="flex flex-col">
            <span className="font-mono text-[10px] uppercase tracking-widest text-[#ffb3b5]">
              Badge Showcase
            </span>
            <h3 className="font-headline text-[18px] font-bold text-white">Equip Attendee Badge</h3>
          </div>
          <span className="font-mono text-[10px] text-[#e3bebe]">1/5 SLOTS</span>
        </div>

        {/* Verified Badge Notice */}
        <div className="flex items-center gap-2.5 p-3 rounded-xl bg-[#1a1b22] border border-white/5">
          <div className="w-8 h-8 rounded-lg bg-[#1e1f27] flex items-center justify-center shrink-0 text-[#caf300]">
            <span className="material-symbols-outlined text-[18px]">verified_user</span>
          </div>
          <div className="flex flex-col min-w-0 flex-1">
            <span className="font-mono text-[10px] text-white font-semibold uppercase">
              Tech Mentor Verified
            </span>
            <span className="font-body text-[12px] text-[#e3bebe] truncate">
              Issued via Hackathon VIP Access pass
            </span>
          </div>
          <span className="font-mono text-[10px] uppercase font-bold text-[#caf300] bg-[#292931] px-2 py-0.5 rounded-full border border-[#caf300]/20">
            ACTIVE
          </span>
        </div>

        {/* 5 Distinct Badges List */}
        <div className="grid grid-cols-1 gap-2">
          {badges.map((badge) => {
            const isEquipped = profile.role === badge.role;
            return (
              <button
                key={badge.role}
                onClick={() => handleSelectBadge(badge)}
                className={`flex items-center justify-between p-3 rounded-xl transition-all text-left border ${
                  isEquipped
                    ? 'bg-[#292931] border-[#caf300]/40 shadow-[0_0_16px_rgba(202,243,0,0.1)]'
                    : 'bg-[#1e1f27] hover:bg-[#292931] border-white/5'
                }`}
                type="button"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-9 h-9 rounded-lg flex items-center justify-center font-bold ${badge.classes}`}
                  >
                    <span
                      className="material-symbols-outlined text-[20px]"
                      style={{ fontVariationSettings: isEquipped ? "'FILL' 1" : undefined }}
                    >
                      {badge.icon}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-headline text-[13px] font-bold text-white tracking-wide uppercase">
                      {badge.title}
                    </span>
                    <span className="font-body text-[12px] text-[#e3bebe]">{badge.subtitle}</span>
                  </div>
                </div>
                {isEquipped ? (
                  <span className="font-mono text-[10px] font-bold text-[#caf300] bg-[#0d0e15] px-2.5 py-1 rounded-full border border-[#caf300]/30">
                    EQUIPPED
                  </span>
                ) : (
                  <span className="font-mono text-[10px] text-[#e3bebe] uppercase hover:text-white">
                    Equip
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Venue Live Zone Selector */}
      <div className="w-full flex flex-col gap-1 mb-6 p-4 rounded-2xl bg-[#1a1b22] border border-white/5 shadow-sm">
        <div className="flex items-center justify-between">
          <span className="font-mono text-[10px] text-[#caf300] uppercase tracking-wider font-semibold">
            Venue Radar Beacon
          </span>
          <span className="font-mono text-[10px] text-[#aa8989]">AUTO-GPS ON</span>
        </div>
        <div className="flex flex-col gap-0.5 mt-1">
          <label className="font-headline text-[16px] text-white font-bold" htmlFor="venueZoneSelect">
            Current Presence Zone
          </label>
          <p className="font-body text-[12px] text-[#e3bebe]">
            Shows up on nearby attendee radar decks in real time.
          </p>
        </div>
        <div className="mt-2 relative">
          <select
            id="venueZoneSelect"
            value={profile.presenceZone}
            onChange={(e) => handleZoneChange(e.target.value)}
            className="w-full bg-[#1e1f27] text-white font-body text-[14px] py-3 px-4 rounded-xl appearance-none focus:outline-none focus:ring-1 focus:ring-[#caf300] transition-colors border border-white/5"
          >
            <option value="Hacker Den & Coffee Bar">📍 Hacker Den & Coffee Bar</option>
            <option value="Stage A (AI Systems & Infra)">🎙️ Stage A (AI Systems & Infra)</option>
            <option value="Sponsor Pavilion - Booth #18">🏢 Sponsor Pavilion - Booth #18</option>
            <option value="VIP & Speaker Lounge (2F)">🍸 VIP & Speaker Lounge (2F)</option>
            <option value="Outdoor Zen Terrace">🍃 Outdoor Zen Terrace</option>
          </select>
          <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-[#e3bebe]">
            <span className="material-symbols-outlined text-[20px]">expand_more</span>
          </div>
        </div>
      </div>

      {/* Intent Picker: What I'm Looking For */}
      <div className="w-full flex flex-col gap-2 mb-6">
        <div className="flex items-baseline justify-between">
          <div className="flex flex-col">
            <span className="font-mono text-[10px] uppercase tracking-widest text-[#ff5167]">
              Discovery Matchmaker
            </span>
            <h3 className="font-headline text-[18px] font-bold text-white">What I&apos;m Looking For</h3>
          </div>
          <span className="font-mono text-[10px] text-[#e3bebe]">SELECT MULTIPLE</span>
        </div>

        <div className="flex flex-wrap gap-2">
          {intentOptions.map((intent) => {
            const isSelected = profile.lookingFor.includes(intent);
            return (
              <button
                key={intent}
                onClick={() => handleToggleIntent(intent)}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full font-mono text-[11px] font-semibold transition-all border ${
                  isSelected
                    ? 'bg-[#ff5167] text-white shadow-[0_0_12px_rgba(255,81,103,0.35)] border-transparent'
                    : 'bg-[#1e1f27] hover:bg-[#292931] text-[#e3e1ec] border-white/5'
                }`}
                type="button"
              >
                <span>{intent}</span>
                <span className="material-symbols-outlined text-[14px]">
                  {isSelected ? 'check' : 'add'}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Technical Expertise Chips */}
      <div className="w-full flex flex-col gap-2 mb-6">
        <div className="flex items-baseline justify-between">
          <div className="flex flex-col">
            <span className="font-mono text-[10px] uppercase tracking-widest text-[#caf300]">
              Card Metadata
            </span>
            <h3 className="font-headline text-[18px] font-bold text-white">Expertise Tags</h3>
          </div>
          <span className="font-mono text-[10px] text-[#e3bebe]">
            {profile.expertiseTags.length}/8 TAGS
          </span>
        </div>

        <div className="flex flex-wrap gap-2 items-center">
          {profile.expertiseTags.map((tag) => (
            <div
              key={tag}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#292931] text-white font-mono text-[11px] border border-white/5"
            >
              <span>{tag}</span>
              <button
                aria-label={`Remove ${tag}`}
                onClick={() => handleRemoveTag(tag)}
                className="hover:text-[#ff5167] transition-colors flex items-center justify-center"
                type="button"
              >
                <span className="material-symbols-outlined text-[14px]">close</span>
              </button>
            </div>
          ))}

          {/* Add Tag Button */}
          <button
            onClick={() => setShowAddTagModal(true)}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#1e1f27] hover:bg-[#383941] text-[#caf300] font-mono text-[11px] transition-all active:scale-95 border border-[#caf300]/20"
            type="button"
          >
            <span className="material-symbols-outlined text-[15px]">add</span>
            <span>Add Tag</span>
          </button>
        </div>
      </div>

      {/* Add Tag Modal */}
      {showAddTagModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <form
            onSubmit={handleAddTag}
            className="bg-[#1e1f27] rounded-2xl p-5 w-full max-w-sm border border-white/10 shadow-2xl"
          >
            <h4 className="font-headline text-[18px] font-bold text-white mb-2">Add Expertise Tag</h4>
            <p className="font-body text-[13px] text-[#e3bebe] mb-4">
              Enter a technical discipline, framework, or focus area (e.g. &ldquo;Rust&rdquo;, &ldquo;LLMs&rdquo;, &ldquo;WebGPU&rdquo;).
            </p>
            <input
              autoFocus
              type="text"
              value={newTagInput}
              onChange={(e) => setNewTagInput(e.target.value)}
              placeholder="e.g. PyTorch, Distributed Systems"
              className="w-full bg-[#12131a] px-3.5 py-2.5 rounded-xl text-white font-body text-[14px] border border-white/10 focus:outline-none focus:ring-1 focus:ring-[#caf300] mb-4"
            />
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowAddTagModal(false)}
                className="px-4 py-2 rounded-lg font-mono text-[11px] text-[#e3bebe] hover:bg-[#292931]"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-lg bg-[#caf300] text-[#12131a] font-mono text-[11px] font-bold uppercase tracking-wider"
              >
                Add Tag
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Save Card Updates Button */}
      <div className="w-full flex flex-col gap-2 mt-2">
        <button
          onClick={handleSaveAnimation}
          disabled={saveStatus === 'saving'}
          className="w-full py-3.5 px-4 rounded-xl bg-[#caf300] hover:bg-[#b0d500] text-[#12131a] font-mono text-[13px] font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_0_24px_rgba(202,243,0,0.35)] transition-all active:scale-[0.98]"
          type="button"
        >
          {saveStatus === 'saving' ? (
            <>
              <span className="material-symbols-outlined text-[20px] animate-spin">refresh</span>
              <span>Transmitting Card Pulse...</span>
            </>
          ) : saveStatus === 'saved' ? (
            <>
              <span className="material-symbols-outlined text-[20px]">done</span>
              <span>Card Synchronized!</span>
            </>
          ) : (
            <>
              <span className="material-symbols-outlined text-[20px]">bolt</span>
              <span>Save Card Updates</span>
            </>
          )}
        </button>

        {saveStatus === 'saved' && (
          <div className="text-center font-mono text-[11px] text-[#caf300] uppercase tracking-widest font-semibold transition-opacity animate-fade-in">
            ✓ Holographic Card Synchronized with Summit Grid
          </div>
        )}
      </div>
    </div>
  );
};
