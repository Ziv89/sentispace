import classes from './ActivityEditForm.module.scss';

import { ChangeEvent, MouseEvent, TouchEvent, useEffect } from 'react';
import { X } from '@phosphor-icons/react';
import TextField, { TextFieldElement } from '../input/text-field/TextField';
import IconPicker from '../input/icon-picker/IconPicker';
import RatingPicker from '../input/rating-picker/RatingPicker';
import { createPortal } from 'react-dom';
import { Activity } from '../../data/interfaces';
import DatePicker from '../input/date-picker/DatePicker';
import TimePicker from '../input/time-picker/TimePicker';
import Button from '../input/button/Button';
import Alert from '../generic/Alert';
import useActivityForm from './state/useActivityForm';
import { db } from '../../data/Database';
import {
    DELETE_GUARD_ALERT,
    VALIDATION_ALERTS,
} from './state/activityForm.constants';
import CategorySelect from '../category-selection/CategorySelect';

interface ActivityEditFormProps {
    onClose: () => void;
    activity?: Activity;
}

const CLOSE_ICON_PROPS = {
    size: 24,
};

const ActivityEditForm = ({ onClose, activity }: ActivityEditFormProps) => {
    const {
        state,
        validations,
        isChanged,
        deleteGuard,
        setTitle,
        setDescription,
        setRating,
        setDate,
        setTime,
        setIcon,
        setCategories,
        setAlert,
        clearAlert,
        resetState,
        enableDeleteGuard,
        disableDeleteGuard,
    } = useActivityForm(activity);

    const {
        title,
        description,
        rating,
        startTime,
        endTime,
        isNow,
        iconKey,
        categoryIds,
        alert,
    } = state;

    useEffect(() => {
        if (alert && alert.type !== 'deleteGuard' && validations[alert.type])
            clearAlert();
    }, [validations]);

    useEffect(() => {
        if (alert && alert.type === 'deleteGuard') {
            clearAlert();
            enableDeleteGuard();
        }
    }, [
        title,
        description,
        rating,
        startTime,
        endTime,
        isNow,
        iconKey,
        categoryIds,
    ]);

    const isFormValid = (): boolean => {
        for (let i = 0; i < VALIDATION_ALERTS.length; i++) {
            const { type } = VALIDATION_ALERTS[i];
            if (type !== 'deleteGuard' && !validations[type]) {
                setAlert(VALIDATION_ALERTS[i]);
                return false;
            }
        }

        return true;
    };

    const handleTitleChange = (event: ChangeEvent<TextFieldElement>) => {
        const { value } = event.target;
        setTitle(value);
    };

    const handleDescriptionChange = (event: ChangeEvent<TextFieldElement>) => {
        const { value } = event.target;
        setDescription(value);
    };

    const handleTimeChange = (startTime: Date, endTime?: Date): void => {
        if (isNow) {
            const now = new Date();
            setTime(now);
            return;
        }
        setTime(startTime, endTime);
    };

    const handlePrimaryButton = (event: MouseEvent | TouchEvent): void => {
        event.preventDefault();
        event.stopPropagation();

        if (!isFormValid()) return;

        if (activity) {
            db.activities.update(activity.id, {
                title,
                description,
                rating,
                startTime,
                endTime,
                iconKey,
                categoryIds,
            });

            onClose();
            return;
        }

        db.activities.add({
            title,
            description,
            rating,
            startTime,
            endTime: endTime,
            iconKey,
            categoryIds,
        } as Activity);
        onClose();
    };

    const handleSecondaryButton = async (
        event: MouseEvent | TouchEvent
    ): Promise<void> => {
        event.preventDefault();
        event.stopPropagation();

        if (activity) {
            if (deleteGuard) {
                setAlert(DELETE_GUARD_ALERT);
                disableDeleteGuard();

                return;
            }

            await db.activities.delete(activity.id);
            onClose();
            return;
        }

        resetState();
    };

    const handleClose = (event: MouseEvent | TouchEvent): void => {
        event.preventDefault();
        event.stopPropagation();

        onClose();
    };

    return createPortal(
        <div className="fullscreen-modal">
            <form className={classes.form}>
                <div className="header">
                    <h1 className="title">
                        {activity ? 'Edit Activity' : 'Create a new activity'}
                    </h1>
                    <X {...CLOSE_ICON_PROPS} onClick={handleClose} />
                </div>
                <div className={classes.inputs}>
                    <div className={classes.titleAndIcon}>
                        <IconPicker
                            className={classes.iconPicker}
                            label="Select an Icon"
                            iconKey={iconKey}
                            onIconChange={setIcon}
                        />
                        <TextField
                            label="Title"
                            iconKey={iconKey || 'PencilLine'}
                            name="title"
                            max={50}
                            placeholder="What's the name of your activity?"
                            value={title}
                            onChange={handleTitleChange}
                        />
                    </div>
                    <TextField
                        multiline
                        label="Description"
                        iconKey="FilmSlate"
                        name="description"
                        max={250}
                        placeholder="Give a brief description of your activity."
                        value={description}
                        onChange={handleDescriptionChange}
                    />
                    <CategorySelect
                        label="Categories (optional)"
                        placeholder="Select a category for your activity."
                        categoryIds={categoryIds}
                        onCategoriesChange={setCategories}
                    />
                    <RatingPicker
                        label="How did you feel about this activity?"
                        rating={rating}
                        onRatingChange={setRating}
                    />
                    <DatePicker
                        label="Date"
                        date={startTime}
                        onDateChange={setDate}
                    />
                    <TimePicker
                        label="Time"
                        startTime={startTime}
                        endTime={endTime}
                        isNow={isNow}
                        onTimeChange={handleTimeChange}
                    />
                    {!!alert && (
                        <Alert
                            isScrollIntoView
                            severity={alert.severity}
                            title={alert.title}
                            description={alert.description}
                        />
                    )}
                </div>
                <div className="buttons-panel">
                    <Button
                        variant="primary"
                        onClick={handlePrimaryButton}
                        disabled={!isChanged}
                    >
                        {activity ? 'Save Changes' : 'Create Activity'}
                    </Button>
                    <Button
                        variant="secondary"
                        onClick={handleSecondaryButton}
                        underline
                        isDangerous={!!activity}
                        disabled={!activity && !isChanged}
                    >
                        {activity ? 'Delete Activity' : 'Reset'}
                    </Button>
                </div>
            </form>
        </div>,
        document.body
    );
};

export default ActivityEditForm;
