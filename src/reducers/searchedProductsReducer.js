import * as actionTypes from '../actionTypes/searchedProductsActionTypes';

const initialState ={
    products: [],
    loading: true,
    error: undefined,
};

const searchedProductsReducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.GET_SEARCHED_PRODUCTS_SUCCESS:
            return{
                ...state,
                products: action.payload,
                loading: false,
                error: undefined
            }

        case actionTypes.GET_SEARCHED_PRODUCTS_ERROR:
            return{
                ...state,
                products: undefined,
                loading: false,
                error: action.payload
            }

        case actionTypes.UPDATE_SEARCHED_PRODUCTS:
            return{
                ...state
            }

        case actionTypes.UPDATE_SEARCHED_PRODUCTS_SUCCESS:
            return{
                ...state,
                products: action.payload
            }

        default: 
            return state;
    }
};

export default searchedProductsReducer;