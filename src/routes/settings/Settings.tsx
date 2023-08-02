import classes from './Settings.module.scss';

import CurrentVersion from './SettingsItem/current-version/CurrentVersion';
import DeleteData from './SettingsItem/data/delete-data/DeleteData';
import ExportData from './SettingsItem/data/export-data/ExportData';
import ImportData from './SettingsItem/data/import-data/ImportData';

const Settings = () => (
    <div className={classes.container}>
        <h1 className={classes.header}>Settings</h1>
        <div className={classes.options}>
            <CurrentVersion />
            <ImportData />
            <ExportData />
            <DeleteData />
        </div>
    </div>
);

export default Settings;
