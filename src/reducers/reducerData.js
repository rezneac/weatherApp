const initialState = {
  text: null,
};

function reducerData(state = initialState, action) {
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

export default reducerData;
