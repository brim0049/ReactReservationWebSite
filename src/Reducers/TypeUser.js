const TypeUser = (type = "", action) => {
  switch (action.type) {
    case "SET_LOCATAIRE":
      return "locataire";
    case "SET_LOCATEUR":
      return "locateur";
    default:
      return type;
  }
};

export default TypeUser;
