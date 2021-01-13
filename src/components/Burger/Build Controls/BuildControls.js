import React from 'react';
import classes from './Buildcontrols.css'
import BuildControl from './Build Control/BuildControl'

const controls = [
    { label: "Salad", type: "salad" },
    { label: "Cheese", type: "cheese" },
    { label: "Bacon", type: "bacon" },
    { label: "Meat", type: "meat" }
]

const buildcontrols = (props) => (
    <div className={classes.BuildControls}>
        <p>Current Price: <strong>{props.price.toFixed(2)}</strong></p>
        {controls.map((ele) => {
            return <BuildControl label={ele.label} delete={() => props.deleteIg(ele.type)}
                add={() => props.addIg(ele.type)}
                key={ele.label} disabled={props.disabled[ele.type]} />
        }
        )}
        <button onClick={props.ordered}
            disabled={!props.purchasable}
            className={classes.OrderButton}>{props.isAuth ? 'ORDER NOW' : 'SIGN UP TO ORDER'}</button>
    </div>
)

export default buildcontrols;