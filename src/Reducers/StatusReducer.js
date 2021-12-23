const statusReducer = (status = "", action) => {
    switch (action.type) {
      case "SET_SUCCESS":
        return "success";
      case "SET_PENDING":
        return "pending";
      case "SET_ERROR":
        return "error";
      default:
        return status;
    }
  };
  
  export default statusReducer;
  