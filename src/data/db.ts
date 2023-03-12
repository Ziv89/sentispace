import Dexie, { Table } from 'dexie';
import { Activity, Category, Day } from './interfaces';
import {
	ACTIVITY_STORE,
	CATEGORY_STORE,
	DAY_STORE,
	StoreName,
} from './interfaces/StoreNames';

export class FeelingTrackerDatabase extends Dexie {
	[DAY_STORE]!: Table<Day>;
	[ACTIVITY_STORE]!: Table<Activity>;
	[CATEGORY_STORE]!: Table<Category>;

	constructor() {
		super('FeelingTrackerDatabase');

		const stores: { [storeName in StoreName]: string } = {
			[DAY_STORE]: '++id, date, activities, rating',
			[ACTIVITY_STORE]:
				'++id,title,description,rating,startTime,endTime,iconId,categoryIds',
			[CATEGORY_STORE]: '++id,name,color',
		};

		this.version(1).stores(stores);
	}
}

export const db = new FeelingTrackerDatabase();
