import { useNavigate } from 'react-router';
import { Button } from '../components/Button';
import { MapPin, Calendar, Users, Sparkles } from 'lucide-react';
import { useMingle } from '../context/MingleContext';

const AVATAR_COLORS: Record<string, string> = {
  SC: '#FF6B35',
  MJ: '#00D9A3',
  ED: '#9333EA',
  AK: '#4285F4',
  LB: '#FF69B4',
};

export function MingleSummary() {
  const navigate = useNavigate();
  const { mingle } = useMingle();
  const acceptedUsers = mingle.invitedUsers.filter(u => u.status === 'accepted');

  return (
    <div className="pt-6 space-y-6">
      {/* Celebration header */}
      <div className="text-center animate-pop-in">
        <div
          className="w-20 h-20 rounded-3xl flex items-center justify-center mb-5 mx-auto shadow-xl shadow-[#00D9A3]/30 animate-float"
          style={{ background: 'linear-gradient(135deg, #00D9A3 0%, #00F0B5 100%)' }}
        >
          <Sparkles size={36} className="text-white" />
        </div>
        <h2
          className="text-4xl font-bold mb-2"
          style={{ fontFamily: 'var(--font-display)', color: '#00D9A3' }}
        >
          Mingle Confirmed!
        </h2>
        <p className="text-[var(--muted-foreground)]">Here's your plan — time to get excited 🎉</p>
      </div>

      {/* Summary card */}
      <div
        className="rounded-3xl p-6 border border-white/80 shadow-lg shadow-black/5 space-y-5 animate-slide-up"
        style={{ background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(16px)', animationDelay: '100ms' }}
      >
        <div className="border-b border-[var(--border)] pb-4">
          <h3
            className="text-2xl font-bold mb-1"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            {mingle.name || 'Mingle'}
          </h3>
          {mingle.description && (
            <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">{mingle.description}</p>
          )}
        </div>

        <div className="space-y-4">
          {mingle.what && (
            <div className="flex items-start gap-4">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: 'rgba(0, 217, 163, 0.12)' }}
              >
                <Sparkles size={18} className="text-[#00D9A3]" />
              </div>
              <div>
                <p className="text-xs font-semibold text-[var(--muted-foreground)] uppercase tracking-wide mb-0.5">Activity</p>
                <p className="font-bold">{mingle.what}</p>
              </div>
            </div>
          )}

          {mingle.where && (
            <div className="flex items-start gap-4">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: 'rgba(0, 217, 163, 0.12)' }}
              >
                <MapPin size={18} className="text-[#00D9A3]" />
              </div>
              <div>
                <p className="text-xs font-semibold text-[var(--muted-foreground)] uppercase tracking-wide mb-0.5">Location</p>
                <p className="font-bold">{mingle.where}</p>
              </div>
            </div>
          )}

          {mingle.finalDate && mingle.finalTime && (
            <div className="flex items-start gap-4">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: 'rgba(0, 217, 163, 0.12)' }}
              >
                <Calendar size={18} className="text-[#00D9A3]" />
              </div>
              <div>
                <p className="text-xs font-semibold text-[var(--muted-foreground)] uppercase tracking-wide mb-0.5">Date & Time</p>
                <p className="font-bold">
                  {new Date(mingle.finalDate).toLocaleDateString('en-US', {
                    weekday: 'long', month: 'long', day: 'numeric', year: 'numeric'
                  })}
                </p>
                <p className="text-sm text-[var(--muted-foreground)]">at {mingle.finalTime}</p>
              </div>
            </div>
          )}

          {acceptedUsers.length > 0 && (
            <div className="flex items-start gap-4">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: 'rgba(0, 217, 163, 0.12)' }}
              >
                <Users size={18} className="text-[#00D9A3]" />
              </div>
              <div className="flex-1">
                <p className="text-xs font-semibold text-[var(--muted-foreground)] uppercase tracking-wide mb-2">
                  Crew ({acceptedUsers.length})
                </p>
                <div className="flex -space-x-2">
                  {acceptedUsers.map((user) => (
                    <div
                      key={user.id}
                      title={user.name}
                      className="w-9 h-9 rounded-full border-2 border-white text-white text-xs font-bold flex items-center justify-center shadow-sm"
                      style={{ backgroundColor: AVATAR_COLORS[user.avatar] || '#FF6B35' }}
                    >
                      {user.avatar}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Notification banner */}
      <div
        className="rounded-2xl px-5 py-4 text-center animate-slide-up"
        style={{ background: 'linear-gradient(135deg, rgba(0,217,163,0.12), rgba(0,240,181,0.08))', animationDelay: '180ms' }}
      >
        <p className="text-sm font-semibold text-[#00D9A3]">
          ✓ All participants notified about the plan
        </p>
      </div>

      <div className="space-y-3">
        <Button onClick={() => navigate('/check-in')}>
          Continue to Check In
        </Button>
        <Button variant="ghost" onClick={() => navigate('/')}>
          Back to Home
        </Button>
      </div>
    </div>
  );
}
