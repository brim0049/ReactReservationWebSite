const roomsReducer = (rooms = [], action) => {
  switch (action.type) {
    case "GET_ROOMS":
      return action.payload.data;
    case "ADD_ROOM":
      return rooms;
    case "DELETE_ROOM":
      return rooms;
    case "EDIT_ROOMS":
      return rooms;
    default:
      return rooms;
  }
};
export default roomsReducer;
