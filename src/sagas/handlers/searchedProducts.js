import {call,put} from 'redux-saga/effects';

//request
import { searchProducts } from '../requests';

//actions
import {getSearchedProductsSuccess,getSearchedProductsError, updateSearchedProductsSuccess} from '../../actions/searchedProductsActions';

export function* handleSearchedProducts({payload}){
    try{
        const response = yield call(searchProducts,payload);
        if(response.status === 200){
            yield put(getSearchedProductsSuccess(response.data.products));
        }
        else{
            yield put(getSearchedProductsError(response.data));
        }
    } catch(error){
        yield put(getSearchedProductsError(error.response.data));
    }
}

export function* handleUpdateSearchedProducts({payload}){
    yield put(updateSearchedProductsSuccess(payload));
}