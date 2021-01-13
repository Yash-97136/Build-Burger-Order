import React, { Component } from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

class Orders extends Component {

    componentDidMount() {
        this.props.onInitFetch(this.props.token, this.props.userId);
    }

    render() {
        let AllOrders = (
            this.props.orders.map(order => (
                <Order key={order.id} ingredients={order.ingredients} price={order.price} />
            ))
        )
        if (AllOrders.length === 0) {
            AllOrders = <p style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '1.5rem' }}>No orders!!! Make a delicious Burger with our app</p>
        }
        if (this.props.Loading) {
            AllOrders = <Spinner />
        }
        return (
            <div>
                {AllOrders}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        Loading: state.order.Loading,
        token: state.auth.token,
        userId: state.auth.userId
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onInitFetch: (token, userId) => dispatch(actions.fetchOrders(token, userId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));