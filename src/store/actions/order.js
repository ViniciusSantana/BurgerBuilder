import * as actionTypes from './actionTypes'
import axios from '../../axios-orders'

const purchaseBurgerSuccess = (id, orderData) =>{
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: orderData
    }
}
const purchaseBurgerFailed = (error) =>{
    return {
        type: actionTypes.PURCHASE_BURGER_FAIL,
        error: error
    }
}

export const purchaseBurger = (orderData) =>  {
    return dispatch => {
        dispatch(purchaseBurgerStart());
        axios.post('/orders.json',orderData)
            .then(response => {
                console.log(response)
                dispatch(purchaseBurgerSuccess(response.data.name, orderData))
            })
            .catch(error=>{
                console.error(error)
                dispatch(purchaseBurgerFailed(error))
            })
        ; 
    }
}

export const purchaseBurgerStart = () =>{
    return {
        type: actionTypes.PURCHASE_BURGER_START
    }
}

export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT
    }
}


export const fechOrders = () =>{
    return dispatch =>{
        dispatch(fetchOrdersStart());
        axios.get('/orders.json')
        .then(res =>{
            const fetchedOrders= [];
            for (let key in res.data){
                fetchedOrders.push({...res.data[key], id: key})
            }
            dispatch(fetchOrdersSuccess(fetchedOrders))
        }).catch(err =>{
            dispatch(fetchOrdersFail(err))
        })
    }
}

const fetchOrdersSuccess = (orders) =>{
    return{
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders: orders
    }
}

const fetchOrdersFail = (error) =>{
    return{
        type: actionTypes.FETCH_ORDERS_FAIL,
        error: error
    }
}

const fetchOrdersStart = () =>{
    return{
        type: actionTypes.FETCH_ORDERS_START,
    }
}