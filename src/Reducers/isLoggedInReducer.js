const isLoggedInReducer = (isLoggedIn = "", action) => {
  switch (action.type) {
    case "SET_ISLOGGEDIN":
      return true;
    case "SET_LOGOUT":
      return false;
    default:
      return isLoggedIn;
  }
};

export default isLoggedInReducer;
