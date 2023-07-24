import { Alerts } from './activityForm.enums';
import { AlertsData } from './activityForm.types';

export const validationData: AlertsData[] = [
    {
        type: Alerts.ICON_KEY,
        title: 'Invalid Icon',
        message: 'Please select a valid icon',
        severity: 'error',
    },
    {
        type: Alerts.TITLE,
        title: 'Invalid Title',
        message: 'Title length must be between 1 and 50 characters',
        severity: 'error',
    },
    {
        type: Alerts.DESCRIPTION,
        title: 'Invalid Description',
        message: 'Description length must not exceed 250 characters',
        severity: 'error',
    },
    {
        type: Alerts.RATING,
        title: 'Invalid Rating',
        message: 'Rating must be between 0 and 5',
        severity: 'error',
    },
    {
        type: Alerts.CATEGORIES,
        title: 'Invalid Category',
        message: 'Category must be a valid list',
        severity: 'error',
    },
    {
        type: Alerts.START_TIME,
        title: 'Invalid Start Date',
        message: 'Start date must not be in the future',
        severity: 'error',
    },
    {
        type: Alerts.END_TIME,
        title: 'Invalid End Date',
        message: 'End date must not be in the future',
        severity: 'error',
    },
];

export const deleteGuardData: AlertsData = {
    type: Alerts.DELETE_GUARD,
    title: 'Are you sure about this?',
    message: 'Click "Delete Activity" again to proceed.',
    severity: 'warning',
};
