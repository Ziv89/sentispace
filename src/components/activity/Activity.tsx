import classes from './Activity.module.scss';

import { useContext, useState } from 'react';
import { Activity as IActivity } from '../../data/interfaces';
import { Category } from '../../data/interfaces';
import { CategoriesContext } from '../../data/contexts/CategoriesContext';
import { formatTimeRange } from '../../utils/time';
import { getIconComponent } from '../../assets/icons';
import { Heart, IconProps } from '@phosphor-icons/react';
import CategoryBadge from '../category-badge/CategoryBadge';
import ActivityEditForm from '../activity-edit-form/ActivityEditForm';

const RATING_ICON_PROPS: IconProps = {
    weight: 'fill',
    size: 20,
    color: 'var(--color-heart)',
};

interface ActivityComponentProps extends IActivity {}

const Activity = ({
    id,
    iconKey,
    title,
    description,
    rating,
    startTime,
    endTime,
    categoryIds,
}: ActivityComponentProps) => {
    const { categories } = useContext(CategoriesContext);
    const [isEditFormOpen, setIsEditFormOpen] = useState<boolean>(false);

    const handleOnClick = () => setIsEditFormOpen(true);

    const associatedCategories: Category[] = categories.filter((category) =>
        category && category.id ? categoryIds.includes(category.id) : false
    );

    const IconComponent = getIconComponent(iconKey);

    return (
        <article className={classes.activity} onClick={handleOnClick}>
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
                    {associatedCategories.map(({ id, name, color }) => (
                        <CategoryBadge
                            key={id.toString()}
                            id={id}
                            name={name}
                            color={color}
                        />
                    ))}
                </div>
            </div>
            {isEditFormOpen && (
                <ActivityEditForm
                    onClose={() => setIsEditFormOpen(false)}
                    activity={{
                        id,
                        iconKey,
                        title,
                        description,
                        rating,
                        startTime,
                        endTime,
                        categoryIds,
                    }}
                />
            )}
        </article>
    );
};

export default Activity;
