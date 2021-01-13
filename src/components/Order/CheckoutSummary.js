import React from 'react';
import Burger from '../Burger/Burger';
import Button from '../UI/Button/Button';
import classes from './CheckoutSummary.css';

const CheckoutSummary = (props) => (
    <div className={classes.CheckoutSummary}>
        <h1>Good Choice!!!</h1>
        <div style={{ width: "100%", margin: "auto" }}>
            <Burger ig={props.ingredients} />
            <Button clicked={props.checkoutCancelled} btnType="Danger">Cancel</Button>
            <Button clicked={props.checkoutContinued} btnType="Success">Continue</Button>
        </div>
    </div>
);

export default CheckoutSummary;