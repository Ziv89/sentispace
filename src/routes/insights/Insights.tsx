import classes from './Insights.module.scss'
import DistributionChart from './DistributionChart'
import OverviewStats from './OverviewStats'
import InsightsContextProvider from '../../data/contexts/InsightsContext'

const Insights = () => {
  return (
    <div className={classes.insights}>
      <h1 className={classes.header}>Insights</h1>
      <InsightsContextProvider>
        <div className={classes.content}>
          <OverviewStats />
          <DistributionChart />
        </div>
      </InsightsContextProvider>
    </div>
  )
}

export default Insights
