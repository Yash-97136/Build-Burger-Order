import React from 'react';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import Button from '../../UI/Button/Button';

const orderSummary = (props) => {
    const orderIngredients = Object.keys(props.ingredients)
        .map((igKey, i) => {
            return <li key={igKey + i}><span style={{ textTransform: 'capitalize' }}>{igKey}</span>: {props.ingredients[igKey]}</li>
        })
    return (
        <Aux>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients:</p>
            <ul>
                {orderIngredients}
            </ul>
            <p>Total Price: <strong>{props.price.toFixed(2)}</strong></p>
            <p>Proceed to checkout?</p>
            <Button clicked={props.purchaseCancel} btnType="Danger">Cancel</Button>
            <Button clicked={props.purchaseContinue} btnType="Success" >Continue</Button>
        </Aux>
    )
}

export default orderSummary;
