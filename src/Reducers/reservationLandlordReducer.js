const reservationLandlordReducer = (reservationLandlord = {}, action) => {
  switch (action.type) {
    case "POST_RESERVATION":
      return {
        room: action.payload.room,
        tenant: action.payload.tenant,
        landlord: action.payload.landlord,
        nbr_persons: action.payload.nbr_persons,
        in_date: action.payload.in_date,
        out_date: action.payload.out_date,
        total_price: action.payload.total_price,
        status: action.payload.status,
      };
      case "EDIT_RESERVATION_LANDLORD":
      return {
        room: reservationLandlord.room,
        tenant: reservationLandlord.tenant,
        landlord: reservationLandlord.landlord,
        nbr_persons: reservationLandlord.nbr_persons,
        in_date: reservationLandlord.in_date,
        out_date: reservationLandLord.out_date,
        total_price: reservationLandlord.total_price,
        status: action.payload.status,
      };
    default:
      return reservationLandlord;
  }
};
export default reservationLandlordReducer;
