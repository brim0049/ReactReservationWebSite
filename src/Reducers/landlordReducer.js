const landlordReducer = (landlord = {}, action) => {
  switch (action.type) {
    case "REGISTER_LANDLORD":
      return {
        first_name: action.payload.first_name,
        last_name: action.payload.last_name,
        mail_address: action.payload.mail_address,
        birth_date: action.payload.birth_date,
        gender: action.payload.gender,
        username: action.payload.username,
        benefits: action.payload.benefits,
        password: action.payload.password,
      };
    case "EDIT_LANDLORD_PASSWORD":
      return {
        first_name: landlord.first_name,
        last_name: landlord.last_name,
        mail_address: landlord.mail_address,
        birth_date: landlord.birth_date,
        gender: landlord.gender,
        username: landlord.username,
        benefits: landlord.benefits,
        password: action.payload.password,
      };
    case "EDIT_LANDLORD_NAME":
      return {
        first_name: action.payload.prenom,
        last_name: action.payload.nom,
        mail_address: landlord.mail_address,
        birth_date: landlord.birth_date,
        gender: landlord.gender,
        username: landlord.username,
        benefits: landlord.benefits,
        password: landlord.password,
      };
    default:
      return landlord;
  }
};

export default landlordReducer;
