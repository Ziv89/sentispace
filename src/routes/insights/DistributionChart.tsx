import Card from '../../components/card/Card';
import { Activity, Category } from '../../data/interfaces';
import classes from './DistributionChart.module.scss';

const UNCATEGORIZED = 'Uncategorized';

type DistributionChartProps = {
  activities: Activity[];
  categories: Category[];
};

type NormalizedCategoriesWithCount = {
  [id: string]: { name: string; color: number; count: number };
};

const normalizeCategories = (
  categories: Category[]
): NormalizedCategoriesWithCount => {
  return categories.reduce((acc, { id, name, color }) => {
    acc[`${id}`] = { name, color, count: 0 };
    return acc;
  }, {} as NormalizedCategoriesWithCount);
};

function groupByCategory(activities: Activity[], categories: Category[]) {
  const group: NormalizedCategoriesWithCount = {
    [UNCATEGORIZED]: { name: UNCATEGORIZED, color: 0, count: 0 },
    ...normalizeCategories(categories),
  };

  activities.forEach((activity) => {
    const isUncategorized = activity.categoryIds.length === 0;

    if (isUncategorized) {
      group[UNCATEGORIZED].count++;
      return;
    }

    activity.categoryIds.forEach(
      (categoryId) => group[String(categoryId)].count++
    );
  });

  return group;
}

export default function DistributionChart({
  activities,
  categories,
}: DistributionChartProps) {
  if (activities.length === 0 || categories.length === 0) {
    return null;
  }

  const groupedByCategory = groupByCategory(activities, categories);

  const highestCount = Object.values(groupedByCategory).reduce((prev, curr) => {
    return curr.count > prev.count ? curr : prev;
  }).count;

  return (
    <Card className={classes.card}>
      <div className={classes.cardContainer}>
        <h2 className={classes.heading}>Activity Distribution</h2>
        <div className={classes.chart}>
          {Object.values(groupedByCategory)
            .sort((a, b) => b.count - a.count)
            .map(({ count, name, color }) => {
              if (count === 0) return null;

              const pct = Math.round((count / highestCount) * 100);

              return (
                <div key={name} className={classes.barWrapper}>
                  <label className={classes.barLabel}>
                    {name} <span>{count}</span>
                  </label>
                  <div className={classes.barShadow}>
                    <div
                      className={classes.bar}
                      style={{
                        width: `${pct}%`,
                        backgroundColor: `var(--color-category-${color})`,
                      }}
                    />
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </Card>
  );
}
