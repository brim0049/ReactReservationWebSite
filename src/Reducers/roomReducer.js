const roomsReducer = (room = {}, action) => {
  switch (action.type) {
    case "ADD_ROOM":
      return {
        town: action.payload.town,
        landlord: action.payload.landlord,
        capacity: action.payload.capacity,
        price: action.payload.price,
      };
      case "EDIT_ROOM":
      return {
        town: action.payload.town,
        landlord: room.landlord,
        capacity: action.payload.capacity,
        price: action.payload.price,
      };
    default:
      return room;
  }
};
export default roomsReducer;
