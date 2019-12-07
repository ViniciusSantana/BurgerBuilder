import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    orders: [],
    loading: false,
    purchased: false,
};
const purchaseInit = (state) => updateObject(state, { purchased: false });
const purchaseBurgerStart = (state) => updateObject(state, { loading: true });
const purchaseBurgerFail = (state) => updateObject(state, { loading: false });
const purchaseBurgerSucces = (state, action) => {
    const newOrder = updateObject(action.orderData, { id: action.orderId });
    const updatedState = { loading: false, purchased: true, orders: state.orders.concat(newOrder) };
    return updateObject(state, updatedState);
};

// eslint-disable-next-line max-len
const fetchOrderSuccess = (state, action) => updateObject(state, { orders: action.orders, loading: false });
const fetchOrderFail = (state) => updateObject(state, { loading: false });
const fetchOrderStart = (state) => updateObject(state, { loading: true });


const reducer = (state = initialState, action) => {
    switch (action.type) {
    case actionTypes.PURCHASE_BURGER_SUCCESS: return purchaseBurgerSucces(state, action);
    case actionTypes.PURCHASE_BURGER_FAIL: return purchaseBurgerFail(state);
    case actionTypes.PURCHASE_BURGER_START: return purchaseBurgerStart(state);
    case actionTypes.PURCHASE_INIT: return purchaseInit(state);
    case actionTypes.FETCH_ORDERS_START: return fetchOrderStart(state);
    case actionTypes.FETCH_ORDERS_SUCCESS: return fetchOrderSuccess(state, action);
    case actionTypes.FETCH_ORDERS_FAIL: return fetchOrderFail(state);
    default: return state;
    }
};

export default reducer;
