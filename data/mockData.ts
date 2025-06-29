export interface Candidate {
  id: string;
  name: string;
  position: string;
  district: string;
  party: string;
  imageUrl: string;
  matchPercentage: number;
  hasContradictions: boolean;
  bio: string;
  keyIssues: string[];
  experience: string[];
}

export interface Election {
  id: string;
  title: string;
  type: 'general' | 'primary' | 'micro';
  date: string;
  status: 'upcoming' | 'active' | 'completed';
  description: string;
  candidates?: string[];
}

export interface CivicEvent {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  urgency: 'high' | 'medium' | 'low';
  xpReward: number;
  date: string;
}

export interface UserProfile {
  name: string;
  address: string;
  district: string;
  xp: number;
  level: number;
  metroPoints: number;
  streakDays: number;
  achievements: string[];
}

export const mockCandidates: Candidate[] = [
  {
    id: '1',
    name: 'Maria Rodriguez',
    position: 'City Council District 4',
    district: 'Manhattan District 4',
    party: 'Democratic',
    imageUrl: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=200',
    matchPercentage: 87,
    hasContradictions: false,
    bio: 'Community organizer with 15 years of experience fighting for affordable housing and education funding.',
    keyIssues: ['Affordable Housing', 'Education', 'Transportation'],
    experience: ['Community Board 4 Chair', 'Housing Rights Coalition Director']
  },
  {
    id: '2',
    name: 'James Chen',
    position: 'City Council District 4',
    district: 'Manhattan District 4',
    party: 'Democratic',
    imageUrl: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=200',
    matchPercentage: 62,
    hasContradictions: true,
    bio: 'Former prosecutor turned public defender, focused on criminal justice reform and public safety.',
    keyIssues: ['Criminal Justice Reform', 'Public Safety', 'Small Business'],
    experience: ['ADA Manhattan DA Office', 'Legal Aid Society Attorney']
  },
  {
    id: '3',
    name: 'Sarah Thompson',
    position: 'State Assembly District 75',
    district: 'Brooklyn District 75',
    party: 'Democratic',
    imageUrl: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=200',
    matchPercentage: 91,
    hasContradictions: false,
    bio: 'Environmental lawyer and climate activist working to make NYC carbon neutral by 2030.',
    keyIssues: ['Climate Action', 'Green Jobs', 'Environmental Justice'],
    experience: ['NRDC Senior Attorney', 'Brooklyn Climate Coalition Founder']
  }
];

export const mockElections: Election[] = [
  {
    id: '1',
    title: 'NYC General Election 2024',
    type: 'general',
    date: '2024-11-05',
    status: 'upcoming',
    description: 'Citywide elections for Mayor, City Council, and other local offices.',
    candidates: ['1', '2', '3']
  },
  {
    id: '2',
    title: 'Community Board 4 Elections',
    type: 'micro',
    date: '2024-04-15',
    status: 'upcoming',
    description: 'Local community board elections for Manhattan District 4.',
  },
  {
    id: '3',
    title: 'School Board District 2',
    type: 'micro',
    date: '2024-05-20',
    status: 'upcoming',
    description: 'Parent and community elections for School Board District 2.',
  }
];

export const mockCivicEvents: CivicEvent[] = [
  {
    id: '1',
    title: 'Vote on Bike Lane Expansion',
    subtitle: 'City Council voting on protected bike lanes for your neighborhood this Thursday',
    category: 'Transportation',
    urgency: 'high',
    xpReward: 50,
    date: '2024-03-14'
  },
  {
    id: '2',
    title: 'Complete Your Candidate Quiz',
    subtitle: 'Find your perfect match for the upcoming City Council race',
    category: 'Elections',
    urgency: 'medium',
    xpReward: 25,
    date: '2024-03-13'
  },
  {
    id: '3',
    title: 'Community Board Meeting Tonight',
    subtitle: 'Housing development proposal discussion at 7 PM',
    category: 'Housing',
    urgency: 'medium',
    xpReward: 30,
    date: '2024-03-12'
  },
  {
    id: '4',
    title: 'Ask Your Representative',
    subtitle: 'Submit questions about the new education budget proposal',
    category: 'Education',
    urgency: 'low',
    xpReward: 15,
    date: '2024-03-11'
  }
];

export const mockUserProfile: UserProfile = {
  name: 'Alex Johnson',
  address: '123 Main St, Manhattan, NY 10001',
  district: 'Manhattan District 4',
  xp: 1250,
  level: 8,
  metroPoints: 340,
  streakDays: 12,
  achievements: ['First Vote', 'Quiz Master', 'Community Champion', 'Civic Streak']
};