import { format } from 'date-fns';
import { iconKeys } from '../../../../assets/icons';
import { db } from '../../../../data/Database';
import { Activity, Category } from '../../../../data/interfaces';
import { UserData } from './userData.interfaces';
import { IndexableType } from 'dexie';

export const isValidData = (data: UserData): boolean => {
    const { activities, categories } = data;

    if (!Array.isArray(activities)) return false;
    if (!Array.isArray(categories)) return false;

    if (!activities.length && !categories.length) return false;

    const categoryNames = categories.map((category) => category.name);
    const uniqueCategoryNames = new Set(categoryNames);

    if (categoryNames.length !== uniqueCategoryNames.size) return false;

    const validRating = [0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5];

    for (const activity of activities) {
        const { id, title, description, rating, iconKey, categoryIds } =
            activity;

        let { startTime, endTime } = activity;

        startTime = new Date(startTime);
        endTime = endTime ? new Date(endTime) : undefined;

        const failConditions = [
            typeof id !== 'number',
            typeof title !== 'string',
            description && typeof description !== 'string',
            typeof rating !== 'number',
            !validRating.includes(rating),
            !(startTime instanceof Date),
            endTime && !(endTime instanceof Date),
            !iconKeys.includes(iconKey),
            !Array.isArray(categoryIds),
            !categoryIds.every((id) => typeof id === 'number'),
        ];

        for (const condition of failConditions) {
            if (condition) return false;
        }
    }

    for (const category of categories) {
        const { id, name, color } = category;

        const failConditions = [
            typeof id !== 'number',
            typeof name !== 'string',
            typeof color !== 'number',
        ];

        for (const condition of failConditions) {
            if (condition) return false;
        }
    }

    return true;
};

export const exportData = async (): Promise<void> => {
    const activities: Activity[] = await db.table('activities').toArray();
    const categories: Category[] = await db.table('categories').toArray();

    const data: UserData = { activities, categories };

    const backupTime = format(new Date(), 'yyyyMMdd_HHmmss');
    const fileName = `FeelingTracker_backup_${backupTime}.json`;

    const content = JSON.stringify(data, null, 2);

    const file = new Blob([content], { type: 'application/json' });

    const link = document.createElement('a');
    const url = URL.createObjectURL(file);
    link.href = url;
    link.download = fileName;

    link.click();

    link.remove();
    URL.revokeObjectURL(url);
};

export const importData = async (data: UserData): Promise<void> => {
    await db.activities.clear();
    await db.categories.clear();

    const updatedActivities = data.activities.map((activity) => {
        return {
            ...activity,
            startTime: new Date(activity.startTime),
            endTime: activity.endTime ? new Date(activity.endTime) : undefined,
        };
    });

    await db.activities.bulkAdd(updatedActivities);
    await db.categories.bulkAdd(data.categories);
};

export const mergeData = async (data: UserData): Promise<void> => {
    const categories = await db.categories.toArray();

    const existingCategoryNames = categories.map((category) => category.name);

    const categoryIdMapping: { [key: string]: IndexableType } = {};

    await db.transaction('rw', db.categories, db.activities, async () => {
        for (const { id, name, color } of data.categories) {
            const originalId = String(id);

            if (existingCategoryNames.includes(name)) {
                const matchingCategory = categories.find(
                    (category) => category.name === name
                );
                categoryIdMapping[originalId] =
                    matchingCategory?.id || originalId;
            } else {
                const newId = await db.categories.add({
                    name,
                    color,
                } as Category);
                categoryIdMapping[originalId] = newId;
            }
        }

        const updatedActivities = data.activities
            .map((activity) => {
                return {
                    ...activity,
                    startTime: new Date(activity.startTime),
                    endTime: activity.endTime
                        ? new Date(activity.endTime)
                        : undefined,
                    categoryIds: activity.categoryIds.map(
                        (id) => categoryIdMapping[String(id)] || id
                    ),
                };
            })
            .map(({ id, ...rest }) => ({ ...rest }));

        await db.activities.bulkAdd(updatedActivities as Activity[]);
    });
};
