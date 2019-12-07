import React, { Component, lazy } from 'react';
import {
    Route, Switch, withRouter, Redirect,
} from 'react-router-dom';
import { connect } from 'react-redux';
import Layout from './hoc/Layout/Layout';
import BurgerBUilder from './container/BurgerBuilder/BurgerBuilder';
import * as actions from './store/actions';
import waitingComponent from './shared/waitingComponent';

const Auth = lazy(() => import('./container/Auth/Auth'));
const Logout = lazy(() => import('./container/Auth/Logout/Logout'));
const Checkout = lazy(() => import('./container/Checkout/Checkout'));
const Orders = lazy(() => import('./container/Orders/Orders'));

class App extends Component {
    componentDidMount() {
        const { onTryAutoSignIn } = this.props;

        onTryAutoSignIn();
    }

    render() {
        let routes = (
            <Switch>
                <Route path="/auth" exact component={waitingComponent(Auth)} />
                <Route path="/" exact component={BurgerBUilder} />
                <Redirect to="/" />
            </Switch>
        );
        const { isAuthenticated } = this.props;

        if (isAuthenticated) {
            routes = (
                <Switch>
                    <Route path="/checkout" component={waitingComponent(Checkout)} />
                    <Route path="/orders" component={waitingComponent(Orders)} />
                    <Route path="/logout" component={waitingComponent(Logout)} />
                    <Route path="/auth" component={waitingComponent(Auth)} />
                    <Route path="/" exact component={BurgerBUilder} />
                    <Redirect to="/" />
                </Switch>
            );
        }
        return (
            <div>
                <Layout>
                    {routes}
                </Layout>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.token !== null,
});
const mapDispatchToProps = (dispatch) => ({
    onTryAutoSignIn: () => dispatch(actions.authCheckState()),
});
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
