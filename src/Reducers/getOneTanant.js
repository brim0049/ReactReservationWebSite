const getOneTanant = (Onetenant = [], action) => {
    switch (action.type) {
      case "GET_TENANT":
        return action.payload.data;
      default:
        return Onetenant;
    }
  };
  export default getOneTanant;
  