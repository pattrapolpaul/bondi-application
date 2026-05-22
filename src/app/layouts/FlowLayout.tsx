import { Outlet, useNavigate } from 'react-router';
import { ArrowLeft } from 'lucide-react';

export function FlowLayout() {
  const navigate = useNavigate();
  return (
    <div className="h-full flex flex-col overflow-hidden">
      {/* Minimal header with back button */}
      <div className="flex-shrink-0 h-14 flex items-center px-5">
        <button
          onClick={() => navigate(-1)}
          className="w-9 h-9 rounded-xl flex items-center justify-center transition-colors hover:bg-white/60"
          style={{ backdropFilter: 'blur(8px)' }}
        >
          <ArrowLeft size={20} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] px-5">
        <Outlet />
        <div className="h-8" />
      </div>
    </div>
  );
}
