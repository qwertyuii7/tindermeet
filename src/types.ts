export type RoleType = 'SPEAKER' | 'MENTOR' | 'RECRUITER' | 'ORGANIZER' | 'ATTENDEE';

export interface Attendee {
  id: string;
  name: string;
  age: number;
  title: string;
  company: string;
  serial: string;
  role: RoleType;
  roleSubtitle: string;
  location: string;
  stageName: string;
  distance: string;
  matchScore: number;
  wanted: string;
  bio: string;
  tags: string[];
  photo: string;
  activeTime: string;
  synergyTopic: string;
  mutualIntents: string[];
  coordinates: { x: number; y: number }; // Radar map coordinates (0-100%)
  unread?: boolean;
  statusBadge?: string;
  lastMessage?: {
    sender: string;
    text: string;
    time: string;
    isYou?: boolean;
  };
}

export interface UserProfile {
  name: string;
  title: string;
  company: string;
  serial: string;
  role: RoleType;
  roleBadgeText: string;
  roleBadgeClasses: string;
  roleIcon: string;
  presenceZone: string;
  city: string;
  bio: string;
  photo: string;
  lookingFor: string[];
  expertiseTags: string[];
  stats: {
    swiped: number;
    matchRate: number;
    metInPerson: number;
    streak: number;
  };
}

export interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  text: string;
  time: string;
  isYou: boolean;
  isIcebreaker?: boolean;
}

export interface VenueZone {
  id: string;
  name: string;
  shortCode: string;
  category: 'Stage' | 'Lounge' | 'Expo' | 'Outdoor';
  description: string;
  activeAttendeesCount: number;
  coordinates: { x: number; y: number };
}
