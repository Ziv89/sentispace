import classes from './CategoryModal.module.scss';

import { useState } from 'react';
import ModalPopup, { ButtonType } from '../generic/ModalPopup';
import { Category } from '../../data/interfaces';
import TextField from '../input/text-field/TextField';
import classNames from 'classnames/bind';
import { db } from '../../data/Database';
import Alert from '../generic/Alert';

const cx = classNames.bind(classes);

interface CategoryModalProps {
    onClose: () => void;
    category?: Category;
}

const CategoryModal = ({ onClose, category }: CategoryModalProps) => {
    const [name, setName] = useState<string>(category?.name || '');
    const [color, setColor] = useState<number>(category?.color || 0);
    const [deleteGuard, setDeleteGuard] = useState<boolean>(true);

    const title = category ? 'Edit Category' : 'Create Category';
    const primaryButtonText = category ? 'Save' : 'Create Category';
    const secondaryButtonText = category ? 'Delete Category' : 'Cancel';

    const disabledPrimaryButton =
        (category && category.name === name && category.color === color) ||
        (!category && (!name.length || !color));

    const onButtonClick = (button: ButtonType) => {
        switch (button) {
            case 'primary':
                if (!category) {
                    db.categories.add({ name, color } as Category);
                } else {
                    if (category.name !== name || category.color !== color)
                        db.categories.update(category.id, { name, color });
                }

                onClose();
                break;
            case 'secondary':
                if (deleteGuard) {
                    setDeleteGuard(false);
                    return;
                }
                if (category) {
                    db.transaction('rw', db.categories, db.activities, () => {
                        db.categories.delete(category.id);

                        db.activities.toCollection().modify((activity) => {
                            const index = activity.categoryIds.indexOf(
                                category.id
                            );
                            if (index > -1) {
                                activity.categoryIds.splice(index, 1);
                            }
                        });
                    });
                }
                onClose();
                break;
            case 'close':
                onClose();
                break;
        }
    };

    return (
        <ModalPopup
            title={title}
            primaryButtonText={primaryButtonText}
            disabledPrimaryButton={disabledPrimaryButton}
            secondaryButtonText={secondaryButtonText}
            dangerousSecondaryButton={!!category}
            onButtonClick={onButtonClick}
        >
            <TextField
                placeholder="Name your category"
                iconKey={'BookmarkSimple'}
                value={name}
                onChange={(event) => setName(event.target.value)}
            />
            <div className={classes.heading}>
                Select a color for your category
            </div>
            <div className={classes.colorsContainer}>
                {Array.from({ length: 16 }, (_, index) => {
                    const colorIndex = index + 1;
                    return (
                        <CategoryColor
                            key={index}
                            colorIndex={colorIndex}
                            isSelected={colorIndex === color}
                            onColorChange={setColor}
                        />
                    );
                })}
            </div>
            {!deleteGuard && (
                <Alert
                    severity="warning"
                    title="Are you sure about this?"
                    description="This can't be undone"
                    marginTop
                />
            )}
        </ModalPopup>
    );
};

interface CategoryColorProps {
    onColorChange: (color: number) => void;
    colorIndex: number;
    isSelected: boolean;
}

const CategoryColor = ({
    colorIndex,
    isSelected,
    onColorChange,
}: CategoryColorProps) => {
    return (
        <div
            onClick={() => onColorChange(colorIndex)}
            className={cx({
                colorSquare: true,
                currentColor: isSelected,
                [`color${colorIndex}`]: true,
            })}
        ></div>
    );
};

export default CategoryModal;
