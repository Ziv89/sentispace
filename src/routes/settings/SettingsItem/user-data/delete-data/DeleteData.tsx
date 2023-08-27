import { useState } from 'react';
import SettingsItem from '../../SettingsItem';
import { AlertType } from '../../../../../components/generic/Alert';
import { db } from '../../../../../data/Database';
import { DELETE_GUARD, DELETE_SUCCESS } from '../userData.constants';

const DeleteData = () => {
    const [alert, setAlert] = useState<AlertType | null>(null);
    const [deleteGuard, setDeleteGuard] = useState<boolean>(true);

    const handleOnClick = async () => {
        if (deleteGuard) {
            setAlert(DELETE_GUARD);
            setDeleteGuard(false);
            setTimeout(() => {
                setDeleteGuard(true);
            }, 5000);

            return;
        }

        await db.activities.clear();
        await db.categories.clear();

        setAlert(DELETE_SUCCESS);
    };

    return (
        <SettingsItem
            label="Delete data"
            iconKey="Trash"
            onClick={handleOnClick}
            alert={alert}
            onAlertRemove={() => setAlert(null)}
        />
    );
};

export default DeleteData;
