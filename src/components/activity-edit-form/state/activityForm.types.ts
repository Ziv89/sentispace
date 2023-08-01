import { IndexableType } from 'dexie';
import { IconKeyType } from '../../../assets/icons';
import { Rating } from '../../../data/types/Rating';
import { ActionType, ActivityFormAlerts } from './activityForm.enums';
import { AlertType } from '../../generic/Alert';

export type ActivityFormState = {
    iconKey: IconKeyType;
    title: string;
    description: string;
    categoryIds: IndexableType[];
    rating: Rating;
    startTime: Date;
    endTime?: Date;
    isNow: boolean;
    deleteGuard: boolean;
    alert: ActivityFormAlert | null;
};

export type DefaultState = Omit<
    ActivityFormState,
    'isNow' | 'alert' | 'deleteGuard'
>;

type SetTimeType = {
    startTime: Date;
    endTime?: Date;
    isNow: boolean;
};

export type Action =
    | { type: ActionType.SET_ICON_KEY; payload: IconKeyType }
    | { type: ActionType.SET_TITLE; payload: string }
    | { type: ActionType.SET_DESCRIPTION; payload: string }
    | { type: ActionType.SET_CATEGORIES; payload: IndexableType[] }
    | { type: ActionType.SET_RATING; payload: Rating }
    | { type: ActionType.SET_START_TIME; payload: Date }
    | { type: ActionType.SET_END_TIME; payload: Date | undefined }
    | { type: ActionType.SET_ALERT; payload: ActivityFormAlert }
    | { type: ActionType.CLEAR_ALERT }
    | { type: ActionType.SET_IS_NOW; payload: boolean }
    | { type: ActionType.SET_TIME; payload: SetTimeType }
    | { type: ActionType.RESET; payload: ActivityFormState }
    | { type: ActionType.SET_DELETE_GUARD; payload: boolean };

export interface ActivityFormAlert extends AlertType {
    type: ActivityFormAlerts;
}
