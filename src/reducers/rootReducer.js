import {combineReducers} from "redux";

import singleProductReducer from './singleProductReducer';
import categoriesReducer from "./categoriesReducer";
import searchedProductsReducer from "./searchedProductsReducer";
import allProductsReducer from "./allProductsReducer";
import cartArrayReducer from "./cartArrayReducer";

const rootReducer = combineReducers({
    allProducts : allProductsReducer,
    singleProduct : singleProductReducer,
    categories : categoriesReducer,
    searchedProducts : searchedProductsReducer,
    cartArray : cartArrayReducer
});

export default rootReducer;