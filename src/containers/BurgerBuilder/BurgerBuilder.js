import React, { Component } from 'react';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/Build Controls/BuildControls'
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';


export class BurgerBuilder extends Component {
    state = {
        purchasing: false,
    }
    componentDidMount() {
        this.props.onSetIngredients();
    }
    purchasableHandler = (ingredients) => {
        const sum = Object.values(ingredients)
            .reduce((acc, currentValue) => {
                return acc + currentValue;
            })
        return sum > 0;
    }
    // addIngredientHandler = (type) => {
    //     let oldPrice = this.state.totalPrice;
    //     let newPrice = IngredientPrices[type];
    //     let newTotalPrice = oldPrice + newPrice;
    //     const newIngredients = { ...this.state.ingredients };
    //     newIngredients[type] = newIngredients[type] + 1;
    //     this.setState({ totalPrice: newTotalPrice, ingredients: newIngredients });
    //     this.purchasableHandler(newIngredients);
    // }
    // deleteIngredientHandler = (type) => {
    //     let oldCount = this.state.ingredients[type];
    //     if (oldCount <= 0) {
    //         return;
    //     }
    //     let oldPrice = this.state.totalPrice;
    //     let newPrice = IngredientPrices[type];
    //     let newTotalPrice = oldPrice - newPrice;
    //     const newIngredients = { ...this.state.ingredients };
    //     newIngredients[type] = newIngredients[type] - 1;
    //     this.setState({ totalPrice: newTotalPrice, ingredients: newIngredients });
    //     this.purchasableHandler(newIngredients);
    // }

    purchasingHandler = () => {
        if (this.props.isAuthenticated) {
            this.setState({ purchasing: true });
        } else {
            this.props.onSetAuthRedirect('/checkout')
            this.props.history.push('/auth');
        }
    }
    purchaseCancelHandler = () => {
        this.setState({ purchasing: false });
    }
    purchaseContinueHandler = () => {
        this.props.onPurchaseInit();
        this.props.history.push('/checkout');
    }

    render() {
        const disabledInfo = { ...this.props.ings };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let orderSummary = null;

        let burger = this.props.error ? <p>Ingredients can't be loaded.</p> : <Spinner />
        if (this.props.ings) {
            burger = (
                <Aux>
                    <Burger ig={this.props.ings} />
                    <BuildControls deleteIg={this.props.onIngredientRemoved}
                        addIg={this.props.onIngredientAdded}
                        disabled={disabledInfo} price={this.props.totPrice}
                        purchasable={this.purchasableHandler(this.props.ings)}
                        ordered={this.purchasingHandler}
                        isAuth={this.props.isAuthenticated} />
                </Aux>

            )
            orderSummary = <OrderSummary purchaseCancel={this.purchaseCancelHandler} price={this.props.totPrice}
                purchaseContinue={this.purchaseContinueHandler} ingredients={this.props.ings} />

        }
        return (
            <Aux>
                <Modal clicked={this.purchaseCancelHandler} show={this.state.purchasing}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        )
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        totPrice: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuthenticated: state.auth.token !== null
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
        onSetIngredients: () => dispatch(actions.initIngredients()),
        onPurchaseInit: () => dispatch(actions.purchaseInit()),
        onSetAuthRedirect: (path) => dispatch(actions.setAuthRedirectPath(path))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));