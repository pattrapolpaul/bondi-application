import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Button } from '../components/Button';
import { CalendarPicker } from '../components/CalendarPicker';
import { TimeWheelPicker } from '../components/TimeWheelPicker';
import { Calendar, Clock, Check, Plus, X } from 'lucide-react';
import { useMingle, User } from '../context/MingleContext';

interface TimeSlot {
  id: string;
  startDate: string;
  endDate?: string;
  startTime: string;
  endTime?: string;
  minglerType: 'full-day' | 'half-day' | 'trip' | 'custom';
  suggestedBy: User;
  notes?: string;
  votes: User[];
}

export function PlanningTheWhen() {
  const navigate = useNavigate();
  const { mingle, updateMingle } = useMingle();
  const acceptedUsers = mingle.invitedUsers?.filter(u => u.status === 'accepted') || [];
  const currentUser = acceptedUsers[0] || { id: 'current', name: 'You', avatar: 'Y', isGuest: false }; // Mock: first user is current user

  // Initialize time slots with host's suggestion if available
  const initialSlots: TimeSlot[] = [];
  if (mingle.selectedDate && mingle.minglerType && acceptedUsers.length > 0) {
    const formattedStartTime = `${mingle.selectedHour.toString().padStart(2, '0')}:${mingle.selectedMinute.toString().padStart(2, '0')}`;
    const formattedEndTime = `${mingle.endHour.toString().padStart(2, '0')}:${mingle.endMinute.toString().padStart(2, '0')}`;

    const hostUser = acceptedUsers[0] || { id: 'host', name: 'Host', avatar: 'H', isGuest: false };

    initialSlots.push({
      id: 'host-suggestion',
      startDate: mingle.selectedDate,
      endDate: mingle.endDate || undefined,
      startTime: formattedStartTime,
      endTime: mingle.minglerType === 'half-day' || mingle.minglerType === 'trip' || mingle.minglerType === 'custom' ? formattedEndTime : undefined,
      minglerType: mingle.minglerType,
      suggestedBy: hostUser,
      notes: 'Host suggestion',
      votes: [hostUser],
    });
  }

  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>(initialSlots);
  const [showCreateSlot, setShowCreateSlot] = useState(false);

  // New time slot form state
  const [newStartDate, setNewStartDate] = useState<string>('');
  const [newEndDate, setNewEndDate] = useState<string>('');
  const [newStartHour, setNewStartHour] = useState<number>(19);
  const [newStartMinute, setNewStartMinute] = useState<number>(0);
  const [newEndHour, setNewEndHour] = useState<number>(21);
  const [newEndMinute, setNewEndMinute] = useState<number>(0);
  const [newNotes, setNewNotes] = useState<string>('');
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [calendarType, setCalendarType] = useState<'start' | 'end'>('start');

  const toggleVote = (slotId: string) => {
    setTimeSlots(prev => prev.map(slot => {
      if (slot.id === slotId) {
        const hasVoted = slot.votes.some(u => u.id === currentUser.id);
        return {
          ...slot,
          votes: hasVoted
            ? slot.votes.filter(u => u.id !== currentUser.id)
            : [...slot.votes, currentUser]
        };
      }
      return slot;
    }));
  };

  const createTimeSlot = () => {
    if (!newStartDate) return;

    const newSlot: TimeSlot = {
      id: `slot-${Date.now()}`,
      startDate: newStartDate,
      endDate: newEndDate || undefined,
      startTime: `${newStartHour.toString().padStart(2, '0')}:${newStartMinute.toString().padStart(2, '0')}`,
      endTime: `${newEndHour.toString().padStart(2, '0')}:${newEndMinute.toString().padStart(2, '0')}`,
      minglerType: 'custom',
      suggestedBy: currentUser,
      notes: newNotes.trim() || undefined,
      votes: [currentUser],
    };

    setTimeSlots(prev => [...prev, newSlot]);

    // Reset form
    setNewStartDate('');
    setNewEndDate('');
    setNewStartHour(19);
    setNewStartMinute(0);
    setNewEndHour(21);
    setNewEndMinute(0);
    setNewNotes('');
    setShowCreateSlot(false);
  };

  const formatTimeSlotDisplay = (slot: TimeSlot) => {
    const startDateObj = new Date(slot.startDate);
    const startDateStr = startDateObj.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });

    if (slot.minglerType === 'full-day') {
      return startDateStr;
    }

    if (slot.minglerType === 'half-day') {
      return `${startDateStr}, ${slot.startTime} - ${slot.endTime}`;
    }

    if ((slot.minglerType === 'trip' || slot.minglerType === 'custom') && slot.endDate) {
      const endDateObj = new Date(slot.endDate);
      const endDateStr = endDateObj.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric'
      });
      return `${startDateStr} - ${endDateStr}, ${slot.startTime} - ${slot.endTime}`;
    }

    return `${startDateStr}, ${slot.startTime} - ${slot.endTime}`;
  };

  const handleContinue = () => {
    // Find the time slot with most votes
    const topSlot = timeSlots.reduce((max, slot) =>
      slot.votes.length > max.votes.length ? slot : max
    , timeSlots[0]);

    if (topSlot) {
      updateMingle({
        finalDate: topSlot.startDate,
        finalTime: topSlot.startTime,
      });
    }
    navigate('/mingle-summary');
  };

  const canContinue = timeSlots.length > 0;

  return (
    <div className="pt-8 space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-[var(--accent)] mb-1">The When</h2>
        <p className="text-[var(--muted-foreground)]">
          {mingle.name ? `for ${mingle.name}` : 'Decide when to meet'}
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

      {mingle.where && (
        <div className="bg-white rounded-xl p-4 border-l-4 border-l-[var(--accent)]">
          <div className="flex items-center gap-2">
            <Check size={16} className="text-[var(--accent)]" />
            <span className="font-medium">{mingle.where}</span>
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl p-5 shadow-sm border-l-4 border-l-[var(--accent)]">
        <div className="mb-4">
          <h3 className="font-bold text-lg mb-1 flex items-center gap-2">
            <Clock size={20} />
            When to meet?
          </h3>
          <p className="text-sm text-[var(--muted-foreground)]">Vote for a time or suggest a new one</p>
        </div>

        {/* Time Slots */}
        <div className="space-y-3 mb-4">
          {timeSlots.map((slot) => (
            <div
              key={slot.id}
              className="border border-[var(--border)] rounded-lg p-4"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <p className="font-medium mb-1">{formatTimeSlotDisplay(slot)}</p>
                  {slot.notes && (
                    <p className="text-sm text-[var(--muted-foreground)] mb-2">{slot.notes}</p>
                  )}
                  <p className="text-xs text-[var(--muted-foreground)]">
                    Suggested by {slot.suggestedBy.name}
                  </p>
                </div>
                <button
                  onClick={() => toggleVote(slot.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    slot.votes.some(u => u.id === currentUser.id)
                      ? 'bg-[var(--accent)] text-white'
                      : 'border border-[var(--border)] hover:border-[var(--accent)]'
                  }`}
                >
                  I'm in ({slot.votes.length})
                </button>
              </div>

              {/* Show voters */}
              {slot.votes.length > 0 && (
                <div className="flex items-center gap-2 pt-3 border-t border-[var(--border)]">
                  <div className="flex -space-x-2">
                    {slot.votes.map((user) => (
                      <div
                        key={user.id}
                        className="w-8 h-8 rounded-full bg-[var(--accent)] text-white flex items-center justify-center text-xs font-medium border-2 border-white"
                        title={user.name}
                      >
                        {user.avatar}
                      </div>
                    ))}
                  </div>
                  <span className="text-xs text-[var(--muted-foreground)]">
                    {slot.votes.map(u => u.name).join(', ')}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Add new time slot button */}
        {!showCreateSlot && (
          <button
            onClick={() => setShowCreateSlot(true)}
            className="w-full p-3 border-2 border-dashed border-[var(--border)] rounded-lg hover:border-[var(--accent)] transition-colors flex items-center justify-center gap-2 text-[var(--accent)] font-medium"
          >
            <Plus size={20} />
            Suggest Another Time
          </button>
        )}

        {/* Create new time slot form */}
        {showCreateSlot && (
          <div className="border-2 border-[var(--accent)] rounded-lg p-4 space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-bold">Suggest a Time</h4>
              <button
                onClick={() => setShowCreateSlot(false)}
                className="p-1 hover:bg-[var(--muted)] rounded transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Date Selection */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="text-xs font-medium mb-2 text-[var(--muted-foreground)]">Start Date</p>
                <button
                  onClick={() => {
                    setCalendarType('start');
                    setIsCalendarOpen(true);
                  }}
                  className="w-full p-2 rounded-lg border border-[var(--border)] hover:border-[var(--accent)] transition-colors text-left text-sm"
                >
                  {newStartDate ? (
                    new Date(newStartDate).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                    })
                  ) : (
                    <span className="text-[var(--muted-foreground)]">Select</span>
                  )}
                </button>
              </div>
              <div>
                <p className="text-xs font-medium mb-2 text-[var(--muted-foreground)]">End Date (Optional)</p>
                <button
                  onClick={() => {
                    setCalendarType('end');
                    setIsCalendarOpen(true);
                  }}
                  className="w-full p-2 rounded-lg border border-[var(--border)] hover:border-[var(--accent)] transition-colors text-left text-sm"
                >
                  {newEndDate ? (
                    new Date(newEndDate).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                    })
                  ) : (
                    <span className="text-[var(--muted-foreground)]">Select</span>
                  )}
                </button>
              </div>
            </div>

            {/* Time Selection */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="text-xs font-medium mb-2 text-[var(--muted-foreground)]">Start Time</p>
                <TimeWheelPicker
                  selectedHour={newStartHour}
                  selectedMinute={newStartMinute}
                  onTimeChange={(h, m) => {
                    setNewStartHour(h);
                    setNewStartMinute(m);
                  }}
                />
              </div>
              <div>
                <p className="text-xs font-medium mb-2 text-[var(--muted-foreground)]">End Time</p>
                <TimeWheelPicker
                  selectedHour={newEndHour}
                  selectedMinute={newEndMinute}
                  onTimeChange={(h, m) => {
                    setNewEndHour(h);
                    setNewEndMinute(m);
                  }}
                />
              </div>
            </div>

            {/* Notes */}
            <div>
              <p className="text-xs font-medium mb-2 text-[var(--muted-foreground)]">
                Notes (optional, max 200 words)
              </p>
              <textarea
                className="w-full p-3 rounded-lg border border-[var(--border)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] transition-all resize-none text-sm"
                rows={3}
                maxLength={1000}
                placeholder="Add any notes about this time..."
                value={newNotes}
                onChange={(e) => setNewNotes(e.target.value)}
              />
              <p className="text-xs text-[var(--muted-foreground)] mt-1">
                {newNotes.split(/\s+/).filter(Boolean).length} / 200 words
              </p>
            </div>

            <Button onClick={createTimeSlot} disabled={!newStartDate}>
              Create Time Slot
            </Button>
          </div>
        )}

        <p className="text-xs text-[var(--muted-foreground)] mt-3">
          50%+ votes auto-locks the time
        </p>
      </div>

      <CalendarPicker
        isOpen={isCalendarOpen}
        onClose={() => setIsCalendarOpen(false)}
        onSelectDate={(date) => {
          if (calendarType === 'start') {
            setNewStartDate(date);
          } else {
            setNewEndDate(date);
          }
          setIsCalendarOpen(false);
        }}
        selectedDate={calendarType === 'start' ? newStartDate : newEndDate}
      />

      <Button
        onClick={handleContinue}
        className={!canContinue ? 'opacity-50' : ''}
        disabled={!canContinue}
      >
        Confirm Mingle
      </Button>
    </div>
  );
}
