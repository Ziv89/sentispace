import { IndexableType } from 'dexie';
import { Rating } from '../types/Rating';

export interface Activity {
	id?: IndexableType;
	title: string;
	description?: string;
	rating?: Rating;
	startTime: Date;
	endTime?: Date;
	iconId?: string;
	categoryIds?: IndexableType[];
}
