import { IconKeyType } from '@assets/icons'
import { IndexableType } from 'dexie'

export type Rating = 0 | 0.5 | 1 | 1.5 | 2 | 2.5 | 3 | 3.5 | 4 | 4.5 | 5

export interface Activity {
  id: IndexableType
  title: string
  description?: string
  rating: Rating
  startTime: Date
  endTime?: Date
  iconKey: IconKeyType
  categoryIds: IndexableType[]
  isTemplate?: 1 | 0
}
