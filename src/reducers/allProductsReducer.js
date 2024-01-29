import * as actionTypes from '../actionTypes/allProductsActionTypes';

const initialState = {
    product: [],
    loading: true,
    error: null,
};

const allProductsReducer = (state = initialState,action) => {
    switch(action.type){
        case actionTypes.GET_ALL_PRODUCTS:
            return{
                ...state,
                loading: true,
            };
        
        case actionTypes.GET_ALL_PRODUCTS_SUCCESS:
            return{
                ...state,
                product:action.payload,
                loading:false,
                error:undefined,
            };

        case actionTypes.GET_ALL_PRODUCTS_ERROR:
            return{
                ...state,
                product:undefined,
                loading:false,
                error:action.payload,
            };

        default:
            return state;
    }
};

export default allProductsReducer;