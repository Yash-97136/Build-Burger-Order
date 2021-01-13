import React from 'react';
import classes from './BuildControl.css';

const buildControl = (props) => (
    <div className={classes.BuildControl}>
        <div className={classes.Label}>{props.label}</div>
        <button onClick={props.delete} disabled={props.disabled} className={classes.Less}>Less</button>
        <button onClick={props.add} className={classes.More}>More</button>
    </div>
)
export default buildControl;