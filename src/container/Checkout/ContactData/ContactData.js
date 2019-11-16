import React, { Component } from 'react'
import Button from '../../../components/UI/Button/Button'
import style from './ContactData.module.css'
import axios from '../../../axios-orders';
import Spinner from  '../../../components/UI/Spinner/Spinner'
import Input from '../../../components/UI/Input/Input'
import { connect } from 'react-redux'
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as orderActions from '../../../store/actions/' 

class ContactData extends Component{
    state = {
        orderForm:{
            name:{ 
                elementType: 'input',
                elementConfig:{
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation:{
                    required: true
                },
                valid: false,
                touched:false
            },
            email: { 
                elementType: 'input',
                elementConfig:{
                    type: 'email',
                    placeholder: 'Your email'
                },
                value: '',
                validation:{
                    required: true
                },
                valid: false,
                touched:false
            },
            street: { 
                elementType: 'input',
                elementConfig:{
                    type: 'text',
                    placeholder: 'Your Address Street name'
                },
                value: '',
                validation:{
                    required: true
                },
                valid: false,
                touched:false
            },
            postalCode: { 
                elementType: 'input',
                elementConfig:{
                    type: 'text',
                    placeholder: 'Your Zip Code'
                },
                value: '',
                validation:{
                    required: true
                },
                valid: false,
                touched:false
            },
            number :{ 
                elementType: 'input',
                elementConfig:{
                    type: 'text',
                    placeholder: 'Your Address Number'
                },
                value: '',
                validation:{
                    required: true
                },
                valid: false,
                touched:false
            },    
            country: { 
                elementType: 'input',
                elementConfig:{
                    type: 'text',
                    placeholder: 'Your Country'
                },
                value: '',
                validation:{
                    required: true
                },
                valid: false,
                touched:false
            },
            deliveryMethod:{ 
                elementType: 'select',
                elementConfig:{
                    options: [
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'cheapest', displayValue: 'Cheapest'},
                    ]
                },
                value: 'cheapest'
            }
        },
        invalidForm: true,
    }

    orderHandler = (event) =>{
        event.preventDefault();
        const formData = {};
        Object.keys(this.state.orderForm)
            .forEach(o=>formData[o] = this.state.orderForm[o].value);
        const order = {
            ingredients : this.props.ings,
            price: this.props.price,
            orderData: formData ,
        }
        this.props.onOrderBurger(order);
    }

    checkValidity(value, rules){
        let isValid = true;
        if(rules){
            if(rules.required){
                isValid = value.trim()!== '' && isValid;
            }
        }

        return isValid;
    }


    render(){
        const form = this.createForm();      
        return (
            <div className ={style.ContactData} >
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        );
    }

    createForm(){
        const inputs = this.createInputs();
        let form = (
            <form onSubmit={this.orderHandler}>
                {inputs}
                <Button btnType="Success" disabled ={this.state.invalidForm}>ORDER</Button>
            </form>
        );
        if(this.props.loading)
            form = <Spinner/>

        return form;
    }

    inputChangedHandler = (event, inputIdentifier) =>{
        const updatedOrderForm = { ...this.state.orderForm};
        const updatedFormElement = {...updatedOrderForm[inputIdentifier]}
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid =this.checkValidity(updatedFormElement.value, updatedFormElement.validation)
        updatedFormElement.touched = true;
        const invalidForm = Object.keys(this.state.orderForm).some(key=> this.state.orderForm[key].valid === undefined ? false : !this.state.orderForm[key].valid);
        updatedOrderForm[inputIdentifier] = updatedFormElement;
        this.setState({orderForm:updatedOrderForm, invalidForm: invalidForm});
    }

    createInputs(){
        var inputs = Object.keys(this.state.orderForm).map(key =>{
        var formInput = this.state.orderForm[key];
        return  <Input 
                        key={key}
                        elementType={formInput.elementType} 
                        elementConfig={formInput.elementConfig} 
                        value={formInput.value}
                        invalid={!formInput.valid}
                        shouldValidate={formInput.validation && formInput.touched}
                        changed={(event) =>this.inputChangedHandler(event, key)}/>
        });
        return inputs;
    }
}

const mapStateToProps = (state) => ({
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    loading: state.order.loading
})
const mapDispatchToProps = dispatch=> {
    return {
        onOrderBurger: (orderData)=> dispatch(orderActions.purchaseBurger(orderData)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));  