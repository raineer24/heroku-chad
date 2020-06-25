export function reducer(state, action) {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      console.log("existing state: ", +JSON.stringify(state));
      console.log("payload", action.payload);

      return {
        ...state,
        isAuthenticated: action.payload,
      };
    default:
      return state;
  }
}
