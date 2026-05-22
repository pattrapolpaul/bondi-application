import { useRef, useEffect } from 'react';

interface TimeWheelPickerProps {
  selectedHour: number;
  selectedMinute: number;
  onTimeChange: (hour: number, minute: number) => void;
}

export function TimeWheelPicker({
  selectedHour,
  selectedMinute,
  onTimeChange,
}: TimeWheelPickerProps) {
  const hourRef = useRef<HTMLDivElement>(null);
  const minuteRef = useRef<HTMLDivElement>(null);

  const itemHeight = 36;
  const hours = Array.from({ length: 24 }, (_, i) => i);
  const minutes = Array.from({ length: 12 }, (_, i) => i * 5);

  const handleScroll = (ref: HTMLDivElement | null, callback: (value: number) => void) => {
    if (!ref) return;
    const index = Math.round(ref.scrollTop / itemHeight);
    callback(index);
  };

  useEffect(() => {
    if (hourRef.current) {
      hourRef.current.scrollTop = selectedHour * itemHeight;
    }
    if (minuteRef.current) {
      const minuteIndex = minutes.indexOf(selectedMinute);
      minuteRef.current.scrollTop = minuteIndex * itemHeight;
    }
  }, []);

  return (
    <div className="relative w-full h-36 bg-white rounded-lg overflow-hidden">
      {/* Selection highlight */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-10">
        <div className="w-full h-9 bg-[var(--bondi-orange)]/10 border-y-2 border-[var(--bondi-orange)]" />
      </div>

      {/* Gradient overlays - iPhone style */}
      <div className="absolute top-0 left-0 right-0 h-12 bg-gradient-to-b from-white to-transparent pointer-events-none z-20" />
      <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white to-transparent pointer-events-none z-20" />

      <div className="flex h-full">
        {/* Hour */}
        <div className="flex-1 relative">
          <div
            ref={hourRef}
            className="h-full overflow-y-scroll snap-y snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
            onScroll={() => handleScroll(hourRef.current, (index) => {
              const hour = hours[index];
              if (hour !== undefined) onTimeChange(hour, selectedMinute);
            })}
          >
            <div className="h-[54px]" />
            {hours.map((hour) => (
              <div
                key={hour}
                className="h-9 flex items-center justify-center snap-center font-medium"
                style={{ fontSize: '15px' }}
              >
                {hour.toString().padStart(2, '0')}
              </div>
            ))}
            <div className="h-[54px]" />
          </div>
        </div>

        {/* Minute */}
        <div className="flex-1 relative">
          <div
            ref={minuteRef}
            className="h-full overflow-y-scroll snap-y snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
            onScroll={() => handleScroll(minuteRef.current, (index) => {
              const minute = minutes[index];
              if (minute !== undefined) onTimeChange(selectedHour, minute);
            })}
          >
            <div className="h-[54px]" />
            {minutes.map((minute) => (
              <div
                key={minute}
                className="h-9 flex items-center justify-center snap-center font-medium"
                style={{ fontSize: '15px' }}
              >
                {minute.toString().padStart(2, '0')}
              </div>
            ))}
            <div className="h-[54px]" />
          </div>
        </div>
      </div>
    </div>
  );
}
