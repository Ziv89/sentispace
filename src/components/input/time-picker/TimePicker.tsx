import classes from './TimePicker.module.scss'

import TextField from '../text-field/TextField'
import { MouseEvent, TouchEvent, useMemo, useState } from 'react'
import ModalPopup, { ButtonType } from '../../generic/ModalPopup'
import { addDays, isBefore, isSameMinute } from 'date-fns'
import Switch from '../switch/Switch'
import classNames from 'classnames/bind'
import { formatTimeRange } from '../../../utils/time'
import TimeIncrementButtons from './TimeIncrementButtons'
import TimeInput from './TimeInput'

const cx = classNames.bind(classes)

interface TimePickerProps {
  label: string
  startTime: Date
  endTime?: Date
  isNow: boolean
  onTimeChange: (startTime: Date, endTime?: Date) => void
}

const TimePicker = ({
  label,
  startTime,
  endTime,
  isNow,
  onTimeChange,
}: TimePickerProps) => {
  const [selectedStartTime, setSelectedStartTime] = useState<Date>(startTime)
  const [selectedEndTime, setSelectedEndTime] = useState<Date>(
    endTime || startTime,
  )

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [displayEndTime, setDisplayEndTime] = useState<boolean>(!!endTime)

  const inputValue = useMemo(
    () =>
      formatTimeRange(
        selectedStartTime,
        displayEndTime ? selectedEndTime : undefined,
        isNow,
      ),
    [selectedStartTime, displayEndTime, selectedEndTime, isNow],
  )

  const disabledButton = () => {
    const isStartTimeUnchanged = isSameMinute(startTime, selectedStartTime)
    const isEndTimeUnchanged = endTime && isSameMinute(endTime, selectedEndTime)
    const areStartAndEndSame = isSameMinute(selectedStartTime, selectedEndTime)

    if (!displayEndTime) {
      // If the end time is not displayed, the button should be disabled if the start time is unchanged
      // but if there's an end time, or if isNow is true, the button should always be enabled
      return isStartTimeUnchanged && !(endTime || isNow)
    }

    if (displayEndTime) {
      // If the end time is displayed, the button should be disabled in the following cases:
      // 1. Start and end time are the same, and the start time is unchanged
      // 2. An end time exists and both start and end times are unchanged
      return (
        (areStartAndEndSame && isStartTimeUnchanged) ||
        (endTime && isStartTimeUnchanged && isEndTimeUnchanged)
      )
    }

    return false
  }

  const onButtonClick = (button: ButtonType): void => {
    switch (button) {
      case 'primary':
        // eslint-disable-next-line no-case-declarations
        let adjustedEndTime: Date | undefined

        if (displayEndTime && selectedEndTime) {
          // If the end time is displayed, and the end time is before the start time, add a day to the end time
          if (isBefore(selectedEndTime, selectedStartTime)) {
            adjustedEndTime = addDays(selectedEndTime, 1)
            setSelectedEndTime(adjustedEndTime)
          } else {
            adjustedEndTime = selectedEndTime
          }
        }

        onTimeChange(selectedStartTime, adjustedEndTime)
        setIsModalOpen(false)
        break
      case 'secondary':
        handleTimeReset()
        break
      case 'close':
        setIsModalOpen(false)
        setDisplayEndTime(endTime instanceof Date)
        break
    }
  }

  const handleTimeReset = (): void => {
    setSelectedStartTime(startTime)
    setSelectedEndTime(endTime || startTime)
  }

  const handleEndTimeToggle = (): void => {
    if (displayEndTime) {
      setTimeout(() => setSelectedEndTime(selectedStartTime), 250)
    } else {
      setSelectedEndTime(endTime || selectedStartTime)
    }
    setDisplayEndTime((prev) => !prev)
  }

  const handleModalOpen = (event: MouseEvent | TouchEvent): void => {
    event.stopPropagation()
    const target = event.target as HTMLInputElement
    target.blur()
    setIsModalOpen(() => {
      setSelectedStartTime(isNow ? new Date() : startTime)
      setSelectedEndTime(isNow ? new Date() : endTime || startTime)

      return true
    })
  }

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
          />

          <div className={classes.endTimeToggle}>
            <div className={classes.label}>End time (optional)</div>
            <Switch checked={displayEndTime} onChange={handleEndTimeToggle} />
          </div>

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
              />
            </div>
          </div>
        </ModalPopup>
      )}
    </>
  )
}

export default TimePicker
