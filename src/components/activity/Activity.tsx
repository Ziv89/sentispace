import classes from './Activity.module.scss';

import { MouseEventHandler, useContext } from 'react';
import { Activity as IActivity } from '../../data/interfaces';
import { Category } from '../../data/interfaces';
import { CategoriesContext } from '../../data/contexts/CategoriesContext';
import { formatTimeRange } from '../../utils/time';
import { getIconComponent } from '../../assets/icons';
import { Heart, IconProps } from '@phosphor-icons/react';
import classNames from 'classnames/bind';

const cx = classNames.bind(classes);

const RATING_ICON_PROPS: IconProps = {
    weight: 'fill',
    size: 20,
    color: 'var(--color-heart)',
};

interface ActivityComponentProps extends IActivity {
    onClick?: MouseEventHandler<HTMLDivElement>;
}

const Activity = ({
    iconId,
    title,
    description,
    rating,
    startTime,
    endTime,
    categoryIds,
    onClick,
}: ActivityComponentProps) => {
    const { categories } = useContext(CategoriesContext);

    const associatedCategories: Category[] = categories.filter((category) =>
        category && category.id ? categoryIds.includes(category.id) : false
    );

    const IconComponent = getIconComponent(iconId);

    return (
        <article className={classes.activity} onClick={onClick}>
            <div className={classes.content}>
                <div className={classes.icon}>
                    <IconComponent />
                </div>
                <h3 className={classes.title}>{title}</h3>
                <time className={classes.time}>
                    {formatTimeRange(startTime, endTime)}
                </time>
                <span className={classes.description}>{description}</span>
            </div>
            <div className={classes.footer}>
                <span className={classes.rating}>
                    <Heart {...RATING_ICON_PROPS} />
                    {rating}
                </span>
                <div className={classes.categories}>
                    {associatedCategories.map((category) => (
                        <span
                            className={cx({
                                category: true,
                                [`categoryColor${category.color}`]:
                                    category.color,
                            })}
                            key={category.color}
                        >
                            {category.name}
                        </span>
                    ))}
                </div>
            </div>
        </article>
    );
};

export default Activity;
