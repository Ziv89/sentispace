import { useReducer } from 'react';
import { IconKeyType, getRandomIconKey, iconKeys } from '../assets/icons';
import { IndexableType } from 'dexie';
import { Rating } from '../data/types/Rating';
import { SeverityType } from '../components/generic/Alert';
import { addDays, isFuture, isSameDay } from 'date-fns';
import { Activity } from '../data/interfaces';
import { deepEqual } from '../utils/comparison';

type ActivityFormState = {
    iconKey: IconKeyType;
    title: string;
    description: string;
    categoryIds: IndexableType[];
    rating: Rating;
    startTime: Date;
    endTime?: Date;
    isNow: boolean;
    deleteGuard: boolean;
    alert: Alert | null;
};

type defaultState = Omit<ActivityFormState, 'isNow' | 'alert' | 'deleteGuard'>;

enum ActionType {
    SET_ICON_KEY = 'SET_ICON_KEY',
    SET_TITLE = 'SET_TITLE',
    SET_DESCRIPTION = 'SET_DESCRIPTION',
    SET_CATEGORIES = 'SET_CATEGORIES',
    SET_RATING = 'SET_RATING',
    SET_START_TIME = 'SET_START_TIME',
    SET_END_TIME = 'SET_END_TIME',
    SET_ALERT = 'SET_ALERT',
    CLEAR_ALERT = 'CLEAR_ALERT',
    SET_IS_NOW = 'SET_IS_NOW',
    SET_TIME = 'SET_TIME',
    RESET = 'RESET',
    SET_DELETE_GUARD = 'SET_DELETE_GUARD',
}

type SetTimeType = {
    startTime: Date;
    endTime?: Date;
    isNow: boolean;
};

type Action =
    | { type: ActionType.SET_ICON_KEY; payload: IconKeyType }
    | { type: ActionType.SET_TITLE; payload: string }
    | { type: ActionType.SET_DESCRIPTION; payload: string }
    | { type: ActionType.SET_CATEGORIES; payload: IndexableType[] }
    | { type: ActionType.SET_RATING; payload: Rating }
    | { type: ActionType.SET_START_TIME; payload: Date }
    | { type: ActionType.SET_END_TIME; payload: Date | undefined }
    | { type: ActionType.SET_ALERT; payload: Alert }
    | { type: ActionType.CLEAR_ALERT }
    | { type: ActionType.SET_IS_NOW; payload: boolean }
    | { type: ActionType.SET_TIME; payload: SetTimeType }
    | { type: ActionType.RESET; payload: ActivityFormState }
    | { type: ActionType.SET_DELETE_GUARD; payload: boolean };

type Alert = {
    type: Alerts;
    severity: SeverityType;
    title: string;
    description: string;
};

type AlertsData = {
    type: Alerts;
    title: string;
    message: string;
    severity: SeverityType;
};

export enum Alerts {
    ICON_KEY = 'iconKey',
    TITLE = 'title',
    DESCRIPTION = 'description',
    CATEGORIES = 'categoryIds',
    RATING = 'rating',
    START_TIME = 'startTime',
    END_TIME = 'endTime',
    DELETE_GUARD = 'deleteGuard',
}

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
    message: "This can't be undone",
    severity: 'warning',
};

function reducer(state: ActivityFormState, action: Action): ActivityFormState {
    switch (action.type) {
        case 'SET_TIME':
            const { startTime, endTime, isNow } = action.payload;
            return { ...state, startTime, endTime, isNow: isNow && false };
        case 'SET_ICON_KEY':
            return { ...state, iconKey: action.payload };
        case 'SET_TITLE':
            return { ...state, title: action.payload };
        case 'SET_DESCRIPTION':
            return { ...state, description: action.payload };
        case 'SET_CATEGORIES':
            return { ...state, categoryIds: action.payload };
        case 'SET_RATING':
            return { ...state, rating: action.payload };
        case 'SET_START_TIME':
            return { ...state, startTime: action.payload };
        case 'SET_END_TIME':
            return { ...state, endTime: action.payload };
        case 'SET_ALERT':
            return { ...state, alert: action.payload };
        case 'CLEAR_ALERT':
            return { ...state, alert: null };
        case 'SET_IS_NOW':
            return { ...state, isNow: action.payload };
        case 'SET_DELETE_GUARD':
            return { ...state, deleteGuard: action.payload };
        case 'RESET':
            return { ...state, ...action.payload };
        default:
            return state;
    }
}

const defaultState: defaultState = {
    iconKey: getRandomIconKey(),
    title: '',
    description: '',
    categoryIds: [],
    rating: 0,
    startTime: new Date(),
    endTime: undefined,
};

const useActivityForm = (activity?: Activity) => {
    const initialState: ActivityFormState = {
        iconKey: activity?.iconKey || defaultState.iconKey,
        title: activity?.title || defaultState.title,
        description: activity?.description || defaultState.description,
        categoryIds: activity?.categoryIds || defaultState.categoryIds,
        rating: activity?.rating || defaultState.rating,
        startTime: activity?.startTime || defaultState.startTime,
        endTime: activity?.endTime || defaultState.endTime,
        isNow: !activity,
        alert: null,
        deleteGuard: !!activity,
    };

    const [state, dispatch] = useReducer(reducer, initialState);

    const {
        title,
        description,
        rating,
        startTime,
        endTime,
        isNow,
        deleteGuard,
        iconKey,
        categoryIds,
    } = state;

    const validations = {
        [Alerts.ICON_KEY]: iconKeys.includes(iconKey),
        [Alerts.TITLE]: title.length >= 1 && title.length <= 50,
        [Alerts.DESCRIPTION]:
            description.length >= 0 && description.length <= 250,
        [Alerts.RATING]: rating >= 0 && rating <= 5,
        [Alerts.CATEGORIES]: Array.isArray(categoryIds),
        [Alerts.START_TIME]: !isFuture(startTime),
        [Alerts.END_TIME]: !endTime || !isFuture(endTime),
    };

    const isChanged = !deepEqual(
        { ...initialState, deleteGuard: null, alert: null },
        { ...state, deleteGuard: null, alert: null }
    );

    const setAlert = (
        type: Alerts,
        title: string,
        description: string,
        severity: SeverityType
    ) => {
        dispatch({
            type: ActionType.SET_ALERT,
            payload: { type, title, description, severity },
        });
    };

    const clearAlert = () => dispatch({ type: ActionType.CLEAR_ALERT });

    const setTime = (startTime: Date, endTime?: Date) => {
        dispatch({
            type: ActionType.SET_TIME,
            payload: { startTime, endTime, isNow },
        });
    };

    const setIcon = (iconKey: IconKeyType): void => {
        dispatch({
            type: ActionType.SET_ICON_KEY,
            payload: iconKey,
        });
    };

    const setTitle = (title: string): void => {
        dispatch({ type: ActionType.SET_TITLE, payload: title });
    };

    const setDescription = (description: string): void => {
        dispatch({ type: ActionType.SET_DESCRIPTION, payload: description });
    };

    const setCategories = (categoryIds: IndexableType[]): void => {
        dispatch({ type: ActionType.SET_CATEGORIES, payload: categoryIds });
    };

    const setRating = (rating: Rating): void => {
        dispatch({ type: ActionType.SET_RATING, payload: rating });
    };

    const setDate = (date: Date): void => {
        date.setHours(startTime.getHours());
        date.setMinutes(startTime.getMinutes());

        dispatch({ type: ActionType.SET_START_TIME, payload: date });

        if (!endTime) return;

        const adjustedEndTimeDate = new Date(date);
        adjustedEndTimeDate.setHours(endTime.getHours());
        adjustedEndTimeDate.setMinutes(endTime.getMinutes());

        const isStartAndEndSame = isSameDay(startTime, endTime);

        if (!isStartAndEndSame) addDays(adjustedEndTimeDate, 1);

        dispatch({
            type: ActionType.SET_END_TIME,
            payload: adjustedEndTimeDate,
        });
    };

    const resetState = () =>
        dispatch({ type: ActionType.RESET, payload: initialState });

    const enableDeleteGuard = () =>
        dispatch({ type: ActionType.SET_DELETE_GUARD, payload: true });

    const disableDeleteGuard = () =>
        dispatch({ type: ActionType.SET_DELETE_GUARD, payload: false });

    return {
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
    };
};

export default useActivityForm;
