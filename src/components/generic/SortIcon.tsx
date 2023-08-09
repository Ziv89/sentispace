import { SortAscending, SortDescending } from '@phosphor-icons/react';

interface SortingIconProps {
    isAscending: boolean;
    size?: number;
}

const SortingIcon = ({ isAscending, size = 24 }: SortingIconProps) => {
    return isAscending ? (
        <SortAscending size={size} />
    ) : (
        <SortDescending size={size} />
    );
};

export default SortingIcon;
