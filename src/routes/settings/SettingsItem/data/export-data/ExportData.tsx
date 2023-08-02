import SettingsItem from '../../SettingsItem';
import { exportData } from '../data.functions';

const ExportData = () => (
    <SettingsItem
        label="Export data"
        iconKey="DownloadSimple"
        onClick={exportData}
    />
);

export default ExportData;
