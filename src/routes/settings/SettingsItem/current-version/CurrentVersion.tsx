import SettingsItem from '../SettingsItem';
import { Link } from 'react-router-dom';

const RELEASE_DATE = new Date('04/11/2023').toDateString();
const VERSION = '0.0.1a';

const CurrentVersion = () => {
    return (
        <SettingsItem iconKey="GithubLogo" label="Current version">
            <Link
                to={'https://github.com/Polarts/sentispace'}
            >{`${RELEASE_DATE} - ${VERSION}`}</Link>
        </SettingsItem>
    );
};

export default CurrentVersion;
