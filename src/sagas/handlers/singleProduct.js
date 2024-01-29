import {call,put} from 'redux-saga/effects';

//request
import { getSingleProduct } from '../requests';

//actions
import { getSingleProductSuccess,getSingleProductError} from '../../actions/singleProductActions';

export function* handleSingleProduct({payload}) {
    try{
        const response  = yield call(getSingleProduct,payload);
        if(response.status === 200){
            yield put(getSingleProductSuccess(response.data));
        }
        else{
            yield put(getSingleProductError(response.data));
        }
    } catch(error){
        yield put(getSingleProductError(error.response.data));
    }
}