/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Header } from './components/Header';
import { BottomNavBar } from './components/BottomNavBar';
import { DeckView } from './components/DeckView';
import { MatchesView } from './components/MatchesView';
import { VenueRadarView } from './components/VenueRadarView';
import { ProfileView } from './components/ProfileView';
import { MatchModal } from './components/MatchModal';
import { ChatModal } from './components/ChatModal';
import { AttendeeDetailModal } from './components/AttendeeDetailModal';
import { FilterModal } from './components/FilterModal';
import { INITIAL_ATTENDEES, INITIAL_USER_PROFILE, ICEBREAKER_PROMPTS } from './data/mockData';
import { Attendee, UserProfile } from './types';

export default function App() {
  const [currentTab, setCurrentTab] = useState<'deck' | 'matches' | 'radar' | 'profile'>('deck');
  const [deckAttendees, setDeckAttendees] = useState<Attendee[]>(INITIAL_ATTENDEES);
  const [swipedHistory, setSwipedHistory] = useState<Attendee[]>([]);
  const [matches, setMatches] = useState<Attendee[]>(INITIAL_ATTENDEES.slice(0, 4));
  const [matchedModalAttendee, setMatchedModalAttendee] = useState<Attendee | null>(null);
  const [activeChatAttendee, setActiveChatAttendee] = useState<{ attendee: Attendee; initialMessage?: string } | null>(null);
  const [inspectingAttendee, setInspectingAttendee] = useState<Attendee | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile>(INITIAL_USER_PROFILE);
  const [boostSwipes, setBoostSwipes] = useState(5);
  const [streakCount, setStreakCount] = useState(7);
  const [radarTargetAttendee, setRadarTargetAttendee] = useState<Attendee | null>(null);
  const [notificationBanner, setNotificationBanner] = useState<string | null>(null);

  const showNotification = (msg: string) => {
    setNotificationBanner(msg);
    setTimeout(() => setNotificationBanner(null), 3000);
  };

  // Swiping: Connect (Right)
  const handleConnect = (attendee: Attendee) => {
    setSwipedHistory((prev) => [attendee, ...prev]);
    setDeckAttendees((prev) => prev.filter((a) => a.id !== attendee.id));
    setStreakCount((prev) => prev + 1);

    // Update user stats
    setUserProfile((prev) => ({
      ...prev,
      stats: {
        ...prev.stats,
        swiped: prev.stats.swiped + 1,
        matchRate: Math.min(99, prev.stats.matchRate + 1),
      },
    }));

    // Trigger match celebration for high synergy matches (like Alex Chen, Sarah Lin, etc.)
    if (!matches.some((m) => m.id === attendee.id)) {
      setMatches((prev) => [attendee, ...prev]);
    }
    setMatchedModalAttendee(attendee);
  };

  // Swiping: Pass (Left)
  const handlePass = (attendee: Attendee) => {
    setSwipedHistory((prev) => [attendee, ...prev]);
    setDeckAttendees((prev) => prev.filter((a) => a.id !== attendee.id));

    setUserProfile((prev) => ({
      ...prev,
      stats: {
        ...prev.stats,
        swiped: prev.stats.swiped + 1,
      },
    }));
  };

  // Swiping: Super Spark (Up)
  const handleSuperSpark = (attendee: Attendee) => {
    setSwipedHistory((prev) => [attendee, ...prev]);
    setDeckAttendees((prev) => prev.filter((a) => a.id !== attendee.id));
    setStreakCount((prev) => prev + 2);

    if (!matches.some((m) => m.id === attendee.id)) {
      setMatches((prev) => [{ ...attendee, statusBadge: 'SPARK!' }, ...prev]);
    }
    setMatchedModalAttendee(attendee);
  };

  // Rewind / Undo
  const handleRewind = () => {
    if (swipedHistory.length === 0) {
      // If deck was empty, reset with initial attendees
      setDeckAttendees(INITIAL_ATTENDEES);
      showNotification('Shuffled 6 fresh attendee cards into deck!');
      return;
    }
    const [lastSwiped, ...remaining] = swipedHistory;
    setSwipedHistory(remaining);
    setDeckAttendees((prev) => [lastSwiped, ...prev]);
    showNotification(`Restored card: ${lastSwiped.name}`);
  };

  // Use Boost
  const handleUseBoost = () => {
    if (boostSwipes > 0) {
      setBoostSwipes((prev) => prev - 1);
      showNotification('⚡ Session Boost Activated! 3 high-synergy founders prioritized in your deck.');
    } else {
      showNotification('Boost swipes depleted for this session. Resets in 23h.');
    }
  };

  // Handle Send Spark Icebreaker from Match Screen
  const handleSendIcebreakerFromMatch = (attendee: Attendee) => {
    setMatchedModalAttendee(null);
    const randomIcebreaker = ICEBREAKER_PROMPTS[Math.floor(Math.random() * ICEBREAKER_PROMPTS.length)];
    setActiveChatAttendee({
      attendee,
      initialMessage: randomIcebreaker,
    });
  };

  // Handle Find at Venue from Match Screen
  const handleFindAtVenueFromMatch = (attendee: Attendee) => {
    setMatchedModalAttendee(null);
    setRadarTargetAttendee(attendee);
    setCurrentTab('radar');
    showNotification(`📍 Radar locked on ${attendee.name} (${attendee.distance})`);
  };

  // Handle Apply Filter
  const handleApplyFilters = (filters: { roles: string[]; minScore: number }) => {
    const filtered = INITIAL_ATTENDEES.filter(
      (a) => filters.roles.includes(a.role) && a.matchScore >= filters.minScore
    );
    setDeckAttendees(filtered);
    showNotification(`Filtered deck: ${filtered.length} attendees match criteria`);
  };

  return (
    <div className="min-h-screen bg-[#12131a] text-[#e3e1ec] font-body flex flex-col relative select-none">
      {/* Dynamic Toast / Feedback Notification Banner */}
      {notificationBanner && (
        <div className="fixed top-18 inset-x-4 z-50 max-w-sm mx-auto bg-[#caf300] text-[#12131a] px-4 py-2.5 rounded-xl font-mono text-[11px] font-bold shadow-[0_0_24px_rgba(202,243,0,0.5)] flex items-center justify-between animate-bounce">
          <span>{notificationBanner}</span>
          <button onClick={() => setNotificationBanner(null)} className="ml-2 font-bold">✕</button>
        </div>
      )}

      {/* Main Persistent Sticky App Header */}
      <Header
        currentTab={currentTab}
        userProfile={userProfile}
        streakCount={streakCount}
        onOpenFilter={() => setIsFilterOpen(true)}
        onNavigateTab={(tab) => setCurrentTab(tab)}
      />

      {/* Main View Area */}
      <main className="flex-1 w-full pt-16 flex flex-col relative">
        {currentTab === 'deck' && (
          <DeckView
            attendees={deckAttendees}
            onConnect={handleConnect}
            onPass={handlePass}
            onSuperSpark={handleSuperSpark}
            onInspect={(attendee) => setInspectingAttendee(attendee)}
            onRewind={handleRewind}
            canRewind={swipedHistory.length > 0 || deckAttendees.length === 0}
            boostSwipes={boostSwipes}
            onUseBoost={handleUseBoost}
          />
        )}

        {currentTab === 'matches' && (
          <MatchesView
            matches={matches}
            onOpenChat={(attendee, initialMsg) =>
              setActiveChatAttendee({ attendee, initialMessage: initialMsg })
            }
            onOpenProfile={(attendee) => setInspectingAttendee(attendee)}
          />
        )}

        {currentTab === 'radar' && (
          <VenueRadarView
            attendees={matches}
            userProfile={userProfile}
            routedAttendee={radarTargetAttendee}
            onOpenChat={(attendee) => setActiveChatAttendee({ attendee })}
            onClearRoute={() => setRadarTargetAttendee(null)}
          />
        )}

        {currentTab === 'profile' && (
          <ProfileView
            profile={userProfile}
            onUpdateProfile={(updated) => setUserProfile(updated)}
          />
        )}
      </main>

      {/* Fixed Bottom Navigation Bar */}
      <BottomNavBar
        currentTab={currentTab}
        matchCount={matches.length}
        onSelectTab={(tab) => setCurrentTab(tab)}
      />

      {/* High-Voltage Collision / Match Modal (Modeled on Image 6 & HTML 1) */}
      {matchedModalAttendee && (
        <MatchModal
          attendee={matchedModalAttendee}
          userProfile={userProfile}
          remainingDeckCount={deckAttendees.length}
          onClose={() => setMatchedModalAttendee(null)}
          onSendIcebreaker={handleSendIcebreakerFromMatch}
          onFindAtVenue={handleFindAtVenueFromMatch}
        />
      )}

      {/* Direct Messaging Chat Modal */}
      {activeChatAttendee && (
        <ChatModal
          attendee={activeChatAttendee.attendee}
          initialMessage={activeChatAttendee.initialMessage}
          onClose={() => setActiveChatAttendee(null)}
          onNavigateToRadar={(attendee) => {
            setRadarTargetAttendee(attendee);
            setCurrentTab('radar');
          }}
        />
      )}

      {/* Attendee Full Detail / Inspection Modal */}
      {inspectingAttendee && (
        <AttendeeDetailModal
          attendee={inspectingAttendee}
          onClose={() => setInspectingAttendee(null)}
          onConnect={(att) => {
            handleConnect(att);
            setInspectingAttendee(null);
          }}
          onPass={(att) => {
            handlePass(att);
            setInspectingAttendee(null);
          }}
          onSpark={(att) => {
            handleSuperSpark(att);
            setInspectingAttendee(null);
          }}
        />
      )}

      {/* Filter Modal */}
      <FilterModal
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        onApplyFilters={handleApplyFilters}
      />
    </div>
  );
}
