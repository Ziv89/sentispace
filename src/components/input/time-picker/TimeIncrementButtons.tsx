import classes from './TimePicker.module.scss'

import { addMinutes } from 'date-fns'

interface TimeIncrementButtonsProps {
  arrayOfMinutes: number[]
  date: Date
  onDateChange: (date: Date) => void
}

const TimeIncrementButtons = ({
  arrayOfMinutes,
  date,
  onDateChange,
}: TimeIncrementButtonsProps) => (
  <div className={classes.incrementButtons}>
    {arrayOfMinutes.map((minutes) => (
      <button
        className={classes.incrementButton}
        onClick={() => onDateChange(addMinutes(date, minutes))}
        type="button"
        key={minutes}
      >
        +{minutes}m
      </button>
    ))}
  </div>
)

export default TimeIncrementButtons
