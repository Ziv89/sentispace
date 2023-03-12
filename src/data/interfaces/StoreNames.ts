import { Table } from 'dexie';
import { Activity } from './Activity';
import { Category } from './Category';
import { Day } from './Day';

export const DAY_STORE = 'days';
export const ACTIVITY_STORE = 'activities';
export const CATEGORY_STORE = 'categories';

interface StoreNames {
	[DAY_STORE]: Table<Day>;
	[ACTIVITY_STORE]: Table<Activity>;
	[CATEGORY_STORE]: Table<Category>;
}

export type StoreName = keyof StoreNames;
