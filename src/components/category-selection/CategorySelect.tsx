import classes from './CategorySelect.module.scss';

import { CaretDown, CaretUp, Hash, CaretRight } from '@phosphor-icons/react';
import { MouseEvent, useContext, useState } from 'react';
import { IndexableType } from 'dexie';
import classNames from 'classnames/bind';
import CategoryItem from './CategoryItem';
import { CategoriesContext } from '../../data/contexts/CategoriesContext';
import CategoryBadge from './category-badge/CategoryBadge';
import CategorySelectionModal from './CategorySelectionModal';
import { IconKeyType } from '../../assets/icons';

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

    const handleSelectToggle = () => {
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
                setSelectedCategories(categoryIds.filter((id) => id !== categoryId));
                break;
        }
    };

    return (
        <>
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
                    {categoryIds.length > 0
                        ? (
                            <div className={classes.selectedCategoriesWrapper}>
                                <div className={classes.selectedCategories}>
                                    {categories?.filter(({ id }) => categoryIds.includes(id)).map(cat => (
                                        <CategoryBadge 
                                            {...cat} 
                                            onClick={() => handleCategorySelection(cat.id, 'remove')} 
                                            key={cat.id.toString()}
                                        />
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <span className={classes.placeholder}>{placeholder}</span>
                        )
                    }
                    <div className={classes.toggleSelect}>
                        <CaretRight/>
                    </div>
                </div>
            </div>
            {isOpen && 
                <CategorySelectionModal 
                    onClose={handleSelectToggle}
                    categoryIds={categoryIds}
                    onCategoriesChange={setSelectedCategories}
                />
            }
        </>
    );
};

export default CategorySelect;
