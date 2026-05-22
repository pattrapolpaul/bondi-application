import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Button } from '../components/Button';
import { Star, ThumbsUp, ThumbsDown } from 'lucide-react';
import { useMingle } from '../context/MingleContext';

export function RateShare() {
  const navigate = useNavigate();
  const { mingle } = useMingle();
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [recommend, setRecommend] = useState<'yes' | 'no' | null>(null);

  const activeRating = hoveredRating || rating;

  const ratingLabels = ['', 'Meh', 'OK', 'Good', 'Great', 'Amazing! 🔥'];

  return (
    <div className="pt-6 space-y-6">
      <div className="animate-slide-up">
        <h2
          className="text-4xl font-bold mb-1"
          style={{ fontFamily: 'var(--font-display)', color: '#9333EA' }}
        >
          Rate & Share
        </h2>
        <p className="text-[var(--muted-foreground)]">
          {mingle.name ? `How was ${mingle.name}?` : 'How was your experience?'}
        </p>
      </div>

      {/* Star rating */}
      <div
        className="rounded-3xl p-6 border border-white/80 shadow-lg shadow-black/5 space-y-5 text-center animate-slide-up"
        style={{ background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(16px)', animationDelay: '60ms' }}
      >
        <div>
          <p className="font-bold text-lg mb-4" style={{ fontFamily: 'var(--font-display)' }}>Rate this mingle</p>

          <div className="flex justify-center gap-2 mb-3">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoveredRating(star)}
                onMouseLeave={() => setHoveredRating(0)}
                className="transition-all duration-150 hover:scale-125 active:scale-110"
              >
                <Star
                  size={44}
                  className="transition-all duration-150"
                  style={{
                    fill: star <= activeRating ? '#FBBF24' : 'transparent',
                    color: star <= activeRating ? '#FBBF24' : '#D1D5DB',
                    filter: star <= activeRating ? 'drop-shadow(0 2px 4px rgba(251,191,36,0.4))' : 'none',
                  }}
                />
              </button>
            ))}
          </div>

          {activeRating > 0 && (
            <p className="text-sm font-semibold text-amber-500 animate-pop-in">
              {ratingLabels[activeRating]}
            </p>
          )}
        </div>

        <div className="border-t border-[var(--border)] pt-5 text-left">
          <p className="font-bold mb-3">Share your thoughts</p>
          <textarea
            className="w-full p-4 rounded-2xl border border-[var(--border)] focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all resize-none text-sm leading-relaxed"
            rows={3}
            placeholder="What did you enjoy most about this mingle?"
            style={{ background: 'rgba(249, 245, 255, 0.6)' }}
          />
        </div>

        <div className="text-left">
          <p className="font-bold mb-3">Would you do it again?</p>
          <div className="flex gap-3">
            <button
              onClick={() => setRecommend('yes')}
              className={`flex-1 py-3.5 rounded-2xl font-semibold flex items-center justify-center gap-2 transition-all ${
                recommend === 'yes' ? 'text-white shadow-lg shadow-purple-500/30' : 'border border-[var(--border)] text-[var(--muted-foreground)]'
              }`}
              style={recommend === 'yes' ? { background: 'linear-gradient(135deg, #7C3AED, #9333EA)' } : {}}
            >
              <ThumbsUp size={18} />
              Absolutely
            </button>
            <button
              onClick={() => setRecommend('no')}
              className={`flex-1 py-3.5 rounded-2xl font-semibold flex items-center justify-center gap-2 transition-all ${
                recommend === 'no' ? 'bg-[var(--muted)] text-[var(--foreground)]' : 'border border-[var(--border)] text-[var(--muted-foreground)]'
              }`}
            >
              <ThumbsDown size={18} />
              Not really
            </button>
          </div>
        </div>
      </div>

      <Button onClick={() => navigate('/content-share')}>
        Continue to Share Photos
      </Button>
    </div>
  );
}
