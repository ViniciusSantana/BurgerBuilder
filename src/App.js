import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Layout from './hoc/Layout/Layout';
import BurgerBUilder from './container/BurguerBuilder/BurguerBuilder';
import Checkout from './container/Checkout/Checkout';
import Orders from './container/Orders/Orders';

class App extends Component {
    render() {
        return (
            <div>
                <Layout>
                    <Switch>
                        <Route path="/checkout" component={Checkout} />
                        <Route path="/orders" exact component={Orders} />
                        <Route path="/" exact component={BurgerBUilder} />
                    </Switch>
                </Layout>
            </div>
        );
    }
}

export default App;
