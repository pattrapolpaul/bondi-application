import { useNavigate } from 'react-router';
import { Button } from '../components/Button';
import { Avatar } from '../components/Avatar';
import { Check, X } from 'lucide-react';
import { useMingle } from '../context/MingleContext';

export function JoinRespond() {
  const navigate = useNavigate();
  const { mingle } = useMingle();

  const acceptedCount = mingle.invitedUsers.filter(u => u.status === 'accepted').length;
  const totalCount = mingle.invitedUsers.length;

  return (
    <div className="pt-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-[var(--bondi-orange)] mb-2">Responses</h1>
        <p className="text-[var(--muted-foreground)]">
          {mingle.name ? `for ${mingle.name}` : "See who's joining your mingle"}
        </p>
      </div>

      <div className="space-y-3">
        {mingle.invitedUsers.map((person) => (
          <div
            key={person.id}
            className="bg-white rounded-xl p-4 shadow-sm border border-[var(--border)] flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[var(--bondi-orange)] text-white flex items-center justify-center text-sm font-medium">
                {person.avatar}
              </div>
              <div>
                <span className="font-medium">{person.name}</span>
                {person.isGuest && (
                  <p className="text-xs text-[var(--muted-foreground)]">Guest</p>
                )}
              </div>
            </div>
            {person.status === 'accepted' && (
              <div className="flex items-center gap-2 text-[var(--accent)]">
                <Check size={20} />
                <span className="text-sm">Accepted</span>
              </div>
            )}
            {person.status === 'pending' && (
              <span className="text-sm text-[var(--muted-foreground)]">Pending</span>
            )}
            {person.status === 'declined' && (
              <div className="flex items-center gap-2 text-[var(--destructive)]">
                <X size={20} />
                <span className="text-sm">Declined</span>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="bg-[var(--accent)]/10 rounded-lg p-4">
        <p className="text-sm text-center">
          <span className="font-bold text-[var(--accent)]">{acceptedCount} of {totalCount}</span> friends have accepted
        </p>
      </div>

      <Button onClick={() => navigate('/planning-what')}>
        Start Planning
      </Button>
    </div>
  );
}
