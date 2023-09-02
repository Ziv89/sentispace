import SettingsItem from '../SettingsItem';
import { Link } from 'react-router-dom';

const VERSION = 'RELEASE_DATE VERSION';

const CurrentVersion = () => {
    return (
        <SettingsItem iconKey="GithubLogo" label="Current version">
            <Link to={'https://github.com/Polarts/feel-tracker'}>
                {VERSION}
            </Link>
        </SettingsItem>
    );
};

export default CurrentVersion;
