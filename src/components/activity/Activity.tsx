import classes from './Activity.module.scss';

import {
    MouseEvent,
    TouchEvent,
    useContext,
    useEffect,
    useRef,
    useState,
} from 'react';
import { Activity as IActivity } from '../../data/interfaces';
import { Category } from '../../data/interfaces';
import { CategoriesContext } from '../../data/contexts/CategoriesContext';
import { formatTimeRange } from '../../utils/time';
import { getIconComponent } from '../../assets/icons';
import { Heart, IconProps } from '@phosphor-icons/react';
import CategoryBadge from '../category-selection/category-badge/CategoryBadge';
import ActivityEditForm from '../activity-edit-form/ActivityEditForm';
import classNames from 'classnames/bind';
import ActivityOption from './activity-option/ActivityOption';
import { IndexableType } from 'dexie';
import { db } from '../../data/Database';
import { useOutsideClick } from '../../hooks/useOutsideClick';

const cx = classNames.bind(classes);

const RATING_ICON_PROPS: IconProps = {
    weight: 'fill',
    size: 20,
    color: 'var(--color-heart)',
};

interface ActivityComponentProps extends IActivity {
    isSelected: boolean;
    onSelectedActivityChange: (id: IndexableType) => void;
    templateView?: boolean;
    onCloseTemplateModal?: () => void;
}

const Activity = ({
    id,
    iconKey,
    title,
    description,
    rating,
    startTime,
    endTime,
    categoryIds,
    isTemplate,
    isSelected,
    onSelectedActivityChange,
    templateView,
    onCloseTemplateModal,
}: ActivityComponentProps) => {
    const { categories } = useContext(CategoriesContext);
    const [isEditFormOpen, setIsEditFormOpen] = useState<boolean>(false);
    const [isDuplicate, setIsDuplicate] = useState<boolean>(false);

    const activityRef = useRef<HTMLElement>(null);

    useOutsideClick(activityRef, () => onSelectedActivityChange(0));

    useEffect(() => {
        if (isEditFormOpen && isDuplicate) return;

        setIsDuplicate(false);
    }, [isEditFormOpen]);

    const associatedCategories: Category[] | undefined = categories?.filter(
        (category) =>
            category && category.id ? categoryIds.includes(category.id) : false
    );

    const handleOnClick = (event: MouseEvent | TouchEvent) => {
        event.stopPropagation();
        onSelectedActivityChange(isSelected ? 0 : id);
    };

    const handleOnFormOpen = () => {
        setIsEditFormOpen(true);
        onSelectedActivityChange(0);
    };

    const handleOnTemplateChange = (event: MouseEvent | TouchEvent) => {
        event.stopPropagation();
        db.activities.update(id, { isTemplate: isTemplate === 1 ? 0 : 1 });
    };

    const handleOnDuplicateActivity = () => {
        setIsDuplicate(true);
        handleOnFormOpen();
    };

    const IconComponent = getIconComponent(iconKey);

    return (
        <article
            className={cx(classes.activity, {
                options: isSelected,
            })}
            onClick={handleOnClick}
            ref={activityRef}
        >
            {isSelected && (
                <div className={classes.blurred}>
                    {!templateView && (
                        <>
                            <ActivityOption
                                onClick={handleOnFormOpen}
                                label="Edit"
                                iconKey="NotePencil"
                            />
                            <ActivityOption
                                onClick={handleOnDuplicateActivity}
                                label="Duplicate"
                                iconKey="Copy"
                            />
                        </>
                    )}
                    {templateView && (
                        <ActivityOption
                            onClick={handleOnDuplicateActivity}
                            label="Create Activity"
                            iconKey="FilePlus"
                        />
                    )}
                    <ActivityOption
                        onClick={handleOnTemplateChange}
                        label={templateView ? 'Remove' : 'Template'}
                        iconKey={isTemplate ? 'File' : 'FileDashed'}
                        iconWeight={isTemplate ? 'fill' : 'light'}
                    />
                </div>
            )}
            <div className={classes.content}>
                <div className={classes.icon}>
                    <IconComponent />
                </div>
                <h3 className={classes.title}>{title}</h3>
                {!templateView && (
                    <time className={classes.time}>
                        {formatTimeRange(startTime, endTime)}
                    </time>
                )}
                <span className={classes.description}>{description}</span>
            </div>
            <div className={classes.footer}>
                <span className={classes.rating}>
                    <Heart {...RATING_ICON_PROPS} />
                    {rating}
                </span>
                <div className={classes.categories}>
                    {associatedCategories?.map(({ id, name, color }) => (
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
                    onCloseTemplateSelection={
                        onCloseTemplateModal ? onCloseTemplateModal : undefined
                    }
                    activity={
                        templateView || isDuplicate
                            ? {
                                  iconKey,
                                  title,
                                  description,
                                  rating,
                                  categoryIds,
                              }
                            : {
                                  id,
                                  iconKey,
                                  title,
                                  description,
                                  rating,
                                  startTime,
                                  endTime,
                                  categoryIds,
                              }
                    }
                />
            )}
        </article>
    );
};

export default Activity;
