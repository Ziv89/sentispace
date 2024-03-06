import classes from './Insights.module.scss'
import DistributionChart from '../distribution-chart/DistributionChart'
import InsightsContextProvider from '../../../data/contexts/InsightsContext'
import OverviewStats from '../overview-stats/OverviewStats'

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
