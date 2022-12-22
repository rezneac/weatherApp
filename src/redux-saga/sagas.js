import { takeLatest, put } from "redux-saga/effects";

function* changeTextSaga(action) {
  yield put({ type: "SET_TEXT", text: action.text });
}

export function* watchChangeText() {
  yield takeLatest("CHANGE_TEXT", changeTextSaga);
}
