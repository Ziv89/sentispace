import { Activity, Category } from '../../data/interfaces';
import { SortType } from './Categories';

interface CategoryWithCount extends Category {
    count: number;
}

const categoriesWithActivityCount = (
    categories: Category[],
    activities: Activity[]
): CategoryWithCount[] => {
    return categories.map((category) => ({
        ...category,
        count: activities.filter((activity) =>
            activity.categoryIds.includes(category.id)
        ).length,
    }));
};

const sortByName = (
    a: CategoryWithCount,
    b: CategoryWithCount,
    isAscending: boolean
): number => {
    return isAscending
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name);
};

const sortByCount = (
    a: CategoryWithCount,
    b: CategoryWithCount,
    isAscending: boolean
): number => {
    return isAscending ? a.count - b.count : b.count - a.count;
};

const sortCategories = (
    categories: CategoryWithCount[],
    sortType: SortType,
    isAscending: boolean
): CategoryWithCount[] => {
    return [...categories].sort((a, b) => {
        switch (sortType) {
            case 'name':
                return sortByName(a, b, isAscending);
            case 'count':
                return sortByCount(a, b, isAscending);
            default:
                return 0;
        }
    });
};

export const countAndSortCategories = (
    categories: Category[],
    activities: Activity[],
    sortType: SortType,
    isAscending: boolean
): CategoryWithCount[] => {
    const activityCountedCategories = categoriesWithActivityCount(
        categories,
        activities
    );
    return sortCategories(activityCountedCategories, sortType, isAscending);
};
