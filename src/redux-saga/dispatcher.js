import store from "../redux-saga/store";

export function changeText(text) {
  store.dispatch({ type: 'CHANGE_TEXT', text});
}
