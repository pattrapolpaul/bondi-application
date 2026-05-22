import { useNavigate } from 'react-router';
import { Button } from '../components/Button';
import { Camera, Image, Check, Sparkles } from 'lucide-react';
import { useMingle } from '../context/MingleContext';

export function ContentShare() {
  const navigate = useNavigate();
  const { mingle, resetMingle } = useMingle();

  const handleComplete = () => {
    resetMingle();
    navigate('/');
  };

  return (
    <div className="pt-6 space-y-6">
      <div className="animate-slide-up">
        <h2
          className="text-4xl font-bold mb-1"
          style={{ fontFamily: 'var(--font-display)', color: '#9333EA' }}
        >
          Share Memories
        </h2>
        <p className="text-[var(--muted-foreground)]">
          {mingle.name ? `from ${mingle.name}` : 'Upload photos from your mingle'}
        </p>
      </div>

      {/* Photo upload card */}
      <div
        className="rounded-3xl p-6 border border-white/80 shadow-lg shadow-black/5 space-y-5 animate-slide-up"
        style={{ background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(16px)', animationDelay: '60ms' }}
      >
        <h3 className="font-bold text-lg" style={{ fontFamily: 'var(--font-display)' }}>Add Photos</h3>

        <div className="grid grid-cols-3 gap-3">
          <button
            className="aspect-square rounded-2xl border-2 border-dashed hover:border-purple-400 transition-all flex flex-col items-center justify-center gap-1.5 group"
            style={{ borderColor: 'rgba(147,51,234,0.3)', background: 'rgba(147,51,234,0.04)' }}
          >
            <Camera size={22} className="text-purple-400 group-hover:scale-110 transition-transform" />
            <span className="text-xs text-[var(--muted-foreground)] font-medium">Camera</span>
          </button>
          <button
            className="aspect-square rounded-2xl border-2 border-dashed hover:border-purple-400 transition-all flex flex-col items-center justify-center gap-1.5 group"
            style={{ borderColor: 'rgba(147,51,234,0.3)', background: 'rgba(147,51,234,0.04)' }}
          >
            <Image size={22} className="text-purple-400 group-hover:scale-110 transition-transform" />
            <span className="text-xs text-[var(--muted-foreground)] font-medium">Gallery</span>
          </button>
          {/* Placeholder filled slot */}
          <div
            className="aspect-square rounded-2xl flex items-center justify-center text-3xl"
            style={{ background: 'linear-gradient(135deg, rgba(147,51,234,0.15), rgba(192,132,252,0.1))' }}
          >
            🌟
          </div>
        </div>

        <p className="text-xs text-[var(--muted-foreground)] text-center">
          Tap to add photos or videos from this mingle
        </p>
      </div>

      {/* Privacy note */}
      <div
        className="rounded-2xl px-5 py-4 flex items-center gap-3 animate-slide-up"
        style={{
          background: 'linear-gradient(135deg, rgba(147,51,234,0.1), rgba(192,132,252,0.06))',
          animationDelay: '120ms',
        }}
      >
        <Check size={18} style={{ color: '#9333EA' }} className="flex-shrink-0" />
        <p className="text-sm font-semibold" style={{ color: '#9333EA' }}>
          Memories shared only with your attendees
        </p>
      </div>

      {/* Completion banner */}
      <div
        className="rounded-2xl px-5 py-5 text-center animate-slide-up"
        style={{
          background: 'linear-gradient(135deg, #FF6B35, #FF8C5A)',
          animationDelay: '160ms',
        }}
      >
        <Sparkles size={24} className="text-white mx-auto mb-2" />
        <p className="font-bold text-white text-lg" style={{ fontFamily: 'var(--font-display)' }}>
          Thanks for using Bondi!
        </p>
        <p className="text-sm text-orange-100 mt-1">
          See you at the next mingle 🙌
        </p>
      </div>

      <div className="space-y-3">
        <Button onClick={handleComplete}>
          Share & Complete
        </Button>
        <Button variant="ghost" onClick={handleComplete}>
          Skip for now
        </Button>
      </div>
    </div>
  );
}
