import React, { Component } from 'react';
import { connect } from 'react-redux';
import Burguer from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';

class BurguerBuilder extends Component {
    state = {
        purchasing: false,
    }

    componentDidMount() {
        this.props.onInitIngredients();
    }

    purchaseHandler = () => {
        const { isAuth, history, onSetAuthRedirectPath } = this.props;

        if (isAuth) {
            this.setState({ purchasing: true });
        } else {
            onSetAuthRedirectPath('/checkout');
            history.push('/auth');
        }
    }


    purchaseCancelHandler = () => {
        this.setState({ purchasing: false });
    }

    purchaseContinueHandler = () => {
        const { history, onInitPurchase } = this.props;
        onInitPurchase();
        history.push('/checkout');
    }

    updatePurchaseState(ingredients) {
        const sum = Object.keys(ingredients)
            .map((igKey) => ingredients[igKey])
            .reduce((sum, el) => sum + el, 0);

        return sum > 0;
    }


    render() {
        const {
            ings, error, price, purchasing, onIngredientAdded, onIngredientRemoved, isAuth,
        } = this.props;

        const disableInfo = { ...ings };
        for (const key in disableInfo) {
            disableInfo[key] = disableInfo[key] <= 0;
        }

        let orderSummary = null;
        let burger = error ? <p>Ingredients can't be loaded!</p> : <Spinner />;

        if (ings) {
            orderSummary = (
                <OrderSummary
                    purchaseCancelled={this.purchaseCancelHandler}
                    purchaseContinued={this.purchaseContinueHandler}
                    price={price}
                    ingredients={ings}
                />
            );

            burger = (
                <>
                    <Burguer ingredients={ings} />
                    <BuildControls
                        ingredientAdded={onIngredientAdded}
                        ingredientRemoved={onIngredientRemoved}
                        disabled={disableInfo}
                        price={price}
                        purchaseable={this.updatePurchaseState(ings)}
                        isAuth={isAuth}
                        ordered={this.purchaseHandler}
                    />
                </>
            );
        }

        return (
            <>
                <Modal show={purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </>
        );
    }
}

const mapStateToProps = (state) => ({
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
    isAuth: state.auth.token !== null,
});

const mapDispatchToProps = (dispatch) => ({
    onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
    onIngredientRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
    onInitIngredients: () => dispatch(actions.initIngredients()),
    onInitPurchase: () => dispatch(actions.purchaseInit()),
    onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurguerBuilder, axios));
