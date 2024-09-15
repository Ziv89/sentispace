import { useMemo, useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import { formatTimeRange } from '@utils/functions';
import ModalPopup, { ButtonType } from '../../generic/modals/ModalPopup';
import Switch from '../switch/Switch';
import TextField from '../text-field/TextField';
import TimeIncrementButtons from './TimeIncrementButtons';
import TimeInput from './TimeInput';
import { addDays, isBefore, isSameMinute } from 'date-fns';
import classes from './TimePicker.module.scss';

const cx = classNames.bind(classes);

interface TimePickerProps {
  label: string;
  startTime: Date;
  endTime?: Date;
  isNow: boolean;
  onTimeChange: (startTime: Date, endTime?: Date) => void;
  is24HourMode: boolean;
  on24HourModeToggle: () => void;
}

const TimePicker = ({
  label,
  startTime,
  endTime,
  isNow,
  onTimeChange,
  is24HourMode,
  on24HourModeToggle,
}: TimePickerProps) => {
  const [selectedStartTime, setSelectedStartTime] = useState<Date>(startTime);
  const [selectedEndTime, setSelectedEndTime] = useState<Date>(endTime || startTime);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [displayEndTime, setDisplayEndTime] = useState<boolean>(!!endTime);

  // Retrieve is24HourMode from local storage
  const [is24HourModeStored, setIs24HourModeStored] = useState<boolean>(false);
  const [is24HourModeTemporary, setIs24HourModeTemporary] = useState<boolean>(is24HourMode);

  useEffect(() => {
    const savedMode = localStorage.getItem('is24HourMode');
    setIs24HourModeStored(savedMode ? JSON.parse(savedMode) : false);
  }, []);

  useEffect(() => {
    setIs24HourModeTemporary(is24HourModeStored);
  }, [is24HourModeStored]);

  const inputValue = useMemo(
    () =>
      formatTimeRange(
        selectedStartTime,
        displayEndTime ? selectedEndTime : undefined,
        isNow,
      ),
    [selectedStartTime, displayEndTime, selectedEndTime, isNow, is24HourModeTemporary]
  );

  const disabledButton = () => {
    const isStartTimeUnchanged = isSameMinute(startTime, selectedStartTime);
    const isEndTimeUnchanged = endTime && isSameMinute(endTime, selectedEndTime);
    const areStartAndEndSame = isSameMinute(selectedStartTime, selectedEndTime);

    if (!displayEndTime) {
      return isStartTimeUnchanged && !(endTime || isNow);
    }

    if (displayEndTime) {
      return (
        (areStartAndEndSame && isStartTimeUnchanged) ||
        (endTime && isStartTimeUnchanged && isEndTimeUnchanged)
      );
    }

    return false;
  };

  const onButtonClick = (button: ButtonType): void => {
    switch (button) {
      case 'primary':
        // eslint-disable-next-line no-case-declarations
        let adjustedEndTime: Date | undefined;

        if (displayEndTime && selectedEndTime) {
          if (isBefore(selectedEndTime, selectedStartTime)) {
            adjustedEndTime = addDays(selectedEndTime, 1);
            setSelectedEndTime(adjustedEndTime);
          } else {
            adjustedEndTime = selectedEndTime;
          }
        }

        onTimeChange(selectedStartTime, adjustedEndTime);
        setIsModalOpen(false);
        break;
      case 'secondary':
        handleTimeReset();
        break;
      case 'close':
        setIsModalOpen(false);
        setDisplayEndTime(endTime instanceof Date);
        break;
    }
  };

  const handleTimeReset = (): void => {
    setSelectedStartTime(startTime);
    setSelectedEndTime(endTime || startTime);
  };

  const handleEndTimeToggle = (): void => {
    if (displayEndTime) {
      setTimeout(() => setSelectedEndTime(selectedStartTime), 250);
    } else {
      setSelectedEndTime(endTime || selectedStartTime);
    }
    setDisplayEndTime(prev => !prev);
  };

  const handle24HourModeTemporaryToggle = (): void => {
    setIs24HourModeTemporary(prev => !prev);
    // Optionally, trigger a global toggle here
    on24HourModeToggle();
  };

  const handleModalOpen = (event: React.MouseEvent | React.TouchEvent): void => {
    event.stopPropagation();
    const target = event.target as HTMLInputElement;
    target.blur();
    setIsModalOpen(() => {
      setSelectedStartTime(isNow ? new Date() : startTime);
      setSelectedEndTime(isNow ? new Date() : endTime || startTime);

      return true;
    });
  };

  return (
    <>
      <TextField
        label={label}
        value={inputValue}
        className={classes.timeField}
        iconKey="Clock"
        onClick={(event) => handleModalOpen(event)}
        readOnly
      />
      {isModalOpen && (
        <ModalPopup
          title="Pick a time"
          primaryButtonText="Save"
          secondaryButtonText="Reset"
          onButtonClick={onButtonClick}
          disabledPrimaryButton={disabledButton()}
        >
          <div className={classes.label}>Start time</div>
          <TimeInput
            date={selectedStartTime}
            onDateChange={setSelectedStartTime}
            is24HourMode={is24HourModeTemporary} // Using the temporary toggle state here
          />

          <div className={classes.endTimeToggle}>
            <div className={classes.label}>End time (optional)</div>
            <Switch checked={displayEndTime} onChange={handleEndTimeToggle} />
          </div>

          {!is24HourModeStored && (
            <div className={classes.labelContainer}>
              <span className={classes.label}>24-hour mode only (optional)</span>
              <Switch
                checked={is24HourModeTemporary}
                onChange={handle24HourModeTemporaryToggle}
              />
            </div>
          )}

          <div
            className={cx({
              endTimeWrapper: true,
              open: displayEndTime,
            })}
          >
            <div className={classes.endtimeContainer}>
              <TimeIncrementButtons
                arrayOfMinutes={[1, 5, 10, 30]}
                date={selectedEndTime}
                onDateChange={setSelectedEndTime}
              />
              <TimeInput
                date={selectedEndTime}
                onDateChange={setSelectedEndTime}
                is24HourMode={is24HourModeTemporary} // Again using the temporary state
              />
            </div>
          </div>
        </ModalPopup>
      )}
    </>
  );
};

export default TimePicker;
