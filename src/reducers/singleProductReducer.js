import * as actionTypes from '../actionTypes/singleProductActionTypes';

const initialState = {
    product: [],
    loading: true,
    error: null,
};

const singleProductReducer = (state = initialState,action) => {
    switch(action.type){
        case actionTypes.GET_SINGLE_PRODUCT:
            return{
                ...state,
                loading: true,
            };
        
        case actionTypes.GET_SINGLE_PRODUCT_SUCCESS:
            return{
                ...state,
                product:action.payload,
                loading:false,
                error:undefined,
            };

        case actionTypes.GET_SINGLE_PRODUCT_ERROR:
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

export default singleProductReducer;