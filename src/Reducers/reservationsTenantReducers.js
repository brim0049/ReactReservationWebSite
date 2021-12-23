const reservationsTenantReducers = (reservationsTenant = [], action) => {
  switch (action.type) {
    case "GET_RESERVATION_TENANT":
      return action.payload.data;
    case "DELETE RESERVATION":
      return reservationsTenant;
    case "EDIT_RESERVATIONS_TENANT":
      return reservationsTenant;
    default:
      return reservationsTenant;
  }
};
export default reservationsTenantReducers;
