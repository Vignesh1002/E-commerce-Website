import {call,put} from 'redux-saga/effects';

//request
import { getAllCategories } from '../requests';

//actions
import {getAllCategoriesSuccess,getAllCategoriesError} from '../../actions/categoriesActions';

export function* handleAllCategories({payload}) {
    try{
        const response = yield call(getAllCategories,payload);
        if(response.status === 200){
            yield put(getAllCategoriesSuccess(response.data));
        }
        else{
            yield put(getAllCategoriesError(response.data));
        }
    } catch(error){
        yield put(getAllCategoriesError(error.response.data));
    }
}