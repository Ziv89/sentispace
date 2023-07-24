import classes from './CategorySelect.module.scss';

import { CaretDown, CaretUp, Hash } from '@phosphor-icons/react';
import { IconKeyType } from '../../../assets/icons';
import { CategoriesContext } from '../../../data/contexts/CategoriesContext';
import { MouseEvent, useContext, useState } from 'react';
import { IndexableType } from 'dexie';
import classNames from 'classnames/bind';
import CategoryItem from './CategoryItem';
import CategoryModal from '../../shared/CategoryModal';

const cx = classNames.bind(classes);

interface SelectProps {
    label: string;
    placeholder: string;
    iconKey?: IconKeyType;
    categoryIds: IndexableType[];
    onCategoriesChange: (categories: IndexableType[]) => void;
}

type CategorySelectionOperations = 'add' | 'remove';

export type CategorySelectionFunction = (
    categoryId: IndexableType,
    operation: CategorySelectionOperations
) => void;

const CategorySelect = ({
    label,
    placeholder,
    categoryIds,
    onCategoriesChange: setSelectedCategories,
}: SelectProps) => {
    const { categories } = useContext(CategoriesContext);
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const [isNewCategoryModalOpen, setIsNewCategoryModalOpen] =
        useState<boolean>(false);

    const handleOnClick = (event: MouseEvent | TouchEvent) => {
        event.stopPropagation();
        setIsNewCategoryModalOpen(true);
    };

    const handleSelectToggle = (event: MouseEvent | TouchEvent) => {
        event.stopPropagation();
        setIsOpen((prev) => !prev);
    };

    const handleCategorySelection: CategorySelectionFunction = (
        categoryId,
        operation
    ) => {
        switch (operation) {
            case 'add':
                setSelectedCategories([...categoryIds, categoryId]);
                break;
            case 'remove':
                setSelectedCategories(
                    categoryIds.filter((id) => id !== categoryId)
                );

                break;
        }
    };

    return (
        <div className={classes.categorySelect}>
            <span className={classes.label}>{label}</span>

            <div
                tabIndex={0}
                className={cx({ select: true, isOpen })}
                onClick={handleSelectToggle}
            >
                <div className={classes.selectIcon}>
                    <Hash />
                </div>
                <span className={classes.placeholder}>{placeholder}</span>
                <div className={classes.toggleSelect}>
                    {isOpen ? <CaretUp /> : <CaretDown />}
                </div>
            </div>
            {isOpen && (
                <div className={classes.selectionList}>
                    {categories
                        .filter(({ id }) => !categoryIds.includes(id))
                        .map(({ id, name, color }) => (
                            <CategoryItem
                                name={name}
                                color={color}
                                id={id}
                                key={id.toString()}
                                onChange={handleCategorySelection}
                            />
                        ))}
                    <div className={classes.selectItem}>
                        <div
                            tabIndex={0}
                            className={classes.createNewCategory}
                            onClick={handleOnClick}
                        >
                            Create a new category
                        </div>
                        {isNewCategoryModalOpen && (
                            <CategoryModal
                                onClose={() => setIsNewCategoryModalOpen(false)}
                            />
                        )}
                    </div>
                </div>
            )}

            {categoryIds.length > 0 && (
                <div className={classes.selectedList}>
                    {categories
                        .filter(({ id }) => categoryIds.includes(id))
                        .map(({ id, name, color }) => (
                            <CategoryItem
                                name={name}
                                color={color}
                                id={id}
                                key={id.toString()}
                                onChange={handleCategorySelection}
                                isSelected
                            />
                        ))}
                </div>
            )}
        </div>
    );
};

export default CategorySelect;
