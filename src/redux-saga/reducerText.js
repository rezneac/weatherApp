const initialState = {
  text: "initial value",
};

function reducerText(state = initialState, action) {
  switch (action.type) {
    case "SET_TEXT":
      return {
        ...state,
        text: action.text,
      };
    default:
      return state;
  }
}

export default reducerText;
