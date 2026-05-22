import { useNavigate } from 'react-router';
import { Button } from '../components/Button';
import { MapPin, Check, Navigation } from 'lucide-react';
import { useMingle } from '../context/MingleContext';

export function CheckIn() {
  const navigate = useNavigate();
  const { mingle } = useMingle();

  return (
    <div className="pt-6 space-y-6">
      <div className="animate-slide-up">
        <h2
          className="text-4xl font-bold mb-1"
          style={{ fontFamily: 'var(--font-display)', color: '#00D9A3' }}
        >
          Check In
        </h2>
        <p className="text-[var(--muted-foreground)]">
          {mingle.name ? `for ${mingle.name}` : 'Confirm your attendance at the venue'}
        </p>
      </div>

      {/* Confirmed details */}
      {(mingle.what || mingle.where || (mingle.finalDate && mingle.finalTime)) && (
        <div className="space-y-2.5 animate-slide-up" style={{ animationDelay: '60ms' }}>
          {mingle.what && (
            <div
              className="rounded-2xl p-4 flex items-center gap-3 border-l-4"
              style={{ borderLeftColor: '#00D9A3', background: 'rgba(255,255,255,0.75)', backdropFilter: 'blur(8px)' }}
            >
              <Check size={18} className="text-[#00D9A3] flex-shrink-0" />
              <span className="font-semibold">{mingle.what}</span>
            </div>
          )}

          {mingle.where && (
            <div
              className="rounded-2xl p-4 flex items-center gap-3 border-l-4"
              style={{ borderLeftColor: '#00D9A3', background: 'rgba(255,255,255,0.75)', backdropFilter: 'blur(8px)' }}
            >
              <Check size={18} className="text-[#00D9A3] flex-shrink-0" />
              <span className="font-semibold">{mingle.where}</span>
            </div>
          )}

          {mingle.finalDate && mingle.finalTime && (
            <div
              className="rounded-2xl p-4 flex items-center gap-3 border-l-4"
              style={{ borderLeftColor: '#00D9A3', background: 'rgba(255,255,255,0.75)', backdropFilter: 'blur(8px)' }}
            >
              <Check size={18} className="text-[#00D9A3] flex-shrink-0" />
              <span className="font-semibold">
                {new Date(mingle.finalDate).toLocaleDateString('en-US', {
                  weekday: 'long', month: 'short', day: 'numeric'
                })} at {mingle.finalTime}
              </span>
            </div>
          )}
        </div>
      )}

      {/* Venue map card */}
      <div
        className="rounded-3xl p-6 border border-white/80 shadow-lg shadow-black/5 animate-slide-up"
        style={{ background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(16px)', animationDelay: '120ms' }}
      >
        <h3 className="font-bold text-lg mb-4" style={{ fontFamily: 'var(--font-display)' }}>
          Ready to check in?
        </h3>

        <div
          className="rounded-2xl p-4 flex items-center gap-4 mb-4"
          style={{ background: 'linear-gradient(135deg, rgba(0,217,163,0.12), rgba(0,240,181,0.06))' }}
        >
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm animate-pulse-glow"
            style={{ background: 'linear-gradient(135deg, #00D9A3, #00F0B5)' }}
          >
            <MapPin size={22} className="text-white" />
          </div>
          <div>
            <p className="font-bold text-[var(--foreground)]">{mingle.where || 'Venue'}</p>
            <p className="text-sm text-[var(--muted-foreground)] flex items-center gap-1 mt-0.5">
              <Navigation size={12} />
              123 Sports Street
            </p>
          </div>
        </div>

        <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">
          Check in when you arrive to let your friends know you're there — they're counting on you! 💪
        </p>
      </div>

      <Button onClick={() => navigate('/confirm-irl')}>
        Check In at Venue
      </Button>
    </div>
  );
}
