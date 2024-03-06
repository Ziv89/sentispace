import SettingsItem from '../../../settings-item/SettingsItem'
import { exportData } from '../userData.functions'

const ExportData = () => (
  <SettingsItem
    label="Export data"
    iconKey="DownloadSimple"
    onClick={exportData}
  />
)

export default ExportData
