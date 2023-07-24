import { Action, ActivityFormState } from './activityForm.types';

export function reducer(
    state: ActivityFormState,
    action: Action
): ActivityFormState {
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
