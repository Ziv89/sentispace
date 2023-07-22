import { IndexableType } from 'dexie';
import { Rating } from '../types/Rating';
import { IconKeyType } from '../../assets/icons';

export interface Activity {
    id: IndexableType;
    title: string;
    description?: string;
    rating: Rating;
    startTime: Date;
    endTime?: Date;
    iconKey: IconKeyType;
    categoryIds: IndexableType[];
}
