import { Activity, Category } from '../../../../data/interfaces';

export interface UserData {
    activities: Activity[];
    categories: Category[];
    lastModifiedDate?: Date;
}
