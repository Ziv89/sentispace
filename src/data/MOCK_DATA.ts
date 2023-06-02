import { Rating } from './types/Rating';
import { addDays, startOfWeek, subMonths } from 'date-fns';
import { IconIdType } from '../assets/icons';
import { Activity, Category } from './interfaces';
import { db } from './Database';
import * as Icon from '@phosphor-icons/react';

const activityNames = ['Biking', 'Hiking', 'Reading', 'Swimming', 'Cooking'];
const categoryNames = ['Sports', 'Leisure', 'Education', 'Cookery', 'Outdoors'];
const categoryDescriptions = [
    'Sport activities to keep you fit and healthy',
    'Leisure activities for relaxation',
    'Educational activities to learn new skills',
    'Cookery activities for food enthusiasts',
    'Outdoor activities to enjoy nature',
];

function getRandomElement(array: any[]): any {
    return array[Math.floor(Math.random() * array.length)];
}

function getRandomTitle(): string {
    return getRandomElement(activityNames);
}

function getDescriptionForTitle(title: string): string {
    return `Participate in ${title} and have a lot of fun. It's a great way to spend time!`;
}

function getRandomRating(): Rating {
    return (Math.floor(Math.random() * 10) / 2) as Rating;
}

function getRandomStartDate(): Date {
    const startDate = startOfWeek(subMonths(new Date(), 1));
    const dayOffset = Math.floor(Math.random() * 30);
    return addDays(startDate, dayOffset);
}

function getRandomEndDate(startTime: Date): Date {
    return new Date(startTime.getTime() + Math.random() * 3600000);
}

function getRandomCategoryIds(): number[] {
    return [Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)];
}

const excludeKeys = [
    'Icon',
    'IconProps',
    'IconWeight',
    'IconContext',
    'IconBase',
];

function getRandomIconId(): IconIdType {
    const keys = Object.keys(Icon).filter(
        (key) => !excludeKeys.includes(key)
    ) as Array<keyof typeof Icon>;
    return getRandomElement(keys) as IconIdType;
}

export function generateRandomActivity(): Activity {
    const title = getRandomTitle();
    const description = getDescriptionForTitle(title);
    const rating = getRandomRating();
    const startTime = getRandomStartDate();
    const endTime = getRandomEndDate(startTime);
    const iconId: IconIdType = getRandomIconId();
    const categoryIds = getRandomCategoryIds();

    return {
        title,
        description,
        rating,
        startTime,
        endTime,
        iconId,
        categoryIds,
    } as Activity;
}

function getRandomColor(): number {
    return Math.floor(Math.random() * 16) + 1;
}

export function generateRandomCategory(): Category {
    const randomColor = getRandomColor();
    const name = getRandomElement(categoryNames);
    const description = getRandomElement(categoryDescriptions);

    return {
        name,
        color: randomColor,
        description,
    } as Category;
}

export async function generateData(): Promise<void> {
    const dbLen = await db.activities.count();

    if (dbLen !== 0) {
        return;
    }

    const activities = Array.from({ length: 150 }, () =>
        generateRandomActivity()
    );
    const categories = Array.from({ length: 5 }, () =>
        generateRandomCategory()
    );

    await db.activities.bulkAdd(activities);
    await db.categories.bulkAdd(categories);
}
