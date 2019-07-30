import React from 'react';
import styles from './BurgerIngredient.module.css';
import PropTypes from 'prop-types';


const burguerIngredient = (props) => {
    return getIngredient(props.type);
}
burguerIngredient.propTypes = {
    type: PropTypes.string.isRequired
}

const getIngredient = (type) => {
    let ingredient = null;
    switch (type){
        case('bread-bottom'):
            ingredient = <div className= {styles.BreadBottom}></div>;
            break;
        case('bread-top'):
            ingredient = (
                <div className = {styles.BreadTop}>
                    <div className ={styles.Seeds1} />
                    <div className ={styles.Seeds2} />
                </div>
            );
            break;
        case('meat'):
            ingredient = <div className = {styles.Meat}/>
            break;
        case('cheese'):
            ingredient = <div className = {styles.Cheese}/>
            break;
        case('salad'):
            ingredient = <div className = {styles.Salad}/>
            break;
        case('bacon'):
            ingredient = <div className = {styles.Bacon}/>
            break;
        default:
    }

    return ingredient;
}

export default burguerIngredient;