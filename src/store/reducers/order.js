import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    orders: [],
    Loading: false,
    purchased: false,
};

const purchaseInit = (state, action) => {
    return updateObject(state, { purchased: false });
}
const purchaseBurgerSuccess = (state, action) => {
    const newOrder = updateObject(action.orderData, { id: action.orderId });
    return updateObject(state, {
        Loading: false,
        purchased: true,
        orders: state.orders.concat(newOrder)
    });
}
const purchaseBurgerFail = (state, action) => {
    return updateObject(state, { Loading: false });
}
const purchaseBurgerStart = (state, action) => {
    return updateObject(state, { Loading: true });
}
const fetchOrderSuccess = (state, action) => {
    return updateObject(state, { Loading: false, orders: action.orders });
}
const fetchOrderFailed = (state, action) => {
    return updateObject(state, { Loading: false });
}
const fetchOrderStart = (state, action) => {
    return updateObject(state, { Loading: true });
}


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.PURCHASE_INIT: return purchaseInit(state, action);
        case actionTypes.PURCHASE_BURGER_SUCCESS: return purchaseBurgerSuccess(state, action);
        case actionTypes.PURCHASE_BURGER_FAIL: return purchaseBurgerFail(state, action);
        case actionTypes.PURCHASE_BURGER_START: return purchaseBurgerStart(state, action);
        case actionTypes.FETCH_ORDERS_SUCCESS: return fetchOrderSuccess(state, action);
        case actionTypes.FETCH_ORDERS_FAIL: return fetchOrderFailed(state, action);
        case actionTypes.FETCH_ORDERS_START: return fetchOrderStart(state, action);
        default: return state;
    };
};

export default reducer;