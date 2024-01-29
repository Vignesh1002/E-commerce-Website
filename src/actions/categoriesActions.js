import * as actionTypes from '../actionTypes/categoriesActionTypes';

const getAllCategories = () =>({
    type: actionTypes.GET_ALL_CATEGORIES,
    payload: undefined,
})

const getAllCategoriesSuccess = (categories) =>({
    type: actionTypes.GET_ALL_CATEGORIES_SUCCESS,
    payload: categories,
})

const getAllCategoriesError = (error) =>({
    type: actionTypes.GET_ALL_CATEGORIES_ERROR,
    payload: error,
})

export {getAllCategories,getAllCategoriesSuccess,getAllCategoriesError};