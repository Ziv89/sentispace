import { Hammer } from '@phosphor-icons/react';
import classes from './Categories.module.scss';

const Categories = () => {
    return (
        <div className={classes.categories}>
            <h1 className={classes.header}>Categories</h1>
            <div className={classes.content}>
                <h2>Work in progress</h2>
                <Hammer size={48} />
            </div>
        </div>
    );
};

export default Categories;
