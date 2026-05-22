import { useNavigate } from 'react-router';
import { Button } from '../components/Button';
import { Archive } from 'lucide-react';
import { useMingle } from '../context/MingleContext';

export function ArchiveIRL() {
  const navigate = useNavigate();
  const { mingle } = useMingle();

  return (
    <div className="pt-8 space-y-8">
      <div className="text-center">
        <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mb-4 mx-auto">
          <Archive size={32} className="text-white" />
        </div>
        <h2 className="text-2xl font-bold mb-2" style={{ color: '#4285F4' }}>Archive Mingle</h2>
        <p className="text-[var(--muted-foreground)]">Save this mingle to your history</p>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm border border-[var(--border)] space-y-4">
        <h3 className="font-bold text-lg">{mingle.name || 'Mingle'}</h3>

        <div className="space-y-2 text-sm">
          {mingle.what && (
            <div className="flex justify-between">
              <span className="text-[var(--muted-foreground)]">Activity</span>
              <span className="font-medium">{mingle.what}</span>
            </div>
          )}
          {mingle.where && (
            <div className="flex justify-between">
              <span className="text-[var(--muted-foreground)]">Venue</span>
              <span className="font-medium">{mingle.where}</span>
            </div>
          )}
          {mingle.finalDate && mingle.finalTime && (
            <div className="flex justify-between">
              <span className="text-[var(--muted-foreground)]">Date & Time</span>
              <span className="font-medium">
                {new Date(mingle.finalDate).toLocaleDateString('en-US', { weekday: 'long' })} {mingle.finalTime}
              </span>
            </div>
          )}
          <div className="flex justify-between">
            <span className="text-[var(--muted-foreground)]">Attendees</span>
            <span className="font-medium">{mingle.confirmedUsers?.length || mingle.invitedUsers.filter(u => u.status === 'accepted').length} people</span>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <Button onClick={() => navigate('/closing-party')}>
          Archive & Continue
        </Button>
        <Button variant="ghost" onClick={() => navigate('/')}>
          Skip to Home
        </Button>
      </div>
    </div>
  );
}
