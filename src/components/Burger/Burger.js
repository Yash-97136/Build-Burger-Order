import React from 'react';
import Burgeringredient from '../Burger/Burgeringredient/Burgeringredient';
import classes from './Burger.css';

const burger = (props) => {
    let transformedIngredients = Object.keys(props.ig)
        .map(igKey => {
            return [...Array(props.ig[igKey])].map((_, i) => {
                return <Burgeringredient key={igKey + i} type={igKey} />
            })
        })
        .reduce((arr, currEl) => {
            return arr.concat(currEl)
        }, [])
    if (transformedIngredients.length === 0) {
        transformedIngredients = "Please add some ingredients";
    }
    return (
        <div className={classes.Burger}>
            <Burgeringredient type="bread-top" />
            {transformedIngredients}
            <Burgeringredient type="bread-bottom" />
        </div>
    )
}

export default burger;