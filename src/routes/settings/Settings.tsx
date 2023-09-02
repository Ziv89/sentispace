import classes from './Settings.module.scss';

import CurrentVersion from './SettingsItem/current-version/CurrentVersion';
import DeleteData from './SettingsItem/user-data/delete-data/DeleteData';
import ExportData from './SettingsItem/user-data/export-data/ExportData';
import ImportData from './SettingsItem/user-data/import-data/ImportData';
import InstallApp from './SettingsItem/install-app/InstallApp';

const Settings = () => (
    <div className={classes.container}>
        <h1 className={classes.header}>Settings</h1>
        <div className={classes.options}>
            <CurrentVersion />
            <InstallApp />
            <ImportData />
            <ExportData />
            <DeleteData />
        </div>
    </div>
);

export default Settings;
