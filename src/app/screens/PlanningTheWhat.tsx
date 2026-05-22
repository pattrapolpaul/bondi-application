import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Avatar } from '../components/Avatar';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { useMingle } from '../context/MingleContext';

export function PlanningTheWhat() {
  const navigate = useNavigate();
  const { mingle, updateMingle } = useMingle();
  const [suggestion, setSuggestion] = useState('');

  const suggestions = mingle.activities.length > 0
    ? mingle.activities.map(activity => ({ text: activity, votes: Math.floor(Math.random() * 3) + 1, isLeading: false }))
    : [
        { text: 'Badminton', votes: 3, isLeading: true },
        { text: 'Tennis', votes: 1, isLeading: false },
      ];

  const acceptedUsers = mingle.invitedUsers.filter(u => u.status === 'accepted');

  return (
    <div className="pt-8 space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-[var(--accent)] mb-1">The What</h2>
        <p className="text-[var(--muted-foreground)]">
          {mingle.name ? `for ${mingle.name}` : 'Decide what to do'}
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

      <div className="bg-white rounded-xl p-5 shadow-sm border-l-4 border-l-[var(--accent)]">
        <div className="mb-4">
          <h3 className="font-bold text-lg mb-1">What to do?</h3>
          <p className="text-sm text-[var(--muted-foreground)]">Suggest to the group</p>
        </div>

        <Input
          placeholder="Add your suggestion"
          value={suggestion}
          onChange={(e) => setSuggestion(e.target.value)}
          className="mb-4"
        />

        <div className="space-y-2 mb-4">
          {suggestions.map((item, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between p-3 rounded-lg hover:bg-[var(--muted)] transition-colors"
            >
              <span>{item.text}</span>
              <button
                className={`px-4 py-1.5 rounded-full text-sm ${
                  item.isLeading
                    ? 'bg-[var(--accent)] text-white'
                    : 'border border-[var(--border)] text-[var(--foreground)]'
                }`}
              >
                I'm in {item.isLeading && `(${item.votes})`}
              </button>
            </div>
          ))}
        </div>

        <div className="flex justify-between text-sm">
          <button className="text-[var(--accent)] font-medium">+ Suggest</button>
          <button className="text-[var(--muted-foreground)]">Ask AI</button>
        </div>

        <p className="text-xs text-[var(--muted-foreground)] mt-3">50%+ auto-locks</p>
      </div>

      <Button onClick={() => {
        const leadingSuggestion = suggestions.find(s => s.isLeading) || suggestions[0];
        updateMingle({ what: leadingSuggestion?.text });
        navigate('/planning-where');
      }}>
        Continue to Where
      </Button>
    </div>
  );
}
