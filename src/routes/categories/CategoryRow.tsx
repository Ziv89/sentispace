import classes from './Categories.module.scss';

import classNames from 'classnames/bind';
import { ForwardedRef, forwardRef, useState } from 'react';
import { Category } from '../../data/interfaces';
import CategoryModal from '../../components/shared/CategoryModal';

const cx = classNames.bind(classes);

interface CategoryRowProps extends Category {
    count: number;
    isNew?: boolean;
}

const CategoryRow = (
    { id, name, color, count }: CategoryRowProps,
    ref: ForwardedRef<HTMLDivElement>
) => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    return (
        <div
            ref={ref}
            className={classes.category}
            onClick={() => setIsModalOpen(true)}
        >
            {name}
            <div
                className={cx({
                    activities: true,
                    [`color${color}`]: color,
                })}
            >
                {count}
            </div>
            {isModalOpen && (
                <CategoryModal
                    category={{ id, name, color }}
                    onClose={() => setIsModalOpen(false)}
                />
            )}
        </div>
    );
};

export default forwardRef(CategoryRow);
