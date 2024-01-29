import * as actionTypes from "../actionTypes/singleProductActionTypes";

const getSingleProduct = (product) =>({
    type: actionTypes.GET_SINGLE_PRODUCT,
    payload:product,
});

const getSingleProductSuccess = (product) =>({
    type: actionTypes.GET_SINGLE_PRODUCT_SUCCESS,
    payload:product,
});

const getSingleProductError = (error) => ({
    type: actionTypes.GET_SINGLE_PRODUCT_ERROR,
    payload:error,
});

export {getSingleProduct,getSingleProductSuccess,getSingleProductError};