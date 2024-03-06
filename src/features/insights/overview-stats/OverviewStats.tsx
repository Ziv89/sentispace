import { differenceInCalendarDays } from 'date-fns'
import classes from './OverviewStats.module.scss'
import classNames from 'classnames'
import { useContext } from 'react'
import { Activity } from '@activities/Activity.interface'
import { InsightsContext } from '@/data/contexts/InsightsContext'

type StatCardProps = {
  title: string
  value: number
}

function StatCard({ title, value }: StatCardProps) {
  return (
    <div className={classNames('card', classes.card)}>
      <p className={classes.value}>{value}</p>
      <h2 className={classes.title}>{title}</h2>
    </div>
  )
}

const calculateLongestStreak = (activities: Activity[]) => {
  if (activities.length === 0) return 0

  const sortedActivities = activities.sort(
    (a, b) => a.startTime.getTime() - b.startTime.getTime(),
  )

  let longestStreak = 1
  let currentStreak = 1
  let prevDate = new Date(sortedActivities[0].startTime)

  sortedActivities.forEach((activity) => {
    const currentDate = new Date(activity.startTime)
    const diffInDays = differenceInCalendarDays(currentDate, prevDate)

    if (diffInDays === 1) {
      currentStreak++
      longestStreak = Math.max(longestStreak, currentStreak)
    } else if (diffInDays > 1) {
      currentStreak = 1
    }

    prevDate = currentDate
  })

  return longestStreak
}

export default function OverviewStatsProps() {
  const { activities, categories } = useContext(InsightsContext)
  const longestStreak = calculateLongestStreak(activities)

  return (
    <div className={classes.macro}>
      <StatCard title="activities" value={activities.length} />
      <StatCard title="categories" value={categories.length} />
      <StatCard title="streak" value={longestStreak} />
    </div>
  )
}
