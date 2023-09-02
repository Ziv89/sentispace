import { ActivityFormAlerts } from './activityForm.enums';
import { ActivityFormAlert } from './activityForm.types';

export const VALIDATION_ALERTS: readonly Readonly<ActivityFormAlert>[] =
    Object.freeze([
        {
            type: ActivityFormAlerts.ICON_KEY,
            title: 'Invalid Icon',
            description: 'Please select a valid icon',
            severity: 'error',
        },
        {
            type: ActivityFormAlerts.TITLE,
            title: 'Invalid Title',
            description: 'Title length must be between 1 and 50 characters',
            severity: 'error',
        },
        {
            type: ActivityFormAlerts.DESCRIPTION,
            title: 'Invalid Description',
            description: 'Description length must not exceed 250 characters',
            severity: 'error',
        },
        {
            type: ActivityFormAlerts.RATING,
            title: 'Invalid Rating',
            description: 'Rating must be between 0 and 5',
            severity: 'error',
        },
        {
            type: ActivityFormAlerts.CATEGORIES,
            title: 'Invalid Category',
            description: 'Category must be a valid list',
            severity: 'error',
        },
        {
            type: ActivityFormAlerts.START_TIME,
            title: 'Invalid Start Date',
            description: 'Start date must not be in the future',
            severity: 'error',
        },
        {
            type: ActivityFormAlerts.END_TIME,
            title: 'Invalid End Date',
            description: 'End date must not be in the future',
            severity: 'error',
        },
    ]);

export const DELETE_GUARD_ALERT: Readonly<ActivityFormAlert> = Object.freeze({
    type: ActivityFormAlerts.DELETE_GUARD,
    title: 'Are you sure about this?',
    description: 'Click "Delete Activity" again to proceed.',
    severity: 'warning',
});
