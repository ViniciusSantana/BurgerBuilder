import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

const purchaseBurgerSuccess = (id, orderData) => ({
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    orderId: id,
    orderData,
});
const purchaseBurgerFailed = (error) => ({
    type: actionTypes.PURCHASE_BURGER_FAIL,
    error,
});

export const purchaseBurgerStart = () => ({
    type: actionTypes.PURCHASE_BURGER_START,
});

export const purchaseBurger = (orderData) => (dispatch, getState) => {
    dispatch(purchaseBurgerStart());
    const { auth } = getState();
    const { token } = auth;
    axios.post(`/orders.json?auth=${token}`, orderData)
        .then((response) => {
            dispatch(purchaseBurgerSuccess(response.data.name, orderData));
        })
        .catch((error) => {
            console.error(error);
            dispatch(purchaseBurgerFailed(error));
        });
};

export const purchaseInit = () => ({
    type: actionTypes.PURCHASE_INIT,
});

const fetchOrdersSuccess = (orders) => ({
    type: actionTypes.FETCH_ORDERS_SUCCESS,
    orders,
});

const fetchOrdersFail = (error) => ({
    type: actionTypes.FETCH_ORDERS_FAIL,
    error,
});

const fetchOrdersStart = () => ({
    type: actionTypes.FETCH_ORDERS_START,
});

export const fechOrders = (token, userId) => (dispatch) => {
    dispatch(fetchOrdersStart());
    const queryParams = `?auth=${token}&orderBy="userId"&equalTo="${userId}"`;
    axios.get(`/orders.json${queryParams}`)
        .then((res) => {
            const fetchedOrders = [];
            for (const key in res.data) {
                fetchedOrders.push({ ...res.data[key], id: key });
            }
            dispatch(fetchOrdersSuccess(fetchedOrders));
        }).catch((err) => {
            dispatch(fetchOrdersFail(err));
        });
};
