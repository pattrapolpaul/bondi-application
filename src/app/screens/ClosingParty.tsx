import { useNavigate } from 'react-router';
import { Button } from '../components/Button';
import { useMingle } from '../context/MingleContext';

const CONFETTI_COLORS = ['#FF6B35', '#00D9A3', '#FFD700', '#FF69B4', '#9333EA', '#4285F4', '#FF8C5A', '#00F0B5'];

const AVATAR_COLORS: Record<string, string> = {
  SC: '#FF6B35',
  MJ: '#00D9A3',
  ED: '#9333EA',
  AK: '#4285F4',
  LB: '#FF69B4',
};

function ConfettiPiece({ color, left, delay, duration, size }: {
  color: string; left: string; delay: string; duration: string; size: number;
}) {
  return (
    <div
      className="absolute top-0 rounded-sm animate-confetti"
      style={{
        backgroundColor: color,
        left,
        width: size,
        height: size * 1.4,
        animationDelay: delay,
        animationDuration: duration,
        opacity: 0,
      }}
    />
  );
}

function Confetti() {
  const pieces = Array.from({ length: 28 }, (_, i) => ({
    id: i,
    color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
    left: `${(i * 3.7) % 100}%`,
    delay: `${(i * 0.12) % 2.5}s`,
    duration: `${2.5 + (i % 4) * 0.4}s`,
    size: 6 + (i % 4) * 2,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {pieces.map((p) => (
        <ConfettiPiece key={p.id} color={p.color} left={p.left} delay={p.delay} duration={p.duration} size={p.size} />
      ))}
    </div>
  );
}

export function ClosingParty() {
  const navigate = useNavigate();
  const { mingle } = useMingle();

  const attendees = mingle.confirmedUsers?.length > 0
    ? mingle.confirmedUsers
    : mingle.invitedUsers.filter(u => u.status === 'accepted');

  return (
    <div className="pt-6 space-y-6">
      {/* Celebration hero */}
      <div
        className="relative rounded-3xl p-8 text-white text-center overflow-hidden shadow-2xl shadow-purple-500/20 animate-pop-in"
        style={{ background: 'linear-gradient(135deg, #7C3AED 0%, #9333EA 50%, #C084FC 100%)' }}
      >
        <Confetti />

        <div className="relative z-10">
          <div
            className="text-5xl mb-4 animate-float inline-block"
            style={{ animationDuration: '2.5s' }}
          >
            🎉
          </div>
          <h2
            className="text-4xl font-bold mb-2"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Great Mingle!
          </h2>
          <p className="text-purple-100 text-base">
            You made it happen. That's what it's all about.
          </p>
        </div>
      </div>

      {/* Attendees card */}
      <div
        className="rounded-3xl p-6 border border-white/80 shadow-lg shadow-black/5 space-y-5 animate-slide-up"
        style={{ background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(16px)', animationDelay: '100ms' }}
      >
        <h3 className="font-bold text-xl" style={{ fontFamily: 'var(--font-display)' }}>
          {mingle.name || 'Mingle'}
        </h3>

        {/* Avatar stack with glow */}
        <div className="flex justify-center py-2">
          <div className="flex -space-x-4">
            {attendees.map((user, i) => (
              <div
                key={user.id}
                className="w-14 h-14 rounded-full border-3 border-white text-white flex items-center justify-center text-sm font-bold shadow-lg"
                style={{
                  backgroundColor: AVATAR_COLORS[user.avatar] || '#9333EA',
                  borderWidth: 3,
                  borderColor: 'white',
                  zIndex: attendees.length - i,
                  boxShadow: `0 4px 12px ${AVATAR_COLORS[user.avatar] || '#9333EA'}50`,
                }}
              >
                {user.avatar}
              </div>
            ))}
          </div>
        </div>

        <div
          className="rounded-2xl p-4 text-center"
          style={{ background: 'linear-gradient(135deg, rgba(147,51,234,0.1), rgba(192,132,252,0.06))' }}
        >
          <p className="text-2xl font-bold mb-0.5" style={{ fontFamily: 'var(--font-display)', color: '#9333EA' }}>
            {attendees.length} friends
          </p>
          <p className="text-sm text-[var(--muted-foreground)]">spent quality time together</p>
        </div>
      </div>

      {/* Share prompt */}
      <div
        className="rounded-2xl px-5 py-4 text-center animate-slide-up"
        style={{ background: 'rgba(255,255,255,0.6)', backdropFilter: 'blur(8px)', animationDelay: '180ms' }}
      >
        <p className="text-sm text-[var(--muted-foreground)]">
          📸 Share your experience and photos with the group
        </p>
      </div>

      <Button onClick={() => navigate('/rate-share')}>
        Rate & Share Experience
      </Button>
    </div>
  );
}
