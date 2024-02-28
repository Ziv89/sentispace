import { Activity } from '../interfaces';
import { createContext, ReactNode } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../Database';

interface ContextProviderProps {
  children: ReactNode;
}

export const ActivitiesContext = createContext<Activity[]>([]);

export default function ActivityContextProvider({
  children,
}: ContextProviderProps) {
  const activities = useLiveQuery<Activity[]>(() => db.activities.toArray());

  if (!activities) return null;

  return (
    <ActivitiesContext.Provider value={activities}>
      {children}
    </ActivitiesContext.Provider>
  );
}
