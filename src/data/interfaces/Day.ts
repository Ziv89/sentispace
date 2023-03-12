import { IndexableType } from 'dexie';
import { Activity } from './Activity';
import { Rating } from './commonTypes';

export interface Day {
	id?: IndexableType;
	date: Date;
	activities: Activity[];
	rating?: Rating;
}
