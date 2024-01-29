import * as actionTypes from '../actionTypes/categoriesActionTypes';

const initialState ={
    categories: [],
    loading: true,
    error: null,
};

const categoriesReducer = (state=initialState,action) => {
    switch(action.type){
        case actionTypes.GET_ALL_CATEGORIES:
            return{
                ...state,
                loading: true,
            }
        
        case actionTypes.GET_ALL_CATEGORIES_SUCCESS:
            return{
                ...state,
                categories: action.payload,
                loading: false,
                error: undefined,
            }

        case actionTypes.GET_ALL_CATEGORIES_ERROR:
            return{
                ...state,
                categories: undefined,
                loading: false,
                error:action.payload,
            }

        default: 
            return state;
    }
};

export default categoriesReducer;