import React from 'react';
import classes from './Order.css'

const Order = (props) => {
    const ingredients = Object.keys(props.ingredients).map(igKey => {
        return <span key={igKey} className={classes.Ingredients}>{igKey} ({props.ingredients[igKey]})</span>
    });
    return (
        <div className={classes.Order}>
            <p>Ingredients:{ingredients}</p>
            <p>Price: <strong>USD {Number.parseFloat(props.price).toFixed(2)}</strong></p>
        </div>
    )
};

export default Order;