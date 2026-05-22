import { useNavigate } from 'react-router';
import { MessageCircle } from 'lucide-react';

interface TopNavProps {
  onProfileClick: () => void;
}

export function TopNav({ onProfileClick }: TopNavProps) {
  const navigate = useNavigate();

  return (
    <div className="flex-shrink-0 h-14 flex items-center justify-between px-5">
      {/* Profile button */}
      <button
        onClick={onProfileClick}
        className="w-10 h-10 rounded-full text-white flex items-center justify-center font-bold text-sm shadow-md shadow-[#FF6B35]/25 transition-transform active:scale-95"
        style={{ background: 'linear-gradient(135deg, #FF6B35, #FF8C5A)' }}
        aria-label="Open profile"
      >
        AJ
      </button>

      {/* Wordmark */}
      <h1
        className="text-2xl font-bold tracking-tight"
        style={{ fontFamily: 'var(--font-display)', color: '#FF6B35' }}
      >
        Bondi
      </h1>

      {/* Chat button */}
      <button
        onClick={() => navigate('/chat')}
        className="relative w-10 h-10 rounded-full flex items-center justify-center border border-white/80 shadow-sm transition-transform active:scale-95"
        style={{ background: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(8px)' }}
        aria-label="Open chat"
      >
        <MessageCircle size={20} className="text-[var(--foreground)]" />
        {/* Unread badge */}
        <span
          className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full text-white flex items-center justify-center font-bold"
          style={{ fontSize: 9, background: 'linear-gradient(135deg, #FF6B35, #FF4500)' }}
        >
          3
        </span>
      </button>
    </div>
  );
}
