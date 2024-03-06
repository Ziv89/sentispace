import { endOfDay, startOfDay } from 'date-fns'
import { IndexableType } from 'dexie'
import { useLiveQuery } from 'dexie-react-hooks'
import { useContext } from 'react'
import { CategoriesContext } from '../categories/CategoriesContext'
import { db } from '../../data/Database'
import { Activity } from '../../data/interfaces'

export const useFilteredActivities = (
  date: Date,
): [Activity[], IndexableType[]] => {
  const { selectedCategories } = useContext(CategoriesContext)
  const activities =
    useLiveQuery<Activity[]>(
      () =>
        db.activities
          .where('startTime')
          .between(startOfDay(date), endOfDay(date))
          .and((activity) =>
            selectedCategories.length !== 0
              ? activity.categoryIds.some((categoryId) =>
                  selectedCategories.includes(categoryId),
                )
              : true,
          )
          .toArray(),
      [date, selectedCategories],
    ) ?? []
  return [activities, selectedCategories]
}
