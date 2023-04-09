import { SELECT_INGREDIENT, DELETE_INFO_INGREDIENT } from "../actions";

const initialState = {
  selectedIngredient: {},
}

export const ingredientDetailsReducer = (state = initialState, action) => {
  switch(action.type) {
     case SELECT_INGREDIENT: {
      return {
        ...state,
        selectedIngredient: { ...state.selectedIngredient, ...action.data }
      };
     }
     case DELETE_INFO_INGREDIENT: {
      return {
        ...state,
        selectedIngredient: {},
      };
     }
    default: return state;
  }
}