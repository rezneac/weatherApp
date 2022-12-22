import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import { watchChangeText } from "../redux-saga/sagas";
import reducer from "../redux-saga/reducer";


const sagaMiddleware = createSagaMiddleware();

const store = createStore(reducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(watchChangeText);

export default store;
