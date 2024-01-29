import { put } from "redux-saga/effects";

//action
import { updateArraySuccess, emptyArraySuccess, changeArraySuccess } from "../../actions/cartArrayActions";


export function* handleCartArray({payload}) {
  yield put(updateArraySuccess(payload));
}

export function* handleChangeCartArray({payload}) {
  yield put(changeArraySuccess(payload));
}

export function* handleEmptyArray({payload}) {
  yield put(emptyArraySuccess(payload));
}