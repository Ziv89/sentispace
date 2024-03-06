import { Activity } from '@activities/Activity.interface'
import { Category } from '@categories/Category.interface'

export interface UserData {
  activities: Activity[]
  categories: Category[]
  lastModifiedDate?: Date
}
