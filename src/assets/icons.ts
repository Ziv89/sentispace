import * as Icon from '@phosphor-icons/react';
import { FunctionComponent } from 'react';

type ExcludeKeys =
    | 'Icon'
    | 'IconProps'
    | 'IconWeight'
    | 'IconContext'
    | 'IconBase';
export type IconIdType = Exclude<keyof typeof Icon, ExcludeKeys>;
export type IconComponentType = FunctionComponent<Icon.IconProps>;

export const getIconComponent = (iconId: IconIdType): IconComponentType => {
    return Icon[iconId] as IconComponentType;
};
