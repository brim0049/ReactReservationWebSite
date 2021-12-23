const reservationsLandlordReducers = (reservationsLandlord = [], action) => {
  switch (action.type) {
    case "GET_RESERVATION_LANDLORD":
      return action.payload.data;
    case "EDIT_RESERVATIONS_LANDLORD":
      return reservationsLandlord;
    default:
      return reservationsLandlord;
  }
};
export default reservationsLandlordReducers;
