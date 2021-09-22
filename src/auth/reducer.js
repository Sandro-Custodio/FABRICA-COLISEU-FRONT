/* eslint-disable no-undef */
const userKey = "coliseu";
const INITIAL_STATE = {
  user: JSON.parse(localStorage.getItem(userKey)),
  validToken: false,
  application: "",
  expiredPassword: false,
  passwordWillExpire: false,
  isPasswordAltered: false,
  values: {}
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "TOKEN_VALIDATED":
      if (action.payload) {
        return { ...state, validToken: true };
      }
      localStorage.removeItem(userKey);
      return { ...state, validToken: false, user: null };
    case "CHANGE_PASSWORD":
      return { ...state, passwordWillExpire: true };
    case "SET_VALUES":
      return { ...state, values: action.payload };
    case "EXPIRED_PASSWORD":
      return { ...state, expiredPassword: true, values: action.payload };
    case "PASSWORD_CHANGED":
      return {
        ...state,
        passwordWillExpire: false,
        expiredPassword: false,
        isPasswordAltered: true,
        values: {}
      };
    case "USER_FETCHED":
      localStorage.setItem(
        userKey,
        JSON.stringify({
          ...action.payload.user,
          area: action.payload.area,
          ceo: action.payload.ceo,
          permissions: action.payload.permissions,
          access_token: action.payload.access_token
        })
      );
      return {
        ...state,
        user: {
          ...action.payload.user,
          area: action.payload.area,
          ceo: action.payload.ceo,
          permissions: action.payload.permissions,
          access_token: action.payload.access_token,
          has_revision_waiting: action.payload.has_revision_waiting,
          has_cancel_waiting: action.payload.has_cancel_waiting,
          role_id: action.payload.role_id
        },
        validToken: true
      };
    case "SET_APPLICATION":
      return { ...state, application: action.payload };
    default:
      return state;
  }
};
