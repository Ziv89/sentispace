import { Hammer } from '@phosphor-icons/react';
import classes from './Insights.module.scss';

const Insights = () => {
    return (
        <div className={classes.insights}>
            <h1 className={classes.header}>Insights</h1>
            <div className={classes.content}>
                <h2>Work in progress</h2>
                <Hammer size={48} />
            </div>
        </div>
    );
};

export default Insights;
