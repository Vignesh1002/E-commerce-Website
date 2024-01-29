import {applyMiddleware,createStore} from 'redux';
import rootReducer from '../reducers/rootReducer';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';
import { watcherSaga } from '../sagas/rootSaga';
import { composeWithDevTools } from "redux-devtools-extension";



const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware];

if(process.env.NODE_ENV === "development"){
    middlewares.push(logger);
}

const store = createStore(
        rootReducer,
        composeWithDevTools(applyMiddleware(...middlewares))
    );

const persister = "Free";

sagaMiddleware.run(watcherSaga);

export  {store,persister};