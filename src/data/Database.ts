import Dexie, { Table } from 'dexie';
import { Stores } from './enums/Stores';
import { Activity, Category } from './interfaces';

export interface IDatabase {
    [Stores.ACTIVITY]: Table<Activity>;
    [Stores.CATEGORY]: Table<Category>;
}

type StoreName = keyof IDatabase;

class Database extends Dexie implements IDatabase {
    [Stores.ACTIVITY]!: Table<Activity>;
    [Stores.CATEGORY]!: Table<Category>;

    constructor() {
        super('Database');

        const stores: { [storeName in StoreName]: string } = {
            [Stores.ACTIVITY]:
                '++id,title,description,rating,startTime,endTime,iconKey,categoryIds',
            [Stores.CATEGORY]: '++id,name,color',
        };

        this.version(1).stores(stores);
    }
}

export const db = new Database();
