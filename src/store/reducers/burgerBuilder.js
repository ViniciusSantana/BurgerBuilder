import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    ingredients: null,
    totalPrice: 4,
    error: false,
    building: false,
};

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7,
};


const setIngredients = (state, action) => {
    const updatedState = {
        ingredients: action.ingredients, totalPrice: 4, error: false, building: false,
    };
    return updateObject(state, updatedState);
};

const addIngredients = (state, action) => {
    const updatedIng = { [action.ingredientName]: state.ingredients[action.ingredientName] + 1 };
    const updatedIngredients = updateObject(state.ingredients, updatedIng);
    const updatedState = {
        ingredients: updatedIngredients,
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
        building: true,
    };
    return updateObject(state, updatedState);
};

const removeIngredient = (state, action) => {
    const updatedIng = { [action.ingredientName]: state.ingredients[action.ingredientName] - 1 };
    const updatedIngredients = updateObject(state.ingredients, updatedIng);
    const updatedState = {
        ingredients: updatedIngredients,
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
        building: true,
    };
    return updateObject(state, updatedState);
};

const fetchIngredientsFailed = (state) => updateObject(state, { error: true });
const reducer = (state = initialState, action) => {
    switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
        return addIngredients(state, action);
    case actionTypes.REMOVE_INGREDIENT:
        return removeIngredient(state, action);
    case actionTypes.SET_INGREDIENTS:
        return setIngredients(state, action);
    case actionTypes.FETCH_INGREDIENTS_FAILED:
        return fetchIngredientsFailed(state);
    default:
        break;
    }
    return state;
};

export default reducer;
