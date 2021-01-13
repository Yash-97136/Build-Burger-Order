import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const IngredientPrices = {
    salad: 0.4,
    cheese: 1,
    bacon: 0.8,
    meat: 2
}

const initialState = {
    ingredients: null,
    totalPrice: 5,
    error: false,
    building: false
};

const addIngredient = (state, action) => {
    const updatedIngredient = { [action.ingredientName]: state.ingredients[action.ingredientName] + 1 };
    const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
    const updateState = {
        ingredients: updatedIngredients,
        totalPrice: state.totalPrice + IngredientPrices[action.ingredientName],
        building: true
    };
    return updateObject(state, updateState);
};
const removeIngredient = (state, action) => {
    const updatedIng = { [action.ingredientName]: state.ingredients[action.ingredientName] - 1 };
    const updatedIngs = updateObject(state.ingredients, updatedIng);
    const updateSt = {
        ingredients: updatedIngs,
        totalPrice: state.totalPrice - IngredientPrices[action.ingredientName],
        building: true
    };
    return updateObject(state, updateSt);
};
const setIngredients = (state, action) => {
    return updateObject(state, {
        ingredients: {
            salad: action.ingredients.salad,
            cheese: action.ingredients.cheese,
            bacon: action.ingredients.bacon,
            meat: action.ingredients.meat
        },
        error: false,
        totalPrice: 5,
        building: false
    });
};
const fetchIngredientsFailed = (state, action) => {
    return updateObject(state, { error: true });
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT: return addIngredient(state, action);
        case actionTypes.REMOVE_INGREDIENT: return removeIngredient(state, action);
        case actionTypes.SET_INGREDIENTS: return setIngredients(state, action);
        case actionTypes.FETCHED_INGREDIENTS_FAILED: return fetchIngredientsFailed(state, action);
        default:
            return state;
    };
};

export default reducer;