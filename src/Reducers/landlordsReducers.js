const landlordsReducers = (landlords = [], action) => {
  switch (action.type) {
    case "GET_LANDLORDS":
      return action.payload.data;
    case "REGISTER_LANDLORD":
      return landlords;
    case "EDIT_LANDLORDS_PASSWORD":
      return landlords;
    case "EDIT_LANDLORDS_NAME":
      return landlords;
    case "DELETE_LANDLORD":
      return landlords;
    default:
      return landlords;
  }
};
export default landlordsReducers;
