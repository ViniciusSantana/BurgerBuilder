/* eslint-disable class-methods-use-this */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import style from './Auth.module.css';
import * as actions from '../../store/actions';
import { updateObject, checkValidity } from '../../shared/utility';

class Auth extends Component {
    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your email',
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true,
                },
                valid: false,
                touched: false,
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Your password',
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6,
                },
                valid: false,
                touched: false,
            },
        },
        isSignUp: true,
    }

    componentDidMount() {
        const { buildingBurger, onSetAuthRedirectPath } = this.props;

        if (!buildingBurger) {
            onSetAuthRedirectPath();
        }
    }

    switchAuthModeHandler = () => {
        this.setState((prevState) => ({ isSignUp: !prevState.isSignUp }));
    }

    onAuthenticate = (event) => {
        event.preventDefault();
        const { controls, isSignUp } = this.state;
        const { email, password } = controls;
        const { onAuth } = this.props;

        onAuth(email.value, password.value, isSignUp);
    };

    inputChangedHandler = (event, inputIdentifier) => {
        const { controls } = this.state;
        const updatedControls = updateObject(controls, {
            [inputIdentifier]: updateObject(controls[inputIdentifier], {
                valid: checkValidity(event.target.value, controls[inputIdentifier].validation),
                value: event.target.value,
                touched: true,
            }),
        });

        const invalidForm = Object.keys(updatedControls).some((key) => (updatedControls[key].valid === undefined ? false : !updatedControls[key].valid));
        this.setState({ controls: updatedControls, invalidForm });
    }

    createInputs() {
        const { controls } = this.state;
        const inputs = Object.keys(controls).map((key) => {
            const formInput = controls[key];
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

    createForm() {
        const inputs = this.createInputs();
        const { invalidForm } = this.state;
        const { loading, error } = this.props;
        let errorMessage = null;
        if (error) {
            errorMessage = (
                <p>{error.message}</p>
            );
        }
        let form = (
            <div>
                {errorMessage}
                <form onSubmit={this.onAuthenticate}>
                    {inputs}
                    <Button btnType="Success" disabled={invalidForm}>SUBMIT</Button>
                </form>
                <Button btnType="Danger" clicked={this.switchAuthModeHandler}>SWITCH TO SIGN {this.state.isSignUp ? 'IN' : 'UP'}</Button>
            </div>
        );
        if (loading) { form = <Spinner />; }

        return form;
    }

    render() {
        const { isAuth, authRedirectPath } = this.props;
        if (isAuth) {
            return <Redirect to={authRedirectPath} />;
        }

        const form = this.createForm();
        return (
            <div className={style.Auth}>
                <h4>Enter your Authentication Data</h4>
                {form}
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    onAuth: (email, password, isSignUp) => dispatch(actions.auth(email, password, isSignUp)),
    onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/')),
});

const mapStateToProps = (state) => ({
    authState: state.auth,
    burgerBuilderState: state.burgerBuilder,
    loading: state.auth.loading,
    error: state.auth.error,
    isAuth: state.auth.token !== null,
    token: state.auth.token,
    buildingBurger: state.burgerBuilder.building,
    authRedirectPath: state.auth.authRedirectPath,
});
export default connect(mapStateToProps, mapDispatchToProps)(Auth);
