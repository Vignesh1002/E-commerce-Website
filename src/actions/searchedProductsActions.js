import * as actionTypes from '../actionTypes/searchedProductsActionTypes';

export const getSearchedProducts = (products) =>({
    type: actionTypes.GET_SEARCHED_PRODUCTS,
    payload: products
});

export const getSearchedProductsSuccess = (products) => ({
    type: actionTypes.GET_SEARCHED_PRODUCTS_SUCCESS,
    payload: products
});

export const getSearchedProductsError = (error) => ({
    type: actionTypes.GET_SEARCHED_PRODUCTS_ERROR,
    payload: error
})

export const updateSearchedProducts = (products) => ({
    type: actionTypes.UPDATE_SEARCHED_PRODUCTS,
    payload: products
})

export const updateSearchedProductsSuccess = (products) => ({
    type: actionTypes.UPDATE_SEARCHED_PRODUCTS_SUCCESS,
    payload: products
})