import { takeEvery } from "redux-saga/effects";

//actionTypes
import * as allProductsActionTypes from '../actionTypes/allProductsActionTypes';
import * as singleProductActionTypes from '../actionTypes/singleProductActionTypes';
import * as categoriesActionTypes from '../actionTypes/categoriesActionTypes';
import * as searchedProductsActionTypes from '../actionTypes/searchedProductsActionTypes';
import * as cartArrayActionTypes from '../actionTypes/cartArrayActionTypes';

//handlers
import { handleAllProducts } from './handlers/allProducts';
import { handleSingleProduct } from "./handlers/singleProduct";
import { handleAllCategories } from "./handlers/categories";
import { handleSearchedProducts, handleUpdateSearchedProducts } from "./handlers/searchedProducts";
import { handleCartArray, handleChangeCartArray, handleEmptyArray } from "./handlers/cartArray";

export function* watcherSaga(){
    yield takeEvery(allProductsActionTypes.GET_ALL_PRODUCTS,handleAllProducts);
    yield takeEvery(singleProductActionTypes.GET_SINGLE_PRODUCT,handleSingleProduct);
    yield takeEvery(categoriesActionTypes.GET_ALL_CATEGORIES,handleAllCategories);
    yield takeEvery(searchedProductsActionTypes.GET_SEARCHED_PRODUCTS,handleSearchedProducts);
    yield takeEvery(searchedProductsActionTypes.UPDATE_SEARCHED_PRODUCTS,handleUpdateSearchedProducts);
    yield takeEvery(cartArrayActionTypes.UPDATE_ARRAY,handleCartArray);
    yield takeEvery(cartArrayActionTypes.CHANGE_ARRAY,handleChangeCartArray);
    yield takeEvery(cartArrayActionTypes.EMPTY_ARRAY,handleEmptyArray);
}