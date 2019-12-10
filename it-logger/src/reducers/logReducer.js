const initialState = {
  logs: null,
  current: null,
  loading: false,
  error: null,
  test: "mario",
  count: 11
};

export default (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};
