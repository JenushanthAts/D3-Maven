export const LoginStart = () => ({
  type: "LOGIN_START",
});

export const LoginSuccess = (user) => ({
  type: "LOGIN_SUCCESS",
  payload: user,
});

export const LoginFailure = () => ({
  type: "LOGIN_FAILURE",
});
export const FirstTimeLogin = () => ({
  type: "FIRST_TIME_LOGIN",
});
export const Logout = () => ({
  type: "LOGOUT",
});
