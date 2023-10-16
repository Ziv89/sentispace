import classes from './CategorySelect.module.scss';

import { Category } from '../../data/interfaces';
import { CategorySelectionFunction } from './CategorySelect';
import { Plus, X } from '@phosphor-icons/react';
import CategoryBadge from './category-badge/CategoryBadge';

interface CategoryItemProps extends Category {
    onChange: CategorySelectionFunction;
    isSelected?: boolean;
}

const CategoryItem = ({
    name,
    color,
    id,
    onChange,
    isSelected,
}: CategoryItemProps) => (
    <div className={classes.selectItem} key={id.toString()} tabIndex={0}>
        <div className={classes.sideButton}>
            {isSelected ? (
                <X onClick={() => onChange(id, 'remove')} />
            ) : (
                <Plus onClick={() => onChange(id, 'add')} />
            )}
        </div>
        <div className={classes.selectItemContent}>
            <CategoryBadge id={id} name={name} color={color} />
        </div>
    </div>
);

export default CategoryItem;
