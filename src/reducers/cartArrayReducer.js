import * as actionTypes from '../actionTypes/cartArrayActionTypes';

const initialState = {
    cartItems: [],
  };
  
  const cartArrayReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.UPDATE_ARRAY:
            return {
                ...state,
            };

        case actionTypes.UPDATE_ARRAY_SUCCESS:
            return{
                ...state,
                cartItems: [...state.cartItems, action.payload],
            };
        
        case actionTypes.CHANGE_ARRAY:
            return{
                ...state,
                cartItems:[action.payload]
            };

        case actionTypes.CHANGE_ARRAY_SUCCESS:
            return{
                ...state,
                cartItems: action.payload
            };

        case actionTypes.EMPTY_ARRAY:
            return{
                ...state,
            }

        case actionTypes.EMPTY_ARRAY_SUCCESS:
            return{
                ...state,
                cartItems:[]
            }
             
         default:
            return state;
    }
  };

  export default cartArrayReducer;