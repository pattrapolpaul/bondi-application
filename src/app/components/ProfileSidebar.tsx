import { useNavigate } from 'react-router';
import { User, Clock, Image, Settings, X, LogOut } from 'lucide-react';

interface ProfileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const menuItems = [
  { icon: User, label: 'Your Profile', color: '#FF6B35', desc: 'Edit info, avatar & bio' },
  { icon: Clock, label: 'Mingle History', color: '#00D9A3', desc: '12 mingles completed' },
  { icon: Image, label: 'Memory', color: '#9333EA', desc: 'Photos & moments' },
  { icon: Settings, label: 'Settings', color: '#4285F4', desc: 'Notifications, privacy' },
];

export function ProfileSidebar({ isOpen, onClose }: ProfileSidebarProps) {
  const navigate = useNavigate();

  const handleLogout = () => {
    onClose();
    navigate('/');
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="absolute inset-0 z-40 transition-all duration-300"
        style={{
          background: isOpen ? 'rgba(0,0,0,0.35)' : 'transparent',
          backdropFilter: isOpen ? 'blur(4px)' : 'none',
          pointerEvents: isOpen ? 'auto' : 'none',
        }}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Sidebar panel */}
      <div
        className="absolute top-0 left-0 bottom-0 z-50 w-[78%] max-w-xs flex flex-col overflow-hidden transition-transform duration-300 ease-out"
        style={{
          background: 'rgba(255,252,248,0.97)',
          backdropFilter: 'blur(24px)',
          transform: isOpen ? 'translateX(0)' : 'translateX(-100%)',
          boxShadow: isOpen ? '8px 0 32px rgba(0,0,0,0.15)' : 'none',
        }}
      >
        {/* Header */}
        <div
          className="flex-shrink-0 px-6 pt-12 pb-6 relative"
          style={{ background: 'linear-gradient(135deg, #FF6B35 0%, #FF8C5A 100%)' }}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center transition-colors"
            style={{ background: 'rgba(255,255,255,0.2)' }}
            aria-label="Close sidebar"
          >
            <X size={16} className="text-white" />
          </button>

          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center text-white font-bold text-xl mb-4 shadow-md"
            style={{ background: 'rgba(255,255,255,0.25)' }}
          >
            AJ
          </div>
          <p className="font-bold text-white text-lg leading-tight" style={{ fontFamily: 'var(--font-display)' }}>
            Alex Johnson
          </p>
          <p className="text-orange-100 text-sm">@alexj · Bangkok</p>

          <div className="flex gap-5 mt-4">
            <div className="text-center">
              <p className="font-bold text-white text-lg leading-none" style={{ fontFamily: 'var(--font-display)' }}>12</p>
              <p className="text-orange-100 text-xs">Mingles</p>
            </div>
            <div className="text-center">
              <p className="font-bold text-white text-lg leading-none" style={{ fontFamily: 'var(--font-display)' }}>8</p>
              <p className="text-orange-100 text-xs">Friends</p>
            </div>
            <div className="text-center">
              <p className="font-bold text-white text-lg leading-none" style={{ fontFamily: 'var(--font-display)' }}>47</p>
              <p className="text-orange-100 text-xs">Memories</p>
            </div>
          </div>
        </div>

        {/* Menu */}
        <div className="flex-1 overflow-y-auto p-4 space-y-1">
          {menuItems.map(({ icon: Icon, label, color, desc }) => (
            <button
              key={label}
              onClick={onClose}
              className="w-full flex items-center gap-4 p-4 rounded-2xl hover:bg-[var(--muted)] transition-all active:scale-[0.98] text-left group"
            >
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-105"
                style={{ background: `${color}18` }}
              >
                <Icon size={20} style={{ color }} />
              </div>
              <div>
                <p className="font-bold text-sm">{label}</p>
                <p className="text-xs text-[var(--muted-foreground)]">{desc}</p>
              </div>
            </button>
          ))}
        </div>

        {/* Logout */}
        <div className="flex-shrink-0 p-4 border-t border-[var(--border)]">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 p-3 rounded-2xl text-[var(--muted-foreground)] hover:text-red-500 hover:bg-red-50 transition-all text-sm font-semibold"
          >
            <LogOut size={18} />
            Log out
          </button>
        </div>
      </div>
    </>
  );
}
