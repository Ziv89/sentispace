import classes from './Insights.module.scss';
import DistributionChart from './DistributionChart';
import OverviewStats from './OverviewStats';
import { useContext } from 'react';
import { ActivitiesContext } from '../../data/contexts/ActivitiesContext';
import { CategoriesContext } from '../../data/contexts/CategoriesContext';

const Insights = () => {
  const activities = useContext(ActivitiesContext);
  const { categories } = useContext(CategoriesContext);

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
