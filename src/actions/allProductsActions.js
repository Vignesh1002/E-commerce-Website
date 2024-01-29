import * as actionTypes from "../actionTypes/allProductsActionTypes";

const getAllProducts = () =>({
    type: actionTypes.GET_ALL_PRODUCTS,
    payload:undefined,
});

const getAllProductsSuccess = (product) =>({
    type: actionTypes.GET_ALL_PRODUCTS_SUCCESS,
    payload:product,
});

const getAllProductsError = (error) => ({
    type: actionTypes.GET_ALL_PRODUCTS_ERROR,
    payload:error,
});

export {getAllProducts,getAllProductsSuccess,getAllProductsError};