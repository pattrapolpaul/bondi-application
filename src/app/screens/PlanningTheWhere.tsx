import { useNavigate } from 'react-router';
import { Avatar } from '../components/Avatar';
import { Button } from '../components/Button';
import { Check } from 'lucide-react';
import { useMingle } from '../context/MingleContext';

export function PlanningTheWhere() {
  const navigate = useNavigate();
  const { mingle, updateMingle } = useMingle();

  const venues = [
    { name: 'Tops Café', votes: 3, isLeading: true },
    { name: 'Central Sports Hub', votes: 2, isLeading: false },
    { name: 'Green Park Courts', votes: 1, isLeading: false },
  ];

  const acceptedUsers = mingle.invitedUsers.filter(u => u.status === 'accepted');

  return (
    <div className="pt-8 space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-[var(--accent)] mb-1">The Where</h2>
        <p className="text-[var(--muted-foreground)]">
          {mingle.name ? `for ${mingle.name}` : 'Decide where to meet'}
        </p>

        <div className="flex justify-center gap-2 my-6">
          {acceptedUsers.map((user) => (
            <div
              key={user.id}
              className="w-9 h-9 rounded-full bg-[var(--accent)] text-white flex items-center justify-center text-sm font-medium"
            >
              {user.avatar}
            </div>
          ))}
        </div>
      </div>

      {mingle.what && (
        <div className="bg-white rounded-xl p-4 border-l-4 border-l-[var(--accent)]">
          <div className="flex items-center gap-2 mb-2">
            <Check size={16} className="text-[var(--accent)]" />
            <span className="font-medium">{mingle.what}</span>
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl p-5 shadow-sm border-l-4 border-l-[var(--accent)]">
        <div className="mb-4">
          <div className="flex items-center justify-between mb-1">
            <h3 className="font-bold text-lg">Where to go?</h3>
            <span className="text-xs bg-[var(--muted)] px-2 py-1 rounded">AI suggested</span>
          </div>
        </div>

        <div className="space-y-2 mb-4">
          {venues.map((venue, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between p-3 rounded-lg hover:bg-[var(--muted)] transition-colors"
            >
              <span>{venue.name}</span>
              <button
                className={`px-4 py-1.5 rounded-full text-sm ${
                  venue.isLeading
                    ? 'bg-[var(--accent)] text-white'
                    : 'border border-[var(--border)] text-[var(--foreground)]'
                }`}
              >
                I'm in {venue.isLeading && `(${venue.votes})`}
              </button>
            </div>
          ))}
        </div>

        <div className="flex justify-between text-sm">
          <button className="text-[var(--accent)] font-medium">+ Suggest</button>
          <button className="text-[var(--muted-foreground)]">Ask AI</button>
        </div>
      </div>

      <Button onClick={() => {
        const leadingVenue = venues.find(v => v.isLeading) || venues[0];
        updateMingle({ where: leadingVenue.name });
        navigate('/planning-when');
      }}>
        Continue to When
      </Button>
    </div>
  );
}
