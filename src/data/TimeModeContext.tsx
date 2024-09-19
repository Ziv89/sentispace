import React, { createContext, useContext } from 'react';
import { use24HourModeState } from '../../utils/hooks/use24HourModeState'; // Import custom hook

interface TimeModeContextProps {
  is24HourMode: boolean;
  toggle24HourMode: () => void;
}

const TimeModeContext = createContext<TimeModeContextProps | undefined>(undefined);

export const TimeModeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Use the custom hook to manage 24-hour mode state
  const { is24HourMode, toggle24HourMode } = use24HourModeState();

  return (
    <TimeModeContext.Provider value={{ is24HourMode, toggle24HourMode }}>
      {children}
    </TimeModeContext.Provider>
  );
};

export const useTimeModeContext = (): TimeModeContextProps => {
  const context = useContext(TimeModeContext);
  if (context === undefined) {
    throw new Error('useTimeModeContext must be used within a TimeModeProvider');
  }
  return context;
};
