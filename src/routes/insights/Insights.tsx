import classes from './Insights.module.scss';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../../data/Database';
import DistributionChart from './DistributionChart';
import OverviewStats from './OverviewStats';

const Insights = () => {
  const activities = useLiveQuery(() => db.activities.toArray()) ?? [];
  const categories = useLiveQuery(() => db.categories.toArray()) ?? [];

  return (
    <div className={classes.insights}>
      <h1 className={classes.header}>Insights</h1>
      <div className={classes.content}>
        <OverviewStats activities={activities} categories={categories} />
        <DistributionChart activities={activities} categories={categories} />
      </div>
    </div>
  );
};

export default Insights;
