const INITIAL_STATE = {
  email: '',
};

const reducerLogin = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'ACTION_LOGIN':
    return {
      ...state,
      email: action.payload.email,
    };
  default:
    return state;
  }
};

export default reducerLogin;
