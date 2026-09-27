import { Attendee, UserProfile, VenueZone } from '../types';

export const MEETME_LOGO_URL = 'https://lh3.googleusercontent.com/aida/AEtjO1WOlKGCZUDl-5Tc3SIMiF2z5LYSgdibVB6eZe-aoVpSu0W5RDwMhwjAtesmvTX9I6ZWpO-s1OAxAe-AKznzmACLjHs4Z4zF7GM5GVwyWt5B_Jp6JosAGklwJoFA4P9YK7UNx46X8GNccDPW4L05ilom0TyI-JkLJY64lW82UO3nnZ3Q2rbKyVrNj2YYTS8pS0EcTtxFZtaT0yc3GjLnbTLzjGrkT42ZLn1ZpwQgSJlco7NIERGI3lJiUkw';

export const INITIAL_USER_PROFILE: UserProfile = {
  name: 'Elena Vance',
  title: 'Founder @ SynthLogic',
  company: 'SynthLogic',
  serial: '#042 // FOUNDER EDITION',
  role: 'MENTOR',
  roleBadgeText: '★ MENTOR',
  roleBadgeClasses: 'bg-[#b76dff] text-[#2c0051] shadow-[0_0_16px_rgba(183,109,255,0.45)]',
  roleIcon: 'auto_awesome',
  presenceZone: 'Hacker Den & Coffee Bar',
  city: 'SAN FRANCISCO',
  bio: 'Founder @ SynthLogic. Scaling autonomous AI pipelines. Passionate about ethical agentic workflows and angel syndicates.',
  photo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAWavBQ91HKFp3wXUUJO4npd3bXa7qlgYY6AyA7oMViAmKDS7RqvyafszxIkxwnZhnpnFuT_7YiEdJlqTOsk31jLim3HKEQHAoOzPFGxOBjFoh3BZITXmj0iAt1LDBzLcUl0dwsao4fifVTBGodAHEPKUqPdwFM1XRplGp4BzYgwT7BWZ7aDx0qeNPZIXjSUVEZel2ESk34ds3Tdy95fZAM3aUjqBuLC71O-wnfv4hU0NP7vToFDvT9',
  lookingFor: [
    '🚀 Co-founder',
    '💡 Mentee / Giving Advice',
    '☕ Coffee & Vibe'
  ],
  expertiseTags: ['Product Design', 'AI Agents', 'Next.js', 'Seed Fundraising'],
  stats: {
    swiped: 84,
    matchRate: 42,
    metInPerson: 9,
    streak: 7
  }
};

export const INITIAL_ATTENDEES: Attendee[] = [
  {
    id: 'alex-chen',
    name: 'Alex Chen',
    age: 31,
    title: 'Founding AI Engineer',
    company: 'LatentForge',
    serial: '#042/SUMMIT',
    role: 'SPEAKER',
    roleSubtitle: 'Keynote Speaker — AI & Systems',
    location: '📍 Hall B — Demo Stage Front',
    stageName: 'Stage 1 / VIP Lounge',
    distance: '~45m away',
    matchScore: 98,
    wanted: 'Seed Co-founders & PyTorch Wizards',
    bio: "Ex-DeepMind. Giving today's 2 PM keynote on Agent Architectures. Looking for someone obsessed with high-throughput inference to build something crazy.",
    tags: ['#GenerativeAI', '#DistributedSystems', '#Founders', '#AngelInvesting'],
    photo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCet9pxQXHMCDa0sK52K4eAcYq2glS1WKfZGI3V0ZXI1IjNwLrxyyrYCG5Lf6vtepNYQwhQ_MPSGqwmCj2ORbaLgqYTWDUXL_LaKWk1g70gTEjkMgx1w-OE7A8B5UhecCu2nkHU3U40stGindAua1_jMnmQ-ZHEwIV4HqFpAC7ZfBSdcZbrJTCA41ypj5KEprm0xUYYFDskOLlos8Hvz6AFsSmXFKRVWJld7yqaAObkYapwcDjsS92I',
    activeTime: 'Active 4m ago',
    synergyTopic: 'Cofounders & Seed Funding',
    mutualIntents: ['🚀 Co-founder', '💰 Looking for Angels'],
    coordinates: { x: 38, y: 32 },
    unread: true,
    statusBadge: 'NEW!',
    lastMessage: {
      sender: 'Alex',
      text: 'Loved your thoughts on token streaming! Meet by the coffee booth?',
      time: '2m',
      isYou: false
    }
  },
  {
    id: 'sarah-lin',
    name: 'Sarah Lin',
    age: 29,
    title: 'Tech Lead',
    company: 'NeuroSync',
    serial: '#108/MENTOR',
    role: 'MENTOR',
    roleSubtitle: 'Tech Mentor — Hackathon VIP',
    location: '📍 Hack Lounge — Row 4',
    stageName: 'Hack Lounge & Workshop',
    distance: '~22m away',
    matchScore: 94,
    wanted: 'Mentee / Giving Advice & Hackathon Teammates',
    bio: 'Former Stripe infrastructure engineer now building neural-symbolic compilers. Mentoring teams this weekend on latency reduction and inference caching.',
    tags: ['#Compilers', '#WebAssembly', '#Mentorship', '#RustLang'],
    photo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCKlFmz-0QNUtjppNwboQaCLVnkV2ussSyE5S5qGDiaND-8fdP5ESveLmWY6ouvVTVW1GstuciyVjJ0j4uuC1o7w8X_q7PMZo3l61wt6YVRf1lJXww8XmHi8ew0Pi2sZjejxycqJfqiwhSZkemfjMOLdkr4_tgnWzJxRNo8cLI2MUsvxCCJueBXdTeddVtpgzvDh4CcmyT7DPXSOb5W_GXFicBEdI-StMohzdI7NyK0Jtff3qwPghwN',
    activeTime: 'Active 18m ago',
    synergyTopic: 'Pitch Deck Review & Compiler Stack',
    mutualIntents: ['💡 Mentee / Giving Advice', '🛠️ Hackathon Teammates'],
    coordinates: { x: 65, y: 55 },
    unread: false,
    statusBadge: '★ MENTOR',
    lastMessage: {
      sender: 'Sarah',
      text: 'Happy to review your pitch deck anytime before 5pm.',
      time: '18m',
      isYou: false
    }
  },
  {
    id: 'marcus-vance',
    name: 'Marcus Vance',
    age: 38,
    title: 'Principal Technical Recruiter',
    company: 'Stripe',
    serial: '#089/SPONSOR',
    role: 'RECRUITER',
    roleSubtitle: 'Sponsor & Talent Scout @ Stripe',
    location: '📍 Sponsor Pavilion — Booth #12',
    stageName: 'Sponsor Expo Pavilion',
    distance: '~90m away',
    matchScore: 89,
    wanted: 'Senior Distributed Systems & Core ML Engineers',
    bio: 'Scouting top builder talent for Stripe Core Platform and Payments AI. Stop by booth #12 for private API preview keys and custom swag.',
    tags: ['#Hiring', '#Fintech', '#DistributedSystems', '#Remote'],
    photo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBMikGlfynGooGkFj2YmC0SgEan4o9jYujKfr7RHoBZRykFbhiqBWTdziepwpmQUzQH4L-l7goBS82z9SLUeH_o_V2sWovodYCr0AnleMPetEBkEAo-tV1O4IcgNpZtVZ2q4Ih4FSIIf021NafDX_hKawCist9joNJbB4cNyr4_0XXeMiWidvQN9h9Elv8uP9iNYabuZ4iuF0HgAdc8cC-ifxO_ajAKsKdWUZgByjrAzP2CTNlO43te',
    activeTime: 'Active 1h ago',
    synergyTopic: 'Enterprise Infrastructure & Talent Hunt',
    mutualIntents: ['💼 Hiring Talent', '☕ Coffee & Vibe'],
    coordinates: { x: 22, y: 72 },
    unread: false,
    statusBadge: 'HIRING',
    lastMessage: {
      sender: 'You',
      text: 'Sounds good, see you at booth #12!',
      time: '1h',
      isYou: true
    }
  },
  {
    id: 'dev-priya',
    name: 'Dev Priya',
    age: 27,
    title: 'Lead Operations & Stage Producer',
    company: 'Summit Ops',
    serial: '#007/CORE',
    role: 'ORGANIZER',
    roleSubtitle: 'Summit Operations & VIP Relations',
    location: '📍 Mainstage Backstage / Control Deck',
    stageName: 'Mainstage Operations',
    distance: '~60m away',
    matchScore: 91,
    wanted: 'Lightning Talk Speakers & Demo Night Judges',
    bio: 'Managing run-of-show and backstage access. Let me know if you want to submit a 3-minute flash demo for the 6 PM closing showcase.',
    tags: ['#SummitOps', '#DemoDay', '#Founders', '#Community'],
    photo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBN7gLLMbDBy9gqIUDlNx1fTPG3eE73gVBMqGYon1N1sXUXkD-U0n1mi1aqA0tnMpXDovUpS3q6Td_eVEJImJeZOUgFkggqeTKE5vZ2F4GTFzJned2ZYfOyvAQ7Clt8pzOQHiKF1kpZhID3MIndiG7vUCn0wG1xD62wuKefvRkjesyPbz9l9K5gHamowUF4T9Mka6Z3DzZa6rhbEPo_ICZjGUV9j6oI1S3NFfO9gGaR7H6cbhvnLj0v',
    activeTime: 'Active 35m ago',
    synergyTopic: 'Flash Demo Submission & Speaker Lounge',
    mutualIntents: ['☕ Coffee & Vibe', '🚀 Co-founder'],
    coordinates: { x: 50, y: 20 },
    statusBadge: 'STAFF'
  },
  {
    id: 'dr-kaelen-zhao',
    name: 'Dr. Kaelen Zhao',
    age: 34,
    title: 'Research Scientist',
    company: 'TensorFlow Core Alum',
    serial: '#056/SPEAKER',
    role: 'SPEAKER',
    roleSubtitle: 'Speaker — Quantized On-Device LLMs',
    location: '📍 Stage A (AI Systems & Infra)',
    stageName: 'Stage A — Systems',
    distance: '~35m away',
    matchScore: 95,
    wanted: 'Hardware Acceleration & Seed Co-founders',
    bio: 'PhD from Berkeley EECS. Exploring 1-bit quantization and neuromorphic hardware accelerators for sub-millisecond edge inferences.',
    tags: ['#EdgeAI', '#Quantization', '#Hardware', '#OpenSource'],
    photo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCet9pxQXHMCDa0sK52K4eAcYq2glS1WKfZGI3V0ZXI1IjNwLrxyyrYCG5Lf6vtepNYQwhQ_MPSGqwmCj2ORbaLgqYTWDUXL_LaKWk1g70gTEjkMgx1w-OE7A8B5UhecCu2nkHU3U40stGindAua1_jMnmQ-ZHEwIV4HqFpAC7ZfBSdcZbrJTCA41ypj5KEprm0xUYYFDskOLlos8Hvz6AFsSmXFKRVWJld7yqaAObkYapwcDjsS92I',
    activeTime: 'Active 12m ago',
    synergyTopic: 'Edge Quantization & Autonomous Systems',
    mutualIntents: ['🚀 Co-founder', '💰 Looking for Angels'],
    coordinates: { x: 78, y: 35 }
  },
  {
    id: 'maya-patel',
    name: 'Maya Patel',
    age: 26,
    title: 'Co-founder & CTO',
    company: 'HyperGraph',
    serial: '#134/ATTENDEE',
    role: 'ATTENDEE',
    roleSubtitle: 'General Summit Pass — Hackathon Competitor',
    location: '📍 Outdoor Zen Terrace',
    stageName: 'Outdoor Zen Terrace',
    distance: '~50m away',
    matchScore: 92,
    wanted: 'Looking for Angels & Seed Funding',
    bio: 'Building WebGPU-native graph neural networks for live financial fraud detection. Won MIT Hackathon 2024. Raising $1.5M pre-seed.',
    tags: ['#WebGPU', '#GraphML', '#PreSeed', '#TypeScript'],
    photo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCKlFmz-0QNUtjppNwboQaCLVnkV2ussSyE5S5qGDiaND-8fdP5ESveLmWY6ouvVTVW1GstuciyVjJ0j4uuC1o7w8X_q7PMZo3l61wt6YVRf1lJXww8XmHi8ew0Pi2sZjejxycqJfqiwhSZkemfjMOLdkr4_tgnWzJxRNo8cLI2MUsvxCCJueBXdTeddVtpgzvDh4CcmyT7DPXSOb5W_GXFicBEdI-StMohzdI7NyK0Jtff3qwPghwN',
    activeTime: 'Active 2m ago',
    synergyTopic: 'WebGPU Pipeline & Pre-seed Syndicate',
    mutualIntents: ['💰 Looking for Angels', '☕ Coffee & Vibe'],
    coordinates: { x: 85, y: 78 }
  }
];

export const VENUE_ZONES: VenueZone[] = [
  {
    id: 'stage-1',
    name: 'Stage 1 (Keynote & Main Theater)',
    shortCode: 'STG-1',
    category: 'Stage',
    description: 'Main keynote amphitheater hosting high-throughput system talks & panels.',
    activeAttendeesCount: 420,
    coordinates: { x: 40, y: 28 }
  },
  {
    id: 'hall-b',
    name: 'Hall B (Demo Stage & Lightning Talks)',
    shortCode: 'HALL-B',
    category: 'Stage',
    description: 'Rapid-fire 5 minute technical demos and live benchmark shootouts.',
    activeAttendeesCount: 185,
    coordinates: { x: 38, y: 48 }
  },
  {
    id: 'hack-lounge',
    name: 'Hacker Den & Coffee Bar',
    shortCode: 'DEN-COF',
    category: 'Lounge',
    description: 'Espresso station, collaborative hack benches, and mentor office hours.',
    activeAttendeesCount: 142,
    coordinates: { x: 62, y: 58 }
  },
  {
    id: 'sponsor-pavilion',
    name: 'Sponsor Pavilion & Partner Booths',
    shortCode: 'SPO-EXP',
    category: 'Expo',
    description: 'Tier-1 cloud, hardware, and dev-tool sponsors with hiring active.',
    activeAttendeesCount: 290,
    coordinates: { x: 25, y: 70 }
  },
  {
    id: 'vip-lounge',
    name: 'VIP & Speaker Green Room (2F)',
    shortCode: 'VIP-2F',
    category: 'Lounge',
    description: 'Private terrace for keynote speakers, venture partners, and media.',
    activeAttendeesCount: 45,
    coordinates: { x: 50, y: 15 }
  },
  {
    id: 'zen-terrace',
    name: 'Outdoor Zen Terrace & Lawn',
    shortCode: 'ZEN-AIR',
    category: 'Outdoor',
    description: 'Quiet fresh-air garden for 1-on-1 founder walkthroughs and coffee chats.',
    activeAttendeesCount: 78,
    coordinates: { x: 85, y: 75 }
  }
];

export const ICEBREAKER_PROMPTS: string[] = [
  "What's the spiciest tech take you heard today?",
  "Which breakout stage blew your mind this morning?",
  "Are you building on open weights or proprietary APIs?",
  "Quick vibe check: AI agents or human craft for your 2025 roadmap?",
  "Coffee station or VIP mixer right after the keynote?",
  "What's one thing in your tech stack you secretly want to rewrite in Rust?",
  "Are you looking to join a founding team or hiring for your own?"
];
