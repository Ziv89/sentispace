import classes from './NewcomerPropmt.module.scss';

import ModalPopup from '../generic/ModalPopup';
import { ArrowRight, GearSix, Trash } from '@phosphor-icons/react';
import { db } from '../../data/Database';
import { Category } from '../../data/interfaces';
import { Activity } from '../../data/interfaces';
import {
    initialCategories,
    initialActivities,
} from '../../data/newComer.constants';
import { useStoredState } from '../../hooks/useStoredState';
import { useEffect } from 'react';

async function addInitialItems() {
    await db.categories.bulkAdd(initialCategories as Category[]);
    await db.activities.bulkAdd(initialActivities as Activity[]);
}

const ICON_SIZE = 24;

const NewcomerPrompt = () => {
    const [isFirstTime, setIsFirstTime] = useStoredState<boolean>(
        localStorage,
        'isFirstTime',
        true
    );

    useEffect(() => {
        const isDatabaseEmpty = async () => {
            const count = await db.activities.count();

            if (count > 0) setIsFirstTime(false);
        };

        isDatabaseEmpty();
    }, []);

    if (!isFirstTime) return null;

    return (
        <ModalPopup
            title="Welcome!"
            primaryButtonText="Yes, please!"
            secondaryButtonText="No, thanks"
            onButtonClick={(type) => {
                if (type === 'primary') {
                    addInitialItems();
                }

                setIsFirstTime(false);
            }}
        >
            <div className={classes.container}>
                <p>Looks like it's your first time here!</p>
                <p>
                    Would you like us to add a few items to provide an example
                    of how to use our app? You can always remove them all by
                    going to the settings
                </p>
                <div className={classes.instructions}>
                    <GearSix size={ICON_SIZE} className={classes.settings} />
                    <ArrowRight size={ICON_SIZE} />
                    <span className={classes.settingsItem}>
                        <Trash size={ICON_SIZE} />
                        Delete data
                    </span>
                </div>
            </div>
        </ModalPopup>
    );
};

export default NewcomerPrompt;
