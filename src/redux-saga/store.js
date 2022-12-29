import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import createSagaMiddleware from "redux-saga";
import { watchChangeText } from "../redux-saga/sagas";
import reducerText from "../reducers/reducerText";
import reducerNum from "../reducers/reducerNum";

const sagaMiddleware = createSagaMiddleware();

const combined = combineReducers({
  updateText: reducerText,
  updateNumber: reducerNum,
});

const store = createStore(combined, compose(applyMiddleware(sagaMiddleware)));

sagaMiddleware.run(watchChangeText);

export default store;
