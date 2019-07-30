import React from 'react'
import styles from './Button.module.css';
import PropTypes from 'prop-types'

const button = (props) => {
  
    return (
        <button 
            className={[styles.Button, styles[props.btnType]].join(' ')}
            onClick={props.clicked} disabled={props.disabled}>{props.children}</button>
    );
}

button.proTypes = {
    btnType : PropTypes.string,
    clicked: PropTypes.func.isRequired,
    disabled: PropTypes.string
}
export default  button;