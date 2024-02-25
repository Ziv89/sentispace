import classes from './Insights.module.scss';
import Card from '../../components/card/Card';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../../data/Database';
import { Activity, Category } from '../../data/interfaces';
import { differenceInCalendarDays } from 'date-fns';

const UNCATEGORIZED = 'uncategorized';

function MacroCard({ title, value }: { title: string; value: number }) {
  return (
    <Card className={classes.card}>
      <p className={classes.value}>{value}</p>
      <h2 className={classes.title}>{title}</h2>
    </Card>
  );
}

const calculateLongestStreak = (activities: Activity[]) => {
  if (activities.length === 0) return 0;

  const sortedActivities = activities.sort(
    (a, b) => a.startTime.getTime() - b.startTime.getTime()
  );

  let longestStreak = 1;
  let currentStreak = 1;
  let prevDate = new Date(sortedActivities[0].startTime);

  sortedActivities.forEach((activity) => {
    const currentDate = new Date(activity.startTime);
    const diffInDays = differenceInCalendarDays(currentDate, prevDate);

    if (diffInDays === 1) {
      currentStreak++;
      longestStreak = Math.max(longestStreak, currentStreak);
    } else if (diffInDays > 1) {
      currentStreak = 1;
    }

    prevDate = currentDate;
  });

  return longestStreak;
};

type NormalizedCategories = {
  [id: string]: { name: string; color: number; count: number };
};

const normalizeCategories = (categories: Category[]): NormalizedCategories => {
  return categories.reduce((acc, { id, name, color }) => {
    acc[`${id}`] = { name, color, count: 0 };
    return acc;
  }, {} as NormalizedCategories);
};

function groupByCategory(activities: Activity[], categories: Category[]) {
  const normalizedCategories = normalizeCategories(categories);
  const group: {
    [key: string]: { name: string; color: number; count: number };
  } = {
    [UNCATEGORIZED]: {
      name: 'Uncategorized',
      color: 0,
      count: 0,
    },
    ...normalizedCategories,
  };

  activities.forEach((activity) => {
    const isUncategorized = activity.categoryIds.length === 0;

    if (isUncategorized) {
      group[UNCATEGORIZED].count++;
      return;
    }

    activity.categoryIds.forEach((categoryId) => {
      const categoryIdKey = String(categoryId);
      group[categoryIdKey].count++;
    });
  });
  return group;
}

const Insights = () => {
  const activities = useLiveQuery(() => db.activities.toArray()) ?? [];
  const categories = useLiveQuery(() => db.categories.toArray()) ?? [];

  const totalActivities = activities.length;
  const groupedByCategory = groupByCategory(activities, categories);
  const longestStreak = calculateLongestStreak(activities);

  return (
    <div className={classes.insights}>
      <h1 className={classes.header}>Insights</h1>
      <div className={classes.content}>
        <div className={classes.macro}>
          <MacroCard title="activities" value={activities.length} />
          <MacroCard title="categories" value={categories.length} />
          <MacroCard title="streak" value={longestStreak} />
        </div>
        <Card className={classes.stats}>
          <h2 className={classes.heading}>Activity Distribution</h2>
          <div className={classes.chart}>
            {Object.values(groupedByCategory).map((category, i) => {
              const count = category.count;
              const pct = Math.round((count / totalActivities) * 100);
              return (
                <div key={i} className={classes.barWrapper}>
                  <label className={classes.barLabel}>
                    {category.name} <span>{count}</span>
                  </label>
                  <div className={classes.barShadow}>
                    <div
                      className={classes.bar}
                      style={{
                        width: `${pct}%`,
                        backgroundColor: `var(--color-category-${i + 1})`,
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Insights;
