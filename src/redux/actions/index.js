const actionLogin = (email) => ({
  type: 'ACTION_LOGIN',
  payload: {
    email,
  },
});

export const actionInputHeader = (inpHeader) => ({
  type: 'ACTION_INPUT_HEADER',
  payload: {
    inpHeader,
  },
});

export const setFilterTypeAndText = (payload) => ({
  type: 'SET_FILTER_TYPE_AND_TEXT',
  payload,
});

export default actionLogin;
