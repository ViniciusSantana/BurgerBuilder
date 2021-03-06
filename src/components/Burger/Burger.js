import React from 'react';
import styles from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {
    let burgerIngredients = Object.keys(props.ingredients)
        .map((igKey) => [...Array(props.ingredients[igKey])].map((_, i) => <BurgerIngredient key={igKey + i} type={igKey} />))
        .reduce((arr, el) => arr.concat(el), []);

    if (burgerIngredients.length === 0) {
        burgerIngredients = <p>Please Start Starting Ingredients</p>;
    }

    return (
        <div className={styles.Burger}>
            <BurgerIngredient type="bread-top" />
            {burgerIngredients}
            <BurgerIngredient type="bread-bottom" />
        </div>
    );
};

export default burger;
