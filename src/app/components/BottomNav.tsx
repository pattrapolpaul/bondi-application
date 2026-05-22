import { useNavigate, useLocation } from 'react-router';
import { Home, Compass, Plus } from 'lucide-react';

export function BottomNav() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const isHome = pathname === '/home';
  const isExplore = pathname === '/explore';

  return (
    <div
      className="flex-shrink-0 h-[76px] flex items-center justify-around px-8 border-t border-white/60 shadow-lg shadow-black/5"
      style={{ background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(20px)' }}
    >
      {/* Home */}
      <button
        onClick={() => navigate('/home')}
        className="flex flex-col items-center gap-1 transition-all active:scale-90"
        aria-label="Home feed"
      >
        <Home
          size={24}
          strokeWidth={isHome ? 2.5 : 1.8}
          style={{ color: isHome ? '#FF6B35' : '#9CA3AF' }}
          fill={isHome ? 'rgba(255,107,53,0.12)' : 'transparent'}
        />
        <span
          className="text-[10px] font-bold"
          style={{ color: isHome ? '#FF6B35' : '#9CA3AF' }}
        >
          Home
        </span>
      </button>

      {/* Mingle — the hero center button */}
      <div className="relative flex items-center justify-center -mt-7">
        {/* Expanding ring animation */}
        <div
          className="absolute w-14 h-14 rounded-full animate-ring"
          style={{ background: 'rgba(255, 107, 53, 0.3)' }}
        />
        <button
          onClick={() => navigate('/create-mingle')}
          className="relative w-16 h-16 rounded-full text-white flex items-center justify-center shadow-xl transition-transform hover:scale-105 active:scale-95 animate-mingle-pulse"
          style={{ background: 'linear-gradient(135deg, #FF6B35 0%, #FF8C5A 100%)' }}
          aria-label="Create a mingle"
        >
          <Plus size={30} strokeWidth={2.5} />
        </button>
        <span
          className="absolute -bottom-5 text-[10px] font-bold"
          style={{ color: '#FF6B35' }}
        >
          Mingle
        </span>
      </div>

      {/* Explore */}
      <button
        onClick={() => navigate('/explore')}
        className="flex flex-col items-center gap-1 transition-all active:scale-90"
        aria-label="Explore venues"
      >
        <Compass
          size={24}
          strokeWidth={isExplore ? 2.5 : 1.8}
          style={{ color: isExplore ? '#FF6B35' : '#9CA3AF' }}
          fill={isExplore ? 'rgba(255,107,53,0.12)' : 'transparent'}
        />
        <span
          className="text-[10px] font-bold"
          style={{ color: isExplore ? '#FF6B35' : '#9CA3AF' }}
        >
          Explore
        </span>
      </button>
    </div>
  );
}
