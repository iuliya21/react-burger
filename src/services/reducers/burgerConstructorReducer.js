import { ADD_INGREDIENT, ADD_BUN, CLEAR_CONSTRUCTOR } from '../actions';
import { dataIng, dataBun } from '../../components/utils/data';

const initialState = {
  ingredients: dataIng,
  bun: dataBun,
}

export const burgerConstructorReducer = (state = initialState, action) => {
  switch(action.type) {
    case ADD_INGREDIENT: {
      return {
        ...state,
        ingredients: [...state.ingredients, {...action.data, keyId: action.keyId}],
      };
    }
    case ADD_BUN: {
      return {
        ...state,
        bun: action.data,
      };
    }
    case CLEAR_CONSTRUCTOR: {
      return {
        ...state,
        ingredients: action.data,
        bun: null,
      };
    }
    default: return state;
  }
}