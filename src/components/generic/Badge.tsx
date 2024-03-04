import classes from './Badge.module.scss'

import classNames from 'classnames/bind'

const cx = classNames.bind(classes)

interface BadgeProps {
  value: number
  top?: boolean
  left?: boolean
  right?: boolean
  bottom?: boolean
  center?: boolean
  color?: string
  className?: string
}

const Badge = ({
  value,
  top,
  left,
  right,
  bottom,
  center,
  color,
  className,
}: BadgeProps) => {
  return (
    <div
      className={cx(className, {
        badge: true,
        top,
        left,
        right,
        bottom,
        center,
      })}
      style={{ backgroundColor: color }}
    >
      {value}
    </div>
  )
}

export default Badge
