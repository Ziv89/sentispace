import { Activity, Category } from '../../../../data/interfaces';

export interface Data {
    activities: Activity[];
    categories: Category[];
    lastModifiedDate?: Date;
}
