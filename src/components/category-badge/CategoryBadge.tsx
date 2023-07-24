import classes from './CategoryBadge.module.scss';

import { MouseEvent, TouchEvent, useState } from 'react';
import CategoryModal from '../shared/CategoryModal';
import { Category } from '../../data/interfaces';
import classNames from 'classnames/bind';

const cx = classNames.bind(classes);

const CategoryBadge = ({ id, name, color }: Category) => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const handleOnClick = (event: MouseEvent | TouchEvent) => {
        event.stopPropagation();
        setIsModalOpen(true);
    };

    return (
        <>
            <span
                onClick={handleOnClick}
                className={cx({
                    categoryBadge: true,
                    [`categoryColor${color}`]: color,
                })}
            >
                {name}
            </span>
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
