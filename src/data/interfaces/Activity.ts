import { IndexableType } from 'dexie';
import { Rating } from '../types/Rating';
import { IconIdType } from '../../assets/icons';

export interface Activity {
    id?: IndexableType;
    title: string;
    description?: string;
    rating: Rating;
    startTime: Date;
    endTime: Date;
    iconId: IconIdType;
    categoryIds: IndexableType[];
}
