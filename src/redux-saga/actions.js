import store from "../redux-saga/store";

// export function changeText(text) {
//   store.dispatch({ type: 'CHANGE_TEXT', text});
// }

export const changeText = (text) => ({
  type: "SET_TEXT",
  text,
});

export const changeNumber = (payload) => ({
  type: "UPDATE_VALUE",
  payload
});
