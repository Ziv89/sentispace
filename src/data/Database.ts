import { Category } from '@categories/Category.interface'
import { Activity } from '@activities/Activity.interface'
import Dexie, { Table } from 'dexie'
import { Stores } from './Stores.enum'

export interface IDatabase {
  [Stores.ACTIVITY]: Table<Activity>
  [Stores.CATEGORY]: Table<Category>
}

type StoreName = keyof IDatabase

class Database extends Dexie implements IDatabase {
  [Stores.ACTIVITY]!: Table<Activity>;
  [Stores.CATEGORY]!: Table<Category>

  constructor() {
    super('Database')

    const stores: { [storeName in StoreName]: string } = {
      [Stores.ACTIVITY]:
        '++id,title,description,rating,startTime,endTime,iconKey,categoryIds,isTemplate',
      [Stores.CATEGORY]: '++id,name,color',
    }

    this.version(1).stores(stores)
  }
}

export const db = new Database()
