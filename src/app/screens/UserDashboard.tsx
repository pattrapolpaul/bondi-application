import { useNavigate } from 'react-router';
import { Button } from '../components/Button';
import { Plus, Calendar, MapPin, Users, Clock, Image, History, ChevronRight, Tag, Sparkles } from 'lucide-react';

interface UpcomingMingle {
  id: string;
  name: string;
  activity: string;
  location: string;
  date: string;
  time: string;
  attendees: { avatar: string; color: string }[];
}

interface ExploreItem {
  id: string;
  type: 'venue' | 'blog';
  title: string;
  description: string;
  tag?: string;
  image: string;
}

const ACTIVITY_COLORS: Record<string, string> = {
  'SC': '#FF6B35',
  'MJ': '#00D9A3',
  'ED': '#9333EA',
  'AK': '#4285F4',
  'LB': '#FF69B4',
};

export function UserDashboard() {
  const navigate = useNavigate();

  const upcomingMingle: UpcomingMingle | null = {
    id: '1',
    name: 'Weekend Badminton',
    activity: 'Sport',
    location: 'Tops Café',
    date: 'May 25, 2026',
    time: '19:00',
    attendees: [
      { avatar: 'SC', color: '#FF6B35' },
      { avatar: 'MJ', color: '#00D9A3' },
      { avatar: 'ED', color: '#9333EA' },
      { avatar: 'AK', color: '#4285F4' },
    ],
  };

  const activityFeed = [
    { name: 'Maya', action: 'just joined your mingle', time: '2m ago', avatar: 'MJ', color: '#00D9A3' },
    { name: 'Sarah', action: 'voted for Central Sports Hub', time: '8m ago', avatar: 'SC', color: '#FF6B35' },
  ];

  const exploreIdeas: ExploreItem[] = [
    {
      id: '1',
      type: 'venue',
      title: 'Central Sports Hub',
      description: '20% off for group bookings this month',
      tag: 'Special Offer',
      image: 'https://images.unsplash.com/photo-1775993167393-f2add1f8eec2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcG9ydHMlMjBjZW50ZXIlMjBiYWRtaW50b24lMjBpbmRvb3J8ZW58MXx8fHwxNzc5MzUwMDkzfDA&ixlib=rb-4.1.0&q=80&w=400',
    },
    {
      id: '2',
      type: 'blog',
      title: 'One Day Trip in Bangkok',
      description: 'Explore the best spots for a perfect day out with friends',
      image: 'https://images.unsplash.com/photo-1540660235365-083e8894cec4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxCYW5na29rJTIwVGhhaWxhbmQlMjB0ZW1wbGUlMjB0cmF2ZWx8ZW58MXx8fHwxNzc5MzUwMDk3fDA&ixlib=rb-4.1.0&q=80&w=400',
    },
    {
      id: '3',
      type: 'venue',
      title: 'Sunset Rooftop Bar',
      description: 'Happy hour specials for groups of 4+',
      tag: 'Limited Time',
      image: 'https://images.unsplash.com/photo-1719682251752-eb9551977e4d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb29mdG9wJTIwYmFyJTIwc3Vuc2V0JTIwY2l0eSUyMHNreWxpbmV8ZW58MXx8fHwxNzc5MzUwMTAxfDA&ixlib=rb-4.1.0&q=80&w=400',
    },
    {
      id: '4',
      type: 'blog',
      title: 'Top 10 Brunch Spots',
      description: 'Perfect places for weekend catch-ups',
      image: 'https://images.unsplash.com/photo-1664192578382-8216149bd4d5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicnVuY2glMjBjYWZlJTIwZm9vZCUyMGJyZWFrZmFzdHxlbnwxfHx8fDE3NzkzNTAxMDV8MA&ixlib=rb-4.1.0&q=80&w=400',
    },
  ];

  return (
    <div className="pt-6 space-y-6">
      {/* Greeting */}
      <div className="animate-slide-up">
        <p className="text-sm text-[var(--muted-foreground)] font-medium">Good evening 👋</p>
        <h1
          className="text-4xl font-bold leading-tight"
          style={{ fontFamily: 'var(--font-display)', color: '#FF6B35' }}
        >
          Let's Mingle!
        </h1>
      </div>

      {/* Activity Feed — human moments */}
      {activityFeed.length > 0 && (
        <div className="space-y-2 animate-slide-up" style={{ animationDelay: '60ms' }}>
          {activityFeed.map((item, i) => (
            <div
              key={i}
              className="flex items-center gap-3 px-4 py-3 rounded-2xl border border-white/80 shadow-sm"
              style={{ background: 'rgba(255,255,255,0.65)', backdropFilter: 'blur(8px)' }}
            >
              <div
                className="w-9 h-9 rounded-full text-white text-xs font-bold flex items-center justify-center flex-shrink-0 animate-pulse-glow"
                style={{ backgroundColor: item.color }}
              >
                {item.avatar}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-[var(--foreground)]">
                  <span className="font-bold">{item.name}</span>{' '}
                  <span className="text-[var(--muted-foreground)]">{item.action}</span>
                </p>
              </div>
              <span className="text-xs text-[var(--muted-foreground)] flex-shrink-0">{item.time}</span>
            </div>
          ))}
        </div>
      )}

      {/* Primary CTA Hero Card */}
      <div
        className="rounded-3xl p-6 text-white shadow-xl shadow-[#FF6B35]/20 animate-slide-up"
        style={{
          background: 'linear-gradient(135deg, #FF6B35 0%, #FF8C5A 60%, #FFB347 100%)',
          animationDelay: '120ms',
        }}
      >
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4 animate-float"
          style={{ background: 'rgba(255,255,255,0.22)' }}
        >
          <Plus size={28} />
        </div>
        <h2 className="text-2xl font-bold mb-1" style={{ fontFamily: 'var(--font-display)' }}>
          Start a Mingle
        </h2>
        <p className="text-sm mb-5 opacity-85 leading-relaxed">
          Bring your friends together for activities, hangouts, and adventures
        </p>
        <Button
          onClick={() => navigate('/create-mingle')}
          className="bg-white text-black hover:bg-white/90 shadow-none"
          style={{ background: 'white', boxShadow: 'none' }}
        >
          Create Mingle
        </Button>
      </div>

      {/* Upcoming Mingle */}
      <div className="animate-slide-up" style={{ animationDelay: '160ms' }}>
        <h2 className="text-lg font-bold mb-3">Upcoming Mingle</h2>

        {upcomingMingle ? (
          <div
            className="rounded-2xl p-5 border border-white/80 shadow-md shadow-black/5"
            style={{ background: 'rgba(255,255,255,0.75)', backdropFilter: 'blur(12px)' }}
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-bold mb-1" style={{ fontFamily: 'var(--font-display)' }}>
                  {upcomingMingle.name}
                </h3>
                <span
                  className="px-2.5 py-0.5 rounded-full text-xs font-semibold text-white"
                  style={{ background: 'linear-gradient(90deg, #00D9A3, #00F0B5)' }}
                >
                  {upcomingMingle.activity}
                </span>
              </div>

              {/* Avatar stack */}
              <div className="flex -space-x-2.5">
                {upcomingMingle.attendees.map((a) => (
                  <div
                    key={a.avatar}
                    className="w-9 h-9 rounded-full border-2 border-white text-white text-xs font-bold flex items-center justify-center shadow-sm"
                    style={{ backgroundColor: a.color }}
                  >
                    {a.avatar}
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-[var(--muted-foreground)]">
                <Calendar size={15} className="text-[#00D9A3]" />
                <span className="font-medium text-[var(--foreground)]">{upcomingMingle.date}</span>
                <Clock size={15} className="text-[#00D9A3] ml-2" />
                <span className="font-medium text-[var(--foreground)]">{upcomingMingle.time}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <MapPin size={15} className="text-[#00D9A3]" />
                <span className="text-[var(--muted-foreground)]">{upcomingMingle.location}</span>
              </div>
            </div>
          </div>
        ) : (
          <div
            className="rounded-2xl p-8 text-center border border-dashed border-[var(--border)]"
            style={{ background: 'rgba(255,255,255,0.5)' }}
          >
            <div className="text-4xl mb-3">🌟</div>
            <p className="font-semibold text-[var(--foreground)] mb-1">No mingles yet</p>
            <p className="text-sm text-[var(--muted-foreground)]">
              Create one and get your crew together!
            </p>
          </div>
        )}
      </div>

      {/* Quick Access */}
      <div className="grid grid-cols-2 gap-3 animate-slide-up" style={{ animationDelay: '200ms' }}>
        <button
          className="rounded-2xl p-5 border border-white/80 hover:border-[#9333EA]/30 transition-all flex flex-col items-center gap-3 group shadow-sm"
          style={{ background: 'rgba(255,255,255,0.65)', backdropFilter: 'blur(8px)' }}
        >
          <div className="w-12 h-12 rounded-2xl bg-purple-500/10 flex items-center justify-center group-hover:scale-110 transition-transform">
            <Image size={22} className="text-purple-500" />
          </div>
          <span className="font-semibold text-sm">Your Memory</span>
        </button>

        <button
          className="rounded-2xl p-5 border border-white/80 hover:border-[#FF6B35]/30 transition-all flex flex-col items-center gap-3 group shadow-sm"
          style={{ background: 'rgba(255,255,255,0.65)', backdropFilter: 'blur(8px)' }}
        >
          <div className="w-12 h-12 rounded-2xl bg-[#FF6B35]/10 flex items-center justify-center group-hover:scale-110 transition-transform">
            <History size={22} className="text-[#FF6B35]" />
          </div>
          <span className="font-semibold text-sm">Mingle History</span>
        </button>
      </div>

      {/* Explore Ideas */}
      <div className="animate-slide-up" style={{ animationDelay: '240ms' }}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold flex items-center gap-2">
            <Sparkles size={18} className="text-[#FF6B35]" />
            Explore Ideas
          </h2>
          <button className="text-sm text-[#00D9A3] font-semibold flex items-center gap-1">
            See All
            <ChevronRight size={16} />
          </button>
        </div>

        <div className="overflow-x-auto -mx-5 px-5 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          <div className="flex gap-4 pb-2">
            {exploreIdeas.map((item) => (
              <button
                key={item.id}
                className="flex-shrink-0 w-68 rounded-2xl overflow-hidden border border-white/80 hover:border-[#00D9A3]/40 transition-all text-left shadow-md shadow-black/5 hover:-translate-y-0.5 active:scale-[0.98]"
                style={{ background: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(8px)', width: '268px' }}
              >
                <div className="w-full h-44 relative overflow-hidden bg-[var(--muted)]">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.25) 0%, transparent 60%)' }} />
                  {item.tag && (
                    <span className="absolute top-3 left-3 flex items-center gap-1 px-3 py-1.5 text-white rounded-full text-xs font-bold shadow-lg"
                      style={{ background: 'linear-gradient(135deg, #FF6B35, #FF4500)' }}>
                      <Tag size={11} />
                      {item.tag}
                    </span>
                  )}
                </div>

                <div className="p-4">
                  <h3 className="font-bold text-base mb-1.5">{item.title}</h3>
                  <p className="text-sm text-[var(--muted-foreground)] line-clamp-2 mb-3 leading-relaxed">
                    {item.description}
                  </p>
                  <span className={`text-sm font-semibold inline-flex items-center gap-1 ${
                    item.type === 'venue' ? 'text-[#FF6B35]' : 'text-[#00D9A3]'
                  }`}>
                    {item.type === 'venue' ? 'View Offer' : 'Read More'}
                    <ChevronRight size={14} />
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="pb-4">
        <button
          onClick={() => navigate('/')}
          className="w-full text-center text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
        >
          Log out
        </button>
      </div>
    </div>
  );
}
