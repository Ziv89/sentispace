import { IndexableType } from 'dexie'

export interface Category {
  id: IndexableType
  name: string
  color: number
}
