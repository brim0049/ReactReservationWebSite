const tenantReducer = (tenant = {}, action) => {
  switch (action.type) {
    case "REGISTER_TENANT":
      return {
        first_name: action.payload.first_name,
        last_name: action.payload.last_name,
        mail_address: action.payload.mail_address,
        birth_date: action.payload.birth_date,
        gender: action.payload.gender,
        username: action.payload.username,
        balance: action.payload.balance,
        password: action.payload.password,
      };
    case "EDIT_TENANT_PASSWORD":
      return {
        first_name: tenant.first_name,
        last_name: tenant.last_name,
        mail_address: tenant.mail_address,
        birth_date: tenant.birth_date,
        gender: tenant.gender,
        username: tenant.username,
        balance: tenant.balance,
        password: action.payload.password,
      };
    case "EDIT_TENANT_NAME":
      return {
        first_name: action.payload.prenom,
        last_name: action.payload.nom,
        mail_address: tenant.mail_address,
        birth_date: tenant.birth_date,
        gender: tenant.gender,
        username: tenant.username,
        balance: tenant.balance,
        password: tenant.password,
      };
      case "EDIT_TENANT_BALANCE":
      return {
        first_name: tenant.first_name,
        last_name: tenant.last_name,
        mail_address: tenant.mail_address,
        birth_date: tenant.birth_date,
        gender: tenant.gender,
        username: tenant.username,
        balance: action.payload.balance,
        password: tenant.password,
      };
    default:
      return tenant;
  }
};

export default tenantReducer;
