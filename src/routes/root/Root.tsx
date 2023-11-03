import classes from './Root.module.scss';

import NavBar from '../../components/nav-bar/NavBar';
import { Outlet } from 'react-router-dom';
import { useStoredState } from '../../hooks/useStoredState';
import NewcomerPrompt from '../../components/newcomer-prompt/NewcomerPrompt';
import { db } from '../../data/Database';
import { initialActivities, initialCategories } from '../../data/newComer.constants';
import { Activity, Category } from '../../data/interfaces';

async function addInitialItems() {
    await db.categories.bulkAdd(initialCategories as Category[]);
    await db.activities.bulkAdd(initialActivities as Activity[]);
}

const Root = () => {

    const [isFirstTime, setIsFirstTime] = useStoredState(localStorage, 'isFirstTime', true);

    return (
        <div className={classes.app}>
            <Outlet />
            <NavBar />
            {isFirstTime && <NewcomerPrompt
                onAccept={addInitialItems}
                onClose={() => setIsFirstTime(false)}
            />}
        </div>
    );
};

export default Root;
