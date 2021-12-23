const currentUserReducer = (user = [], action) => {
  switch (action.type) {
    case "SET_USER":
      return action.payload;
    case "SET_USER_LOGOUT":
      return null;
    default:
      return user;
  }
};

export default currentUserReducer;
