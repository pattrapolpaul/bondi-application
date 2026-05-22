import { createContext, useContext, useState, ReactNode } from 'react';

export interface User {
  id: string;
  name: string;
  avatar: string;
  isGuest: boolean;
  status?: 'pending' | 'accepted' | 'declined';
}

export interface Mingle {
  id: string;
  name: string;
  description: string;
  activities: string[];
  minglerType: 'full-day' | 'half-day' | 'trip' | 'custom';
  selectedDate: string;
  endDate: string;
  selectedHour: number;
  selectedMinute: number;
  endHour: number;
  endMinute: number;
  invitedUsers: User[];
  confirmedUsers: User[];
  what?: string;
  where?: string;
  when?: string;
  finalDate?: string;
  finalTime?: string;
}

interface MingleContextType {
  mingle: Mingle;
  updateMingle: (updates: Partial<Mingle>) => void;
  resetMingle: () => void;
}

const defaultMingle: Mingle = {
  id: '',
  name: '',
  description: '',
  activities: [],
  minglerType: 'full-day',
  selectedDate: '',
  endDate: '',
  selectedHour: 19,
  selectedMinute: 0,
  endHour: 21,
  endMinute: 0,
  invitedUsers: [],
  confirmedUsers: [],
};

const MingleContext = createContext<MingleContextType | undefined>(undefined);

export function MingleProvider({ children }: { children: ReactNode }) {
  const [mingle, setMingle] = useState<Mingle>(defaultMingle);

  const updateMingle = (updates: Partial<Mingle>) => {
    setMingle((prev) => ({ ...prev, ...updates }));
  };

  const resetMingle = () => {
    setMingle(defaultMingle);
  };

  return (
    <MingleContext.Provider value={{ mingle, updateMingle, resetMingle }}>
      {children}
    </MingleContext.Provider>
  );
}

export function useMingle() {
  const context = useContext(MingleContext);
  if (context === undefined) {
    throw new Error('useMingle must be used within a MingleProvider');
  }
  return context;
}
