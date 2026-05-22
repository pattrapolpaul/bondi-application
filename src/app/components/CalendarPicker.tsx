import { useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './Button';

interface CalendarPickerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectDate: (date: string) => void;
  selectedDate: string;
}

export function CalendarPicker({ isOpen, onClose, onSelectDate, selectedDate }: CalendarPickerProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  if (!isOpen) return null;

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const handleDateClick = (day: number) => {
    const year = currentYear;
    const month = (currentMonth + 1).toString().padStart(2, '0');
    const dayStr = day.toString().padStart(2, '0');
    const dateString = `${year}-${month}-${dayStr}`;
    onSelectDate(dateString);
  };

  const isSelectedDate = (day: number) => {
    const year = currentYear;
    const month = (currentMonth + 1).toString().padStart(2, '0');
    const dayStr = day.toString().padStart(2, '0');
    const dateString = `${year}-${month}-${dayStr}`;
    return dateString === selectedDate;
  };

  const isToday = (day: number) => {
    const today = new Date();
    return (
      day === today.getDate() &&
      currentMonth === today.getMonth() &&
      currentYear === today.getFullYear()
    );
  };

  const days = [];
  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push(<div key={`empty-${i}`} className="h-10" />);
  }
  for (let day = 1; day <= daysInMonth; day++) {
    days.push(
      <button
        key={day}
        onClick={() => handleDateClick(day)}
        className={`h-10 flex items-center justify-center rounded-lg text-sm font-medium transition-all ${
          isSelectedDate(day)
            ? 'bg-[var(--bondi-orange)] text-white'
            : isToday(day)
            ? 'bg-[var(--accent)] text-white'
            : 'hover:bg-[var(--muted)]'
        }`}
      >
        {day}
      </button>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative w-full max-w-[375px] bg-white rounded-t-3xl p-6 space-y-4 animate-slide-up">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold">Select Date</h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-[var(--muted)] rounded-lg transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex items-center justify-between">
          <button
            onClick={handlePrevMonth}
            className="p-2 hover:bg-[var(--muted)] rounded-lg transition-colors"
          >
            <ChevronLeft size={20} />
          </button>
          <h4 className="font-bold">
            {monthNames[currentMonth]} {currentYear}
          </h4>
          <button
            onClick={handleNextMonth}
            className="p-2 hover:bg-[var(--muted)] rounded-lg transition-colors"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        <div className="grid grid-cols-7 gap-1 mb-2">
          {weekDays.map((day) => (
            <div key={day} className="h-8 flex items-center justify-center text-xs font-medium text-[var(--muted-foreground)]">
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1">
          {days}
        </div>

        <Button onClick={onClose}>Done</Button>
      </div>
    </div>
  );
}
