import { MouseEvent } from 'react';
import Button from '../../../../components/input/button/Button';
import classes from './ApplePrompt.module.scss';
import { ArrowRight, Export, PlusSquare } from '@phosphor-icons/react';

interface ApplePromptProps {
    isOpen: boolean;
    onClose: () => void;
}

const ICON_SIZE = 24;

const ApplePrompt = ({ isOpen, onClose }: ApplePromptProps) => {
    if (!isOpen) return null;

    const handleOnClose = (event: MouseEvent | TouchEvent): void => {
        event.stopPropagation();
        event.preventDefault();
        onClose();
    };

    return (
        <div className={classes.overlay} onClick={handleOnClose}>
            <div
                className={classes.container}
                onClick={(event) => event.stopPropagation()}
            >
                <h2 className={classes.header}>Install The App</h2>
                Add this to your home screen for fullscreen mode and offline
                access.
                <br />
                Just tap on the 'Share' button below and then select 'Add to
                Home Screen'.
                <div className={classes.instructions}>
                    <Export size={ICON_SIZE} className={classes.shareButton} />
                    <ArrowRight size={ICON_SIZE} />
                    <span className={classes.menuButton}>
                        Add to Home Screen
                        <PlusSquare size={ICON_SIZE} />
                    </span>
                </div>
                <Button variant="secondary" onClick={handleOnClose}>
                    Close
                </Button>
            </div>
        </div>
    );
};

export default ApplePrompt;
