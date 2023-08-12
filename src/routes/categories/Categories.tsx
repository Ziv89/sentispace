import classes from './Categories.module.scss';

import { useLiveQuery } from 'dexie-react-hooks';
import { Activity, Category } from '../../data/interfaces';
import { db } from '../../data/Database';
import classNames from 'classnames/bind';
import { useEffect, useRef, useState } from 'react';
import CategoryModal from '../../components/shared/CategoryModal';
import Button from '../../components/input/button/Button';
import { IndexableType } from 'dexie';
import CategoryRow from './CategoryRow';
import { countAndSortCategories } from './categories.functions';
import SortingIcon from '../../components/generic/SortIcon';
import { SmileyXEyes } from '@phosphor-icons/react';

const cx = classNames.bind(classes);

const SORT_TYPE = {
    NAME: 'name',
    COUNT: 'count',
} as const;

export type SortType = (typeof SORT_TYPE)[keyof typeof SORT_TYPE];

const Categories = () => {
    const activities = useLiveQuery<Activity[]>(() => db.activities.toArray());
    const categories = useLiveQuery<Category[]>(() => db.categories.toArray());

    const [sortType, setSortType] = useState<SortType>(SORT_TYPE.NAME);
    const [isAscending, setIsAscending] = useState<boolean>(false);

    const [isCreateCategoryModalOpen, setIsCreateCategoryModalOpen] =
        useState<boolean>(false);

    const [newCategoryId, setNewCategoryId] = useState<IndexableType>();

    const prevCategoriesIdsRef = useRef<IndexableType[]>();
    const newCategoryRef = useRef<HTMLDivElement>(null);

    const prevCategoriesIds = prevCategoriesIdsRef.current;

    useEffect(() => {
        if (newCategoryRef.current) {
            newCategoryRef.current.scrollIntoView({ behavior: 'smooth' });
            newCategoryRef.current.classList.add(classes.newCategory);

            const id = setTimeout(() => {
                newCategoryRef.current?.classList.remove(classes.newCategory);
            }, 3000);

            setNewCategoryId(undefined);

            return () => {
                clearTimeout(id);
            };
        }
    }, [newCategoryId, newCategoryRef.current]);

    useEffect(() => {
        if (
            typeof activities === 'undefined' ||
            typeof categories === 'undefined'
        )
            return;

        const categoriesIds = categories.map((category) => category.id);

        if (
            prevCategoriesIds &&
            prevCategoriesIds.length !== categoriesIds.length
        ) {
            const newCategory = categories.find(
                (category) => !prevCategoriesIds.includes(category.id)
            );

            if (newCategory) setNewCategoryId(newCategory.id);
        }

        prevCategoriesIdsRef.current = categoriesIds;
    }, [categories, activities]);

    const sortedCategories =
        categories && activities
            ? countAndSortCategories(
                  categories,
                  activities,
                  sortType,
                  isAscending
              )
            : [];

    const handleSortClick = (newSortType: SortType) => {
        setSortType(newSortType);
        if (sortType !== newSortType) return;
        setIsAscending((prev) => !prev);
    };

    return (
        <div className={classes.categories}>
            <h1 className={classes.header}>Categories</h1>
            <div className={classes.headers}>
                <span
                    className={classes.columnName}
                    onClick={() => handleSortClick(SORT_TYPE.NAME)}
                >
                    Category name
                </span>
                <span className={classes.sortIcon}>
                    <span
                        className={cx({
                            iconPusher: true,
                            isPushed: sortType === SORT_TYPE.COUNT,
                        })}
                    />
                    <SortingIcon isAscending={isAscending} />
                </span>
                <span
                    className={classes.columnName}
                    onClick={() => handleSortClick(SORT_TYPE.COUNT)}
                >
                    Total activities
                </span>
            </div>
            <div className={classes.wrapper}>
                <div
                    className={cx({
                        container: true,
                        noCategories: sortedCategories.length === 0,
                    })}
                >
                    {sortedCategories.length > 0 ? (
                        sortedCategories.map((category) => (
                            <CategoryRow
                                key={category.name}
                                {...category}
                                ref={
                                    category.id === newCategoryId
                                        ? newCategoryRef
                                        : undefined
                                }
                            />
                        ))
                    ) : (
                        <>
                            <SmileyXEyes size={48} />
                            No Categories
                        </>
                    )}
                </div>
            </div>
            <div className={classes.createButton}>
                <Button
                    variant="primary"
                    onClick={() => setIsCreateCategoryModalOpen(true)}
                >
                    Create Category
                </Button>
                {isCreateCategoryModalOpen && (
                    <CategoryModal
                        onClose={() => setIsCreateCategoryModalOpen(false)}
                    />
                )}
            </div>
        </div>
    );
};

export default Categories;
