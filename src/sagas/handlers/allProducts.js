import {call,put} from 'redux-saga/effects';

//request
import { getAllProducts } from '../requests';

//actions
import { getAllProductsSuccess,getAllProductsError} from '../../actions/allProductsActions';

export function* handleAllProducts({payload}) {
    try{
        const response  = yield call(getAllProducts,payload);
        if(response.status === 200){
            yield put(getAllProductsSuccess(response.data.products));
        }
        else{
            yield put(getAllProductsError(response.data));
        }
    } catch(error){
        yield put(getAllProductsError(error.response.data));
    }
}