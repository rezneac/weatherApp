const initialState = {
  number: 0,
};

function reducerNum(state = initialState, action) {
  switch (action.type) {
    case "UPDATE_VALUE":
      return {
        ...state,
        number: state.number + action.payload,
      };
    default:
      return state;
  }
}



export default reducerNum;
