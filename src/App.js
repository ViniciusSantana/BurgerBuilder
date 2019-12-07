import React, { Component } from 'react';
import {
    Route, Switch, withRouter, Redirect,
} from 'react-router-dom';
import { connect } from 'react-redux';
import Layout from './hoc/Layout/Layout';
import BurgerBUilder from './container/BurguerBuilder/BurguerBuilder';
import Checkout from './container/Checkout/Checkout';
import Orders from './container/Orders/Orders';
import Auth from './container/Auth/Auth';
import Logout from './container/Auth/Logout/Logout';
import * as actions from './store/actions';

class App extends Component {
    componentDidMount() {
        const { onTryAutoSignIn } = this.props;

        onTryAutoSignIn();
    }

    render() {
        let routes = (
            <Switch>
                <Route path="/auth" exact component={Auth} />
                <Route path="/" exact component={BurgerBUilder} />
                <Redirect to="/" />
            </Switch>
        );
        const { isAuthenticated } = this.props;

        if (isAuthenticated) {
            routes = (
                <Switch>
                    <Route path="/orders" exact component={Orders} />
                    <Route path="/logout" exact component={Logout} />
                    <Route path="/checkout" component={Checkout} />
                    <Route path="/" exact component={BurgerBUilder} />
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
