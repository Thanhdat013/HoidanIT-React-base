import { FETCH_USER_LOGIN_SUCCESS } from "~/redux/action/userAction";

const INITIAL_STATE = {
  account: {
    access_token: "",
    refresh_token: "",
    user: "",
    image: "",
    role: "",
  },
  isAuthenticated: false,
};
const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_USER_LOGIN_SUCCESS:
      return {
        ...state,
        account: {
          access_token: action?.payload?.DT?.access_token,
          refresh_token: action?.payload?.DT?.refresh_token,
          user: action?.payload?.DT?.email,
          image: action?.payload?.DT?.image,
          role: action?.payload?.DT?.role,
        },
        isAuthenticated: true,
      };

    default:
      return state;
  }
};

export default userReducer;
