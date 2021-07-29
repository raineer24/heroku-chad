import { login, logoutUser } from "./auth/state/auth.action";
export function clearState(reducer) {
  return (state, action) => {
    if (action.type === logoutUser.type || action.type === login.type) {
      state = undefined;
    }

    return reducer(state, action);
  };
}
