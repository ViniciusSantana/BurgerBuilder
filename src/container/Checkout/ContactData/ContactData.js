import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '../../../components/UI/Button/Button';
import style from './ContactData.module.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as orderActions from '../../../store/actions';

class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name',
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your email',
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Address Street name',
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
            },
            postalCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Zip Code',
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
            },
            number: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Address Number',
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Country',
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        { value: 'fastest', displayValue: 'Fastest' },
                        { value: 'cheapest', displayValue: 'Cheapest' },
                    ],
                },
                value: 'cheapest',
            },
        },
        invalidForm: true,
    }

    orderHandler = (event) => {
        event.preventDefault();
        const formData = {};
        const { orderForm } = this.state;
        Object.keys(orderForm)
            .forEach((o) => formData[o] = orderForm[o].value);
        const {
            ingredients, price, onOrderBurger, userId,
        } = this.props;
        const order = {
            ingredients,
            price,
            userId,
            orderData: formData,
        };

        onOrderBurger(order);
    }


    inputChangedHandler = (event, inputIdentifier) => {
        const { orderForm } = this.state;
        const updatedOrderForm = { ...orderForm };
        const updatedFormElement = { ...updatedOrderForm[inputIdentifier] };
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        const invalidForm = Object.keys(orderForm).some((key) => (orderForm[key].valid === undefined ? false : !orderForm[key].valid));
        updatedOrderForm[inputIdentifier] = updatedFormElement;
        this.setState({ orderForm: updatedOrderForm, invalidForm });
    }

    createForm() {
        const inputs = this.createInputs();
        const { loading } = this.props;
        const { invalidForm } = this.state;
        let form = (
            <form onSubmit={this.orderHandler}>
                {inputs}
                <Button btnType="Success" disabled={invalidForm}>ORDER</Button>
            </form>
        );
        if (loading) { form = <Spinner />; }

        return form;
    }

    checkValidity(value, rules) {
        let isValid = true;
        if (rules) {
            if (rules.required) {
                isValid = value.trim() !== '' && isValid;
            }
        }

        return isValid;
    }

    createInputs() {
        const { orderForm } = this.state;
        const inputs = Object.keys(orderForm).map((key) => {
            const formInput = orderForm[key];
            return (
                <Input
                    key={key}
                    elementType={formInput.elementType}
                    elementConfig={formInput.elementConfig}
                    value={formInput.value}
                    invalid={!formInput.valid}
                    shouldValidate={formInput.validation && formInput.touched}
                    changed={(event) => this.inputChangedHandler(event, key)}
                />
            );
        });
        return inputs;
    }

    render() {
        const form = this.createForm();
        return (
            <div className={style.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    ingredients: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    loading: state.order.loading,
    userId: state.auth.userId,
});
const mapDispatchToProps = (dispatch) => ({
    onOrderBurger: (orderData) => dispatch(orderActions.purchaseBurger(orderData)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));
