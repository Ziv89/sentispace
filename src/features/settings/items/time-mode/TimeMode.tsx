import SettingsItem from '../../settings-item/SettingsItem';
import Switch from '../../../../components/input/switch/Switch';

import { useTimeModeContext } from '../../../../data/contexts/TimeModeContext';



const TimeMode = () => {
  const { is24HourMode, toggle24HourMode } = useTimeModeContext(); // Use context

  return (
    <SettingsItem label="24h Mode" iconKey="Clock">
      <Switch checked={is24HourMode} onChange={toggle24HourMode} />
    </SettingsItem>
  );
};

export default TimeMode;
