import React, { Component } from 'react';
import { connect } from 'react-redux';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions';
import Spinner from '../../components/UI/Spinner/Spinner';

class Orders extends Component {
    componentDidMount() {
        const { onFetchOrders, token, userId } = this.props;
        onFetchOrders(token, userId);
    }

    render() {
        let content = <Spinner />;
        const { loading, orders } = this.props;
        if (!loading) {
            content = orders.map((order) => (
                <Order
                    key={order.id}
                    ingredients={order.ingredients}
                    price={order.price}
                />
            ));
        }
        return (
            <div>
                {content}
            </div>
        );
    }
}


const mapStateToProps = (state) => ({
    orders: state.order.orders,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId,
});
const mapDispatchToProps = (dispatch) => ({
    onFetchOrders: (token, userId) => dispatch(actions.fechOrders(token, userId)),
});
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));
