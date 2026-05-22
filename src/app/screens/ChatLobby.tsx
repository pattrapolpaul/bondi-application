import { useState } from 'react';
import { Search, ChevronRight, Users } from 'lucide-react';

interface Conversation {
  id: string;
  name: string;
  avatar: string;
  color: string;
  lastMessage: string;
  time: string;
  unread: number;
  isGroup: boolean;
  memberCount?: number;
  activity?: string;
}

const CONVERSATIONS: Conversation[] = [
  {
    id: '1',
    name: 'Weekend Badminton',
    avatar: 'WB',
    color: '#FF6B35',
    lastMessage: "Sarah: See you all at 7pm! 🏸",
    time: '2m',
    unread: 3,
    isGroup: true,
    memberCount: 5,
    activity: 'Sport',
  },
  {
    id: '2',
    name: 'Rooftop Dinner Club',
    avatar: 'RD',
    color: '#9333EA',
    lastMessage: "Tom: Who's picking the wine? 🍷",
    time: '18m',
    unread: 1,
    isGroup: true,
    memberCount: 4,
    activity: 'Eat',
  },
  {
    id: '3',
    name: 'Sarah Chen',
    avatar: 'SC',
    color: '#00D9A3',
    lastMessage: "Are you coming to the hike tomorrow?",
    time: '1h',
    unread: 0,
    isGroup: false,
  },
  {
    id: '4',
    name: 'Sunrise Hike Crew',
    avatar: 'SH',
    color: '#4285F4',
    lastMessage: "Emma: 4am pickup confirmed ⛰️",
    time: '3h',
    unread: 0,
    isGroup: true,
    memberCount: 5,
    activity: 'Wellness',
  },
  {
    id: '5',
    name: 'Mike Johnson',
    avatar: 'MJ',
    color: '#F59E0B',
    lastMessage: "That board game place was so fun 😂",
    time: '1d',
    unread: 0,
    isGroup: false,
  },
  {
    id: '6',
    name: 'Game Night Squad',
    avatar: 'GN',
    color: '#EF4444',
    lastMessage: "Alex: Same time next week?",
    time: '2d',
    unread: 0,
    isGroup: true,
    memberCount: 7,
    activity: 'Chill',
  },
];

const ACTIVITY_COLORS: Record<string, string> = {
  Sport: '#00D9A3',
  Eat: '#FF6B35',
  Drink: '#9333EA',
  Wellness: '#4285F4',
  Chill: '#F59E0B',
  Learn: '#EF4444',
};

export function ChatLobby() {
  const [query, setQuery] = useState('');

  const filtered = CONVERSATIONS.filter(c =>
    c.name.toLowerCase().includes(query.toLowerCase()) ||
    c.lastMessage.toLowerCase().includes(query.toLowerCase())
  );

  const totalUnread = CONVERSATIONS.reduce((sum, c) => sum + c.unread, 0);

  return (
    <div className="pt-2 pb-4">
      {/* Header */}
      <div className="mb-5 flex items-end justify-between">
        <div>
          <h1
            className="text-3xl font-bold mb-0.5"
            style={{ fontFamily: 'var(--font-display)', color: '#FF6B35' }}
          >
            Messages
          </h1>
          <p className="text-sm text-[var(--muted-foreground)]">
            {totalUnread > 0 ? `${totalUnread} unread messages` : 'All caught up!'}
          </p>
        </div>
        {totalUnread > 0 && (
          <span
            className="w-8 h-8 rounded-full text-white flex items-center justify-center text-sm font-bold shadow-md"
            style={{ background: 'linear-gradient(135deg, #FF6B35, #FF4500)' }}
          >
            {totalUnread}
          </span>
        )}
      </div>

      {/* Search */}
      <div
        className="flex items-center gap-3 px-4 h-12 rounded-2xl mb-5 border border-white/80 shadow-sm"
        style={{ background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(12px)' }}
      >
        <Search size={18} className="text-[var(--muted-foreground)] flex-shrink-0" />
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search conversations…"
          className="flex-1 bg-transparent text-sm focus:outline-none placeholder-[var(--muted-foreground)]"
        />
      </div>

      {/* Conversation list */}
      <div className="space-y-2">
        {filtered.map((convo) => (
          <button
            key={convo.id}
            className="w-full flex items-center gap-3.5 p-4 rounded-2xl border border-white/80 shadow-sm text-left transition-all active:scale-[0.98] hover:border-[var(--accent)]/20"
            style={{
              background: convo.unread > 0
                ? 'rgba(255,255,255,0.9)'
                : 'rgba(255,255,255,0.65)',
              backdropFilter: 'blur(12px)',
            }}
          >
            {/* Avatar */}
            <div className="relative flex-shrink-0">
              <div
                className="w-12 h-12 rounded-2xl text-white flex items-center justify-center text-sm font-bold shadow-sm"
                style={{ backgroundColor: convo.color }}
              >
                {convo.avatar}
              </div>
              {convo.isGroup && (
                <div
                  className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-white flex items-center justify-center"
                  style={{ background: convo.activity ? ACTIVITY_COLORS[convo.activity] : '#9CA3AF' }}
                >
                  <Users size={10} className="text-white" />
                </div>
              )}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-0.5">
                <span className={`text-sm leading-tight truncate pr-2 ${convo.unread > 0 ? 'font-bold' : 'font-semibold'}`}>
                  {convo.name}
                </span>
                <span className="text-xs text-[var(--muted-foreground)] flex-shrink-0">{convo.time}</span>
              </div>
              <div className="flex items-center justify-between">
                <p
                  className={`text-xs truncate pr-2 ${convo.unread > 0 ? 'text-[var(--foreground)] font-medium' : 'text-[var(--muted-foreground)]'}`}
                >
                  {convo.lastMessage}
                </p>
                {convo.unread > 0 ? (
                  <span
                    className="flex-shrink-0 w-5 h-5 rounded-full text-white flex items-center justify-center font-bold"
                    style={{ fontSize: 10, background: 'linear-gradient(135deg, #FF6B35, #FF4500)' }}
                  >
                    {convo.unread}
                  </span>
                ) : (
                  <ChevronRight size={15} className="text-[var(--muted-foreground)] flex-shrink-0" />
                )}
              </div>
              {convo.isGroup && convo.memberCount && (
                <p className="text-[10px] text-[var(--muted-foreground)] mt-0.5">
                  {convo.memberCount} members · Mingle group
                </p>
              )}
            </div>
          </button>
        ))}

        {filtered.length === 0 && (
          <div className="text-center py-12">
            <div className="text-5xl mb-4">💬</div>
            <p className="font-bold text-lg" style={{ fontFamily: 'var(--font-display)' }}>No conversations</p>
            <p className="text-sm text-[var(--muted-foreground)] mt-1">Start a mingle to chat with your group</p>
          </div>
        )}
      </div>
    </div>
  );
}
