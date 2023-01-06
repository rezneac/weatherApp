import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import createSagaMiddleware from "redux-saga";
import { watchChangeText } from "../redux-saga/sagas";
import reducerData from "../reducers/reducerData";
import reducerNum from "../reducers/reducerNum";

const sagaMiddleware = createSagaMiddleware();

const combined = combineReducers({
  updateData: reducerData,
  updateNumber: reducerNum,
});

const store = createStore(combined, compose(applyMiddleware(sagaMiddleware)));

sagaMiddleware.run(watchChangeText);

export default store;
