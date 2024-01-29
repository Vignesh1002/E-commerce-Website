import * as actionTypes from '../actionTypes/cartArrayActionTypes';

export const updateArray = (item) => ({
    type: actionTypes.UPDATE_ARRAY,
    payload: item,
  });

export const updateArraySuccess = (item) =>({
    type: actionTypes.UPDATE_ARRAY_SUCCESS,
    payload: item,
});

export const changeArray = (item) =>({
  type: actionTypes.CHANGE_ARRAY,
  payload: item,
});

export const changeArraySuccess = (item) =>({
  type: actionTypes.CHANGE_ARRAY_SUCCESS,
  payload: item,
});

export const emptyArray = () =>({
  type: actionTypes.EMPTY_ARRAY,
  payload: null,
})

export const emptyArraySuccess = () =>({
  type: actionTypes.EMPTY_ARRAY_SUCCESS,
  payload: null,
})