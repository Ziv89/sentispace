import classes from './ActivityEditForm.module.scss';

import { ChangeEvent, MouseEvent, TouchEvent, useEffect, useRef } from 'react';
import { X } from '@phosphor-icons/react';
import TextField, { TextFieldElement } from '../input/text-field/TextField';
import IconPicker from '../input/icon-picker/IconPicker';
import CategorySelect from '../input/category-select/CategorySelect';
import RatingPicker from '../input/rating-picker/RatingPicker';
import { createPortal } from 'react-dom';
import { Activity } from '../../data/interfaces';
import DatePicker from '../input/date-picker/DatePicker';
import TimePicker from '../input/time-picker/TimePicker';
import Button from '../input/button/Button';
import Alert from '../generic/Alert';
import useActivityForm from './state/useActivityForm';
import { db } from '../../data/Database';
import { deleteGuardData, validationData } from './state/activityForm.data';

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
        for (let i = 0; i < validationData.length; i++) {
            const { type, title, message, severity } = validationData[i];
            if (type !== 'deleteGuard' && !validations[type]) {
                setAlert(type, title, message, severity);
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

    const handleSecondaryButton = (event: MouseEvent | TouchEvent): void => {
        event.preventDefault();
        event.stopPropagation();

        if (activity) {
            if (deleteGuard) {
                const { type, title, message, severity } = deleteGuardData;
                setAlert(type, title, message, severity);
                disableDeleteGuard();

                return;
            }
            db.activities.delete(activity.id);
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
        <div className={classes.activityEditWrapper}>
            <form className={classes.form}>
                <div className={classes.header}>
                    <h1 className={classes.title}>
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
                        label="Category (optional)"
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
                <div className={classes.buttons}>
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
