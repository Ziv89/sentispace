import classes from './IconPicker.module.scss';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { IconKeyType, getIconComponent, iconKeys } from '../../../assets/icons';
import ModalPopup, { ButtonType } from '../../generic/ModalPopup';
import TextField from '../text-field/TextField';
import classNames from 'classnames/bind';
import { useDebouce } from '../../../hooks/useDebounce';
import { deepEqual } from '../../../utils/comparison';

const cx = classNames.bind(classes);

interface IconPickerProps {
    className?: string;
    label: string;
    iconKey: IconKeyType;
    onIconChange: (iconKey: IconKeyType) => void;
}

const filterIconKeys = (query: string, iconKeys: IconKeyType[]) => {
    const cleanedQuery = query.toLowerCase().trim();
    return iconKeys.filter((iconKey) =>
        iconKey.toLowerCase().includes(cleanedQuery)
    );
};

const IconPicker = ({
    className,
    label,
    iconKey,
    onIconChange,
}: IconPickerProps) => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const debouncedSearchQuery = useDebouce(searchQuery);
    const [selectedIconKey, setSelectedIconKey] =
        useState<IconKeyType>(iconKey);
    const [displayedIconKeys, setDisplayedIconKeys] =
        useState<IconKeyType[]>(iconKeys);

    useEffect(() => {
        debouncedSearchQuery
            ? setDisplayedIconKeys(
                  filterIconKeys(debouncedSearchQuery, iconKeys)
              )
            : setDisplayedIconKeys(iconKeys);
    }, [debouncedSearchQuery]);

    const sameIcon = useMemo(
        () => deepEqual(iconKey, selectedIconKey),
        [iconKey, selectedIconKey]
    );

    const onButtonClick = useCallback(
        (button: ButtonType) => {
            switch (button) {
                case 'primary':
                    onIconChange(selectedIconKey);
                    setIsModalOpen(false);
                    break;
                case 'secondary':
                    setSelectedIconKey(iconKey);
                    setSearchQuery('');
                    break;
                case 'close':
                    setIsModalOpen(false);
                    break;
            }
        },
        [onIconChange, selectedIconKey, setSearchQuery, setIsModalOpen]
    );

    return (
        <div className={cx(className, { label: true })}>
            <div onClick={() => setIsModalOpen(true)} className={classes.label}>
                {label}
            </div>

            {isModalOpen && (
                <ModalPopup
                    title="Select an icon"
                    primaryButtonText="Save"
                    secondaryButtonText="Remove Icon"
                    onButtonClick={onButtonClick}
                    disabledPrimaryButton={sameIcon}
                >
                    <TextField
                        placeholder="Type in what you're looking for"
                        iconKey={selectedIconKey || 'Binoculars'}
                        value={searchQuery}
                        onChange={(event) => setSearchQuery(event.target.value)}
                    />
                    <div className={classes.iconsWrapper}>
                        <div className={classes.iconsContainer}>
                            {displayedIconKeys.map((iconKey) => (
                                <Icon
                                    key={iconKey}
                                    iconKey={iconKey as IconKeyType}
                                    isActive={iconKey == selectedIconKey}
                                    onIconChange={setSelectedIconKey}
                                />
                            ))}
                        </div>
                    </div>
                </ModalPopup>
            )}
        </div>
    );
};

interface IconProps {
    iconKey: IconKeyType;
    isActive?: boolean;
    onIconChange: (iconKey: IconKeyType) => void;
}

const Icon = ({ iconKey, isActive, onIconChange }: IconProps) => {
    const IconComponent = getIconComponent(iconKey);
    return (
        <IconComponent
            key={iconKey}
            className={cx({ icon: true, isActive })}
            onClick={() => onIconChange(iconKey)}
        />
    );
};

export default IconPicker;
