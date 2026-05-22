import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Button } from '../components/Button';
import { Copy, Check, Zap } from 'lucide-react';
import { useMingle, User as UserType } from '../context/MingleContext';

const MOCK_USERS: UserType[] = [
  { id: '1', name: 'Sarah Chen', avatar: 'SC', isGuest: false, status: 'accepted' },
  { id: '2', name: 'Mike Johnson', avatar: 'MJ', isGuest: false, status: 'accepted' },
  { id: '3', name: 'Emma Davis', avatar: 'ED', isGuest: true, status: 'accepted' },
  { id: '4', name: 'Alex Kim', avatar: 'AK', isGuest: false, status: 'pending' },
  { id: '5', name: 'Lisa Brown', avatar: 'LB', isGuest: false, status: 'accepted' },
];

const AVATAR_COLORS: Record<string, string> = {
  SC: '#FF6B35',
  MJ: '#00D9A3',
  ED: '#9333EA',
  AK: '#4285F4',
  LB: '#FF69B4',
};

export function InviteFriends() {
  const navigate = useNavigate();
  const { mingle, updateMingle } = useMingle();
  const [copied, setCopied] = useState(false);
  const [newJoin, setNewJoin] = useState<string | null>(null);
  const link = `bondi.app/mingle/${mingle.id || 'xyz'}`;

  useEffect(() => {
    if (mingle.invitedUsers.length === 0) {
      updateMingle({ invitedUsers: MOCK_USERS });
    }
    // Simulate a live join notification
    const timer = setTimeout(() => setNewJoin("Alex just joined! 🎉"), 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(link);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      const textArea = document.createElement('textarea');
      textArea.value = link;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand('copy');
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (e) {
        console.error('Failed to copy:', e);
      }
      document.body.removeChild(textArea);
    }
  };

  const users = mingle.invitedUsers.length > 0 ? mingle.invitedUsers : MOCK_USERS;
  const acceptedUsers = users.filter(u => u.status === 'accepted');
  const pendingUsers = users.filter(u => u.status === 'pending');

  return (
    <div className="pt-6 space-y-6">
      <div className="animate-slide-up">
        <h1
          className="text-4xl font-bold mb-1"
          style={{ fontFamily: 'var(--font-display)', color: '#FF6B35' }}
        >
          Invite Friends
        </h1>
        <p className="text-[var(--muted-foreground)]">
          {mingle.name ? `to ${mingle.name}` : 'Share this link with your group'}
        </p>
      </div>

      {/* Live notification */}
      {newJoin && (
        <div
          className="flex items-center gap-3 px-4 py-3 rounded-2xl border border-[#00D9A3]/30 animate-slide-up shadow-sm"
          style={{ background: 'rgba(0, 217, 163, 0.08)' }}
        >
          <Zap size={16} className="text-[#00D9A3] flex-shrink-0" />
          <p className="text-sm font-semibold text-[#00D9A3]">{newJoin}</p>
        </div>
      )}

      {/* Accepted avatar stack */}
      {acceptedUsers.length > 0 && (
        <div
          className="rounded-2xl p-5 border border-white/80 shadow-md shadow-black/5 animate-slide-up"
          style={{ background: 'rgba(255,255,255,0.75)', backdropFilter: 'blur(12px)' }}
        >
          <p className="text-xs font-semibold text-[var(--muted-foreground)] uppercase tracking-wide mb-3">
            Already in ✓
          </p>
          <div className="flex items-center gap-3">
            <div className="flex -space-x-3">
              {acceptedUsers.map((user) => (
                <div
                  key={user.id}
                  className="w-11 h-11 rounded-full border-2 border-white text-white text-xs font-bold flex items-center justify-center shadow-sm"
                  style={{ backgroundColor: AVATAR_COLORS[user.avatar] || '#FF6B35' }}
                >
                  {user.avatar}
                </div>
              ))}
            </div>
            <div>
              <p className="font-bold text-[var(--foreground)]">
                {acceptedUsers.length} friend{acceptedUsers.length !== 1 ? 's' : ''} in
              </p>
              {pendingUsers.length > 0 && (
                <p className="text-xs text-[var(--muted-foreground)]">
                  {pendingUsers.length} still pending
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Share link */}
      <div
        className="rounded-2xl p-4 border border-white/80 shadow-sm flex items-center justify-between animate-slide-up"
        style={{ background: 'rgba(255,255,255,0.75)', backdropFilter: 'blur(8px)' }}
      >
        <span className="text-sm text-[var(--muted-foreground)] truncate mr-3">{link}</span>
        <button
          onClick={handleCopy}
          className="flex-shrink-0 p-2.5 rounded-xl transition-all active:scale-95"
          style={{ background: copied ? 'rgba(0,217,163,0.12)' : 'rgba(255,107,53,0.08)' }}
        >
          {copied
            ? <Check size={18} className="text-[#00D9A3]" />
            : <Copy size={18} className="text-[#FF6B35]" />
          }
        </button>
      </div>

      <div className="space-y-3">
        <Button>Share to Line</Button>
        <Button variant="ghost">Share via WhatsApp</Button>
      </div>

      <p className="text-center text-xs text-[var(--muted-foreground)]">
        or copy link above and paste anywhere
      </p>

      {/* Friend list */}
      {users.length > 0 && (
        <div
          className="rounded-2xl p-4 border border-white/80 shadow-md shadow-black/5"
          style={{ background: 'rgba(255,255,255,0.75)', backdropFilter: 'blur(12px)' }}
        >
          <h3 className="text-sm font-bold mb-4">
            Invited ({acceptedUsers.length}/{users.length} accepted)
          </h3>
          <div className="space-y-3">
            {users.map((user) => (
              <div key={user.id} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-full text-white flex items-center justify-center text-sm font-bold shadow-sm"
                    style={{ backgroundColor: AVATAR_COLORS[user.avatar] || '#FF6B35' }}
                  >
                    {user.avatar}
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{user.name}</p>
                    {user.isGuest && (
                      <p className="text-xs text-[var(--muted-foreground)]">Guest</p>
                    )}
                  </div>
                </div>
                <span
                  className={`text-xs px-3 py-1 rounded-full font-semibold ${
                    user.status === 'accepted'
                      ? 'text-[#00D9A3]'
                      : 'text-amber-600'
                  }`}
                  style={{
                    background: user.status === 'accepted'
                      ? 'rgba(0, 217, 163, 0.1)'
                      : 'rgba(245, 158, 11, 0.1)',
                  }}
                >
                  {user.status === 'accepted' ? '✓ Accepted' : 'Pending'}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      <Button onClick={() => {
        const hasDecidedActivities = mingle.activities.length > 0 &&
          !mingle.activities.includes('Not decided');
        if (hasDecidedActivities) {
          navigate('/planning-where');
        } else {
          navigate('/planning-what');
        }
      }}>
        Continue to Planning
      </Button>
    </div>
  );
}
