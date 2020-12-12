export const authReducer = (state, { type, payload }) => {
  switch (type) {
    case "LOGIN":
      return { ...state, user: payload };
    case "LOGOUT":
      return { ...state, user: null };
    default:
      return state;
  }
};
