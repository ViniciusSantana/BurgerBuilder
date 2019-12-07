import React from 'react';
import style from './Input.module.css';

const Input = (props) => {
    let inputElement = null;
    const classes = [style.InputElement];
    let validationError = null;
    if (props.invalid && props.shouldValidate) {
        classes.push(style.Invalid);
        validationError = <p className={style.ValidationError}> Please enter a valid value!</p>;
    }
    switch (props.elementType) {
    case 'textarea':
        inputElement = (
            <textarea
                onChange={props.changed}
                className={classes.join(' ')}
                {...props.elementConfig}
                value={props.value}
            />
        );
        break;
    case 'select':
        const options = props.elementConfig.options.map((o) => <option key={o.value} value={o.value}>{o.displayValue}</option>);
        inputElement = (
            <select
                onChange={props.changed}
                className={classes.join(' ')}
                value={props.value}
            >{options}
            </select>
        );
        break;
    case 'input':
    default:
        inputElement = (
            <input
                onChange={props.changed}
                className={classes.join(' ')}
                {...props.elementConfig}
                value={props.value}
            />
        );
        break;
    }


    return (
        <div className={style.Input}>
            <label className={style.Label}>{props.label}</label>
            {inputElement}
            {validationError}
        </div>
    );
};

export default Input;
