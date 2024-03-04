import { createContext, ReactNode } from 'react'
import { useLiveQuery } from 'dexie-react-hooks'
import { db } from '../Database'
import { Activity, Category } from '../interfaces'

interface ContextProviderProps {
  children: ReactNode
}

interface InsightsContext {
  activities: Activity[]
  categories: Category[]
}

export const InsightsContext = createContext<InsightsContext>({
  activities: [],
  categories: [],
})

export default function InsightsContextProvider({
  children,
}: ContextProviderProps) {
  const activities = useLiveQuery(() => db.activities.toArray())
  const categories = useLiveQuery(() => db.categories.toArray())

  if (!activities || !categories) return null

  return (
    <InsightsContext.Provider value={{ activities, categories }}>
      {children}
    </InsightsContext.Provider>
  )
}
