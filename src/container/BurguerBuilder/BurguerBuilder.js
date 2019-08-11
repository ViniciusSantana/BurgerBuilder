import React, {Component, Fragment} from 'react';
import Burguer from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';   
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import {connect} from 'react-redux';
import * as actions from '../../store/actions';


class BurguerBuilder extends Component{
    
    state = {
        purchasing: false,
        loading: false,
        error: false
    }
    
    componentDidMount(){
        // axios.get('/ingredients.json')
        // .then(response =>{
        //     var data = response.data;
        //     var keys = Object.keys(response.data);
        //     var purchaseable = keys.some(k => data[k] >0);
        //     this.setState({ingredients : response.data, purchaseable: purchaseable})
        //     })
        // .catch(error =>{
        //     this.setState({error: true})
        // });
    }

    purchaseHandler =  ()=>{
        this.setState({purchasing: true});
    }
    updatePurchaseState(ingredients){
        const sum = Object.keys(ingredients)
                    .map(igKey => ingredients[igKey])
                    .reduce((sum, el)=> sum + el, 0);

       return sum>0
    }

    purchaseCancelHandler = ()=>{
        this.setState({purchasing: false});
    }
    purchaseContinueHandler = ()=>{
        this.props.history.push('/checkout');
    }

    render() {
        const disableInfo = {...this.props.ings};
        for(let key in disableInfo){
            disableInfo[key]= disableInfo[key]<=0;
        }
        
        let orderSummary = null;
        let burger = this.state.error ?<p>Ingredients can't be loaded!</p> :  <Spinner/>;
        
        if(this.props.ings){
            orderSummary = <OrderSummary 
                                purchaseCancelled={this.purchaseCancelHandler}
                                purchaseContinued={this.purchaseContinueHandler}
                                price = {this.props.price}
                                ingredients ={this.props.ings}
                            />;
            
            burger =(
                <Fragment>
                    <Burguer ingredients = {this.props.ings}/>
                    <BuildControls
                        ingredientAdded = {this.props.onIngredientAdded}
                        ingredientRemoved = {this.props.onIngredientRemoved}
                        disabled={disableInfo}
                        price={this.props.price}
                        purchaseable={this.updatePurchaseState(this.props.ings)}
                        ordered = {this.purchaseHandler}
                        />
                </Fragment>
            );
        }

        if(this.state.loading){
            orderSummary = <Spinner/>;
        }
        
        return (
            <Fragment>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Fragment>
      )
    }
}

const mapStateToProps = (state) => ({
    ings: state.ingredients,
    price: state.totalPrice
})

const mapDispatchToProps = dispatch=> {
    return {
        onIngredientAdded: (ingName)=> dispatch({type: actions.ADD_INGREDIENT, ingredientName: ingName }),
        onIngredientRemoved: (ingName)=> dispatch({type: actions.REMOVE_INGREDIENT, ingredientName: ingName })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurguerBuilder, axios));