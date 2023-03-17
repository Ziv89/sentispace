import { IndexableType } from 'dexie';
import { Activity } from './Activity';
import { Rating } from '../types/Rating';

export interface Day {
	id?: IndexableType;
	date: Date;
	activities: Activity[];
	rating?: Rating;
}
