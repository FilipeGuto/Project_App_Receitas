const INITIAL_STATE = {
  inputHeader: '',
};

const reducerHeader = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'ACTION_INPUT_HEADER':
    return {
      ...state,
      inputHeader: action.payload.inpHeader,
    };
  default:
    return state;
  }
};

export default reducerHeader;
