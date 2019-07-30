import React from 'react'
import styles from './Order.module.css'


const order = (props) =>{
   const ingredients = [];

   for(let ingredientName in props.ingredients){
        ingredients.push({name: ingredientName, amount:props.ingredients[ingredientName]})
   }

   const ingredientOutput = ingredients.map(i=>{
       return <span 
                className={styles.Ingredient}        
                key={i.name}>{i.name} ({i.amount})</span>
   })
    return (
        <div className= {styles.Order}>
            <p>Ingredients: {ingredientOutput}</p>   
            <p>Price: <strong>USD {props.price}</strong></p>   
        </div>
    )
}

export default order;
