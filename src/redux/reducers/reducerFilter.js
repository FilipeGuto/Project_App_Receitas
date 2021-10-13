const INITIAL_STATE = {
  text: '',
};

const reducerFilter = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'SET_FILTER_TYPE_AND_TEXT':
    return {
      ...state,
      text: action.payload.text,
    };
  default:
    return state;
  }
};

export default reducerFilter;
