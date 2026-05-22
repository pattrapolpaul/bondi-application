import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Button } from '../components/Button';
import { Check } from 'lucide-react';
import { useMingle } from '../context/MingleContext';

const AVATAR_COLORS: Record<string, string> = {
  SC: '#FF6B35',
  MJ: '#00D9A3',
  ED: '#9333EA',
  AK: '#4285F4',
  LB: '#FF69B4',
};

export function ConfirmIRL() {
  const navigate = useNavigate();
  const { mingle, updateMingle } = useMingle();

  const acceptedUsers = mingle.invitedUsers.filter(u => u.status === 'accepted');
  const usersWithCheckIn = acceptedUsers.map((user, idx) => ({
    ...user,
    checkedIn: idx < 2,
  }));
  const checkedInCount = usersWithCheckIn.filter(u => u.checkedIn).length;

  useEffect(() => {
    if (!mingle.confirmedUsers || mingle.confirmedUsers.length === 0) {
      updateMingle({ confirmedUsers: usersWithCheckIn.filter(u => u.checkedIn) });
    }
  }, []);

  return (
    <div className="pt-6 space-y-6">
      {/* Confirmed header */}
      <div className="text-center animate-pop-in">
        <div
          className="w-20 h-20 rounded-3xl flex items-center justify-center mb-5 mx-auto shadow-xl shadow-blue-500/30 animate-float"
          style={{ background: 'linear-gradient(135deg, #4285F4 0%, #5B9CF6 100%)' }}
        >
          <Check size={36} className="text-white" strokeWidth={3} />
        </div>
        <h2
          className="text-4xl font-bold mb-2"
          style={{ fontFamily: 'var(--font-display)', color: '#4285F4' }}
        >
          Checked In!
        </h2>
        <p className="text-[var(--muted-foreground)]">You're at the venue — let's go! 🙌</p>
      </div>

      {/* Attendance card */}
      <div
        className="rounded-3xl p-6 border border-white/80 shadow-lg shadow-black/5 animate-slide-up"
        style={{ background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(16px)', animationDelay: '100ms' }}
      >
        <h3 className="font-bold text-lg mb-5" style={{ fontFamily: 'var(--font-display)' }}>
          Who's here?
        </h3>
        <div className="space-y-4">
          {usersWithCheckIn.map((user) => (
            <div key={user.id} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div
                  className="w-11 h-11 rounded-full text-white flex items-center justify-center text-sm font-bold shadow-sm"
                  style={{
                    backgroundColor: AVATAR_COLORS[user.avatar] || '#4285F4',
                    boxShadow: user.checkedIn ? `0 0 0 3px white, 0 0 0 5px ${AVATAR_COLORS[user.avatar] || '#4285F4'}40` : undefined,
                  }}
                >
                  {user.avatar}
                </div>
                <span className="font-semibold">{user.name}</span>
              </div>
              {user.checkedIn ? (
                <div
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold"
                  style={{ background: 'rgba(66, 133, 244, 0.1)', color: '#4285F4' }}
                >
                  <Check size={13} strokeWidth={3} />
                  Here
                </div>
              ) : (
                <span className="text-xs text-[var(--muted-foreground)] px-3 py-1.5 rounded-full bg-[var(--muted)]">
                  On the way...
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Count banner */}
      <div
        className="rounded-2xl px-5 py-4 text-center animate-slide-up"
        style={{
          background: 'linear-gradient(135deg, rgba(66,133,244,0.12), rgba(91,156,246,0.06))',
          animationDelay: '180ms',
        }}
      >
        <p className="text-sm font-bold" style={{ color: '#4285F4' }}>
          <span className="text-2xl" style={{ fontFamily: 'var(--font-display)' }}>
            {checkedInCount} of {acceptedUsers.length}
          </span>{' '}
          friends are already here
        </p>
      </div>

      <Button onClick={() => navigate('/closing-party')}>
        Continue
      </Button>
    </div>
  );
}
