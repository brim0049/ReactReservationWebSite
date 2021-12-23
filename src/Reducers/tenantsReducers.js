const tenantsReducers = (tenants = [], action) => {
  switch (action.type) {
    case "GET_TENANTS":
      return action.payload.data;
    case "REGISTER_TENANT":
      return tenants;
    case "EDIT_TENANTS_PASSWORD":
      return tenants;
    case "EDIT_TENANTS_NAME":
      return tenants;
    case "EDIT_TENANTS_BALANCE":
      return tenants;
    case "DELETE_TENANT":
      return tenants;
    default:
      return tenants;
  }
};
export default tenantsReducers;
