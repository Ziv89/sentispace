import SettingsItem from '../../settings-item/SettingsItem'
import { Link } from 'react-router-dom'

declare const __APP_VERSION__: string

const CurrentVersion = () => {
  return (
    <SettingsItem iconKey="GithubLogo" label="Current version">
      <Link to={'https://github.com/Polarts/sentispace'}>
        {__APP_VERSION__}
      </Link>
    </SettingsItem>
  )
}

export default CurrentVersion
