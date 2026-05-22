import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Chip } from '../components/Chip';
import { CalendarPicker } from '../components/CalendarPicker';
import { TimeWheelPicker } from '../components/TimeWheelPicker';
import { Calendar, Clock } from 'lucide-react';
import { useMingle } from '../context/MingleContext';

const activityTypes = ['Eat', 'Drink', 'Sport', 'Wellness', 'Chill', 'Learn', 'Other', 'Not decided'];

export function CreateMingle() {
  const navigate = useNavigate();
  const { mingle, updateMingle } = useMingle();
  const [name, setName] = useState(mingle.name);
  const [description, setDescription] = useState(mingle.description);
  const [selectedActivities, setSelectedActivities] = useState<string[]>(mingle.activities);

  // Date and time selection
  const [showDateTime, setShowDateTime] = useState(false);
  const [minglerType, setMingleType] = useState<'full-day' | 'half-day' | 'trip' | 'custom'>(mingle.minglerType);
  const [selectedDate, setSelectedDate] = useState<string>(mingle.selectedDate);
  const [endDate, setEndDate] = useState<string>(mingle.endDate);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [calendarType, setCalendarType] = useState<'start' | 'end'>('start');
  const [selectedHour, setSelectedHour] = useState<number>(mingle.selectedHour);
  const [selectedMinute, setSelectedMinute] = useState<number>(mingle.selectedMinute);
  const [endHour, setEndHour] = useState<number>(mingle.endHour);
  const [endMinute, setEndMinute] = useState<number>(mingle.endMinute);

  const handleTimeChange = (hour: number, minute: number) => {
    setSelectedHour(hour);
    setSelectedMinute(minute);
  };

  const handleEndTimeChange = (hour: number, minute: number) => {
    setEndHour(hour);
    setEndMinute(minute);
  };

  const formattedStartTime = `${selectedHour.toString().padStart(2, '0')}:${selectedMinute.toString().padStart(2, '0')}`;
  const formattedEndTime = `${endHour.toString().padStart(2, '0')}:${endMinute.toString().padStart(2, '0')}`;

  const toggleActivity = (activity: string) => {
    setSelectedActivities(prev => {
      // If clicking on currently selected activity, deselect it
      if (prev.includes(activity)) {
        return prev.filter(a => a !== activity);
      }

      // If selecting "Not decided", clear all other activities
      if (activity === 'Not decided') {
        return ['Not decided'];
      }

      // If selecting any other activity, remove "Not decided" and add the new activity
      return [...prev.filter(a => a !== 'Not decided'), activity];
    });
  };

  const removeActivity = (activity: string) => {
    setSelectedActivities(prev => prev.filter(a => a !== activity));
  };

  return (
    <div className="pt-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-[var(--bondi-orange)] mb-2">Create Mingle</h1>
        <p className="text-[var(--muted-foreground)]">Start planning your next gathering</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">
            Mingle name <span className="text-[var(--bondi-orange)]">*</span>
          </label>
          <Input
            placeholder="Mingle name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="relative">
          <div className="w-full min-h-[100px] px-4 py-3 rounded-lg bg-white border border-[var(--border)] focus-within:ring-2 focus-within:ring-[var(--bondi-orange)] transition-all">
            {selectedActivities.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-2">
                {selectedActivities.map((activity) => (
                  <span
                    key={activity}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-[var(--bondi-orange)] text-white text-sm rounded-full"
                  >
                    {activity}
                    <button
                      onClick={() => removeActivity(activity)}
                      className="hover:bg-white/20 rounded-full p-0.5 transition-colors"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}
            <textarea
              className="w-full resize-none focus:outline-none text-sm bg-transparent"
              placeholder="What do you want to do?"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={2}
            />
          </div>
        </div>

        <div className="overflow-x-auto -mx-5 px-5 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          <div className="flex gap-2">
            {activityTypes.map((activity) => (
              <Chip
                key={activity}
                label={activity}
                selected={selectedActivities.includes(activity)}
                onClick={() => toggleActivity(activity)}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-5 shadow-sm border border-[var(--border)]">
        <button
          onClick={() => setShowDateTime(!showDateTime)}
          className="w-full flex items-center justify-between mb-4"
        >
          <div>
            <h3 className="font-bold text-lg mb-1 text-left">Suggested Date & Time (Optional)</h3>
            <p className="text-xs text-[var(--muted-foreground)] text-left">
              {showDateTime ? 'This can be changed later when everyone joins' : 'Click to add a suggested date & time'}
            </p>
          </div>
          <div className={`transform transition-transform ${showDateTime ? 'rotate-180' : ''}`}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </button>

        {showDateTime && (
          <>
            {/* Mingle Type Selection */}
            <div className="mb-4">
              <h4 className="text-sm font-medium mb-3">Mingle Type</h4>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setMingleType('full-day')}
                  className={`p-3 rounded-lg text-sm font-medium transition-all ${
                    minglerType === 'full-day'
                      ? 'bg-[var(--bondi-orange)] text-white'
                      : 'border border-[var(--border)] hover:border-[var(--bondi-orange)]'
                  }`}
                >
                  Full-day
                </button>
                <button
                  onClick={() => setMingleType('half-day')}
                  className={`p-3 rounded-lg text-sm font-medium transition-all ${
                    minglerType === 'half-day'
                      ? 'bg-[var(--bondi-orange)] text-white'
                      : 'border border-[var(--border)] hover:border-[var(--bondi-orange)]'
                  }`}
                >
                  Half-day
                </button>
                <button
                  onClick={() => setMingleType('trip')}
                  className={`p-3 rounded-lg text-sm font-medium transition-all ${
                    minglerType === 'trip'
                      ? 'bg-[var(--bondi-orange)] text-white'
                      : 'border border-[var(--border)] hover:border-[var(--bondi-orange)]'
                  }`}
                >
                  Trip
                </button>
                <button
                  onClick={() => setMingleType('custom')}
                  className={`p-3 rounded-lg text-sm font-medium transition-all ${
                    minglerType === 'custom'
                      ? 'bg-[var(--bondi-orange)] text-white'
                      : 'border border-[var(--border)] hover:border-[var(--bondi-orange)]'
                  }`}
                >
                  Custom
                </button>
              </div>
            </div>

            {/* Date Selection */}
            <div className="mb-4">
              <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
                <Calendar size={16} />
                Date
              </h4>
              <div className={minglerType === 'trip' || minglerType === 'custom' ? 'grid grid-cols-2 gap-3' : ''}>
                <div>
                  <p className="text-xs font-medium mb-2 text-[var(--muted-foreground)]">
                    {minglerType === 'trip' || minglerType === 'custom' ? 'Start Date' : 'Date'}
                  </p>
                  <button
                    onClick={() => {
                      setCalendarType('start');
                      setIsCalendarOpen(true);
                    }}
                    className="w-full p-3 rounded-lg border border-[var(--border)] hover:border-[var(--bondi-orange)] transition-colors text-left"
                  >
                    {selectedDate ? (
                      <span className="text-sm font-medium">
                        {new Date(selectedDate).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </span>
                    ) : (
                      <span className="text-sm text-[var(--muted-foreground)]">Select date</span>
                    )}
                  </button>
                </div>
                {(minglerType === 'trip' || minglerType === 'custom') && (
                  <div>
                    <p className="text-xs font-medium mb-2 text-[var(--muted-foreground)]">End Date</p>
                    <button
                      onClick={() => {
                        setCalendarType('end');
                        setIsCalendarOpen(true);
                      }}
                      className="w-full p-3 rounded-lg border border-[var(--border)] hover:border-[var(--bondi-orange)] transition-colors text-left"
                    >
                      {endDate ? (
                        <span className="text-sm font-medium">
                          {new Date(endDate).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </span>
                      ) : (
                        <span className="text-sm text-[var(--muted-foreground)]">Select date</span>
                      )}
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Time Selection */}
            {(minglerType === 'half-day' || minglerType === 'trip' || minglerType === 'custom') && (
              <div>
                <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
                  <Clock size={16} />
                  Time
                </h4>
                <div className={minglerType === 'half-day' || minglerType === 'trip' || minglerType === 'custom' ? 'grid grid-cols-2 gap-3' : ''}>
                  <div>
                    <p className="text-xs font-medium mb-2 text-[var(--muted-foreground)]">Start Time</p>
                    <TimeWheelPicker
                      selectedHour={selectedHour}
                      selectedMinute={selectedMinute}
                      onTimeChange={handleTimeChange}
                    />
                  </div>
                  {(minglerType === 'half-day' || minglerType === 'trip' || minglerType === 'custom') && (
                    <div>
                      <p className="text-xs font-medium mb-2 text-[var(--muted-foreground)]">End Time</p>
                      <TimeWheelPicker
                        selectedHour={endHour}
                        selectedMinute={endMinute}
                        onTimeChange={handleEndTimeChange}
                      />
                    </div>
                  )}
                </div>
                {selectedDate && (
                  <div className="mt-3 p-2 bg-[var(--bondi-orange)]/10 rounded-lg text-center">
                    <p className="text-sm font-medium text-[var(--bondi-orange)]">
                      Suggested: {' '}
                      {minglerType === 'full-day' && selectedDate && (
                        `${new Date(selectedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`
                      )}
                      {minglerType === 'half-day' && selectedDate && (
                        `${new Date(selectedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}, ${formattedStartTime} to ${formattedEndTime}`
                      )}
                      {minglerType === 'trip' && selectedDate && endDate && (
                        `${new Date(selectedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${new Date(endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}, ${formattedStartTime} to ${formattedEndTime}`
                      )}
                      {minglerType === 'custom' && selectedDate && endDate && (
                        `${new Date(selectedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${new Date(endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}, ${formattedStartTime} to ${formattedEndTime}`
                      )}
                    </p>
                  </div>
                )}
              </div>
            )}
            {minglerType === 'full-day' && selectedDate && (
              <div className="p-2 bg-[var(--bondi-orange)]/10 rounded-lg text-center">
                <p className="text-sm font-medium text-[var(--bondi-orange)]">
                  Suggested: {new Date(selectedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </p>
              </div>
            )}
          </>
        )}
      </div>

      <CalendarPicker
        isOpen={isCalendarOpen}
        onClose={() => setIsCalendarOpen(false)}
        onSelectDate={(date) => {
          if (calendarType === 'start') {
            setSelectedDate(date);
          } else {
            setEndDate(date);
          }
          setIsCalendarOpen(false);
        }}
        selectedDate={calendarType === 'start' ? selectedDate : endDate}
      />

      <Button
        onClick={() => {
          updateMingle({
            id: mingle.id || crypto.randomUUID(),
            name,
            description,
            activities: selectedActivities,
            minglerType,
            selectedDate,
            endDate,
            selectedHour,
            selectedMinute,
            endHour,
            endMinute,
          });
          navigate('/invite-friends');
        }}
        disabled={!name.trim()}
        className={!name.trim() ? 'opacity-50 cursor-not-allowed' : ''}
      >
        Continue to Invite Friends
      </Button>

      {!name.trim() && (
        <p className="text-sm text-center text-[var(--destructive)]">
          Please enter a mingle name to continue
        </p>
      )}
    </div>
  );
}
