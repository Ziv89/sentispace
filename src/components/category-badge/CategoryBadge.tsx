import classes from './CategoryBadge.module.scss';

import { MouseEvent, TouchEvent, useState } from 'react';
import CategoryModal from '../shared/CategoryModal';
import { Category } from '../../data/interfaces';
import classNames from 'classnames/bind';

const cx = classNames.bind(classes);

export interface CategoryBadgeProps extends Category {
    onClick?: () => void;
    deletable?: boolean;
}

const CategoryBadge = ({ 
    id, 
    name, 
    color, 
    onClick, 
    deletable 
}: CategoryBadgeProps) => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const handleOnClick = (event: MouseEvent | TouchEvent) => {
        event.stopPropagation();
        // TODO remove monkey patch
        onClick ? onClick() : setIsModalOpen(true);
    };

    return (
        <>
            <div
                onClick={handleOnClick}
                className={cx({
                    categoryBadge: true,
                    [`categoryColor${color}`]: color,
                })}
            >
                <span>
                    {name}
                </span>
                {deletable && <span>×</span>}  
            </div>
            {isModalOpen && (
                <CategoryModal
                    onClose={() => setIsModalOpen(false)}
                    category={{ id, name, color }}
                />
            )}
        </>
    );
};

export default CategoryBadge;
