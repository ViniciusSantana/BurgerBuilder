import React from 'react';
import styles from './Order.module.css';


const order = (props) => {
    const ingredients = [];

    for (const ingredientName in props.ingredients) {
        ingredients.push({ name: ingredientName, amount: props.ingredients[ingredientName] });
    }

    const ingredientOutput = ingredients.map((i) => (
        <span
            className={styles.Ingredient}
            key={i.name}
        >{i.name} ({i.amount})
        </span>
    ));
    return (
        <div className={styles.Order}>
            <p>Ingredients: {ingredientOutput}</p>
            <p>Price: <strong>USD {Number.parseFloat(props.price).toFixed(2)}</strong></p>
        </div>
    );
};

export default order;
