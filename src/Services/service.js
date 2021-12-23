import landlordReducer from "../Reducers/landlordReducer";
import tenantReducer from "../Reducers/tenantReducer";
import roomReducer from "../Reducers/roomReducer";
import reservationReducer from "../Reducers/reservationLandlordReducer";
import { reservationLandlordReducer } from "../Reducers/reservationLandlordReducer";
import axios from "axios";

const user_key = "c9e3289d-40dd-4061-9a64-a3b626d79ddf";
const baseUrl = `https://airbnb-clone-rest-api.herokuapp.com/api/${user_key}`;
//GET
export const isloggedin = () => {
  return (dispatch) => {
    dispatch({ type: "SET_ISLOGGEDIN" });
  };
};
export const logout = () => {
  return (dispatch) => {
    dispatch({ type: "SET_LOGOUT" });
    dispatch({ type: "SET_USER_LOGOUT" });
  };
};
//set type
export const setTypeLandlord = () => {
  return (dispatch) => {
    dispatch({ type: "SET_LOCATEUR" });
  };
};
export const setTypeTenant = () => {
  return (dispatch) => {
    dispatch({ type: "SET_LOCATAIRE" });
  };
};
export const currentUser = (user) => {
  return (dispatch) => {
    dispatch({ type: "SET_USER", payload: user });
  };
};
//ROOM API
export const getRooms = () => {
  return (dispatch) => {
    dispatch({ type: "SET_PENDING" });

    axios.get(`${baseUrl}/rooms`).then(
      (response) => {
        dispatch({ type: "GET_ROOMS", payload: response });
        dispatch({ type: "SET_SUCCESS" });
      },
      (error) => {
        dispatch({ type: "GET_ROOMS", payload: { data: [] } });
        dispatch({ type: "SET_ERROR" });
      }
    );
  };
};
//POST
export const addRoom = (town, landlord, capacity, price) => {
  return (dispatch) => {
    dispatch({ type: "ADD_ROOM" });
    dispatch({ type: "SET_PENDING" });
    axios
      .post(
        `${baseUrl}/rooms`,
        roomReducer(
          {},
          {
            type: "ADD_ROOM",
            payload: {
              town: town,
              landlord: landlord,
              capacity: capacity,
              price: price,
            },
          }
        )
      )
      .then(
        (response) => {
          dispatch({ type: "SET_SUCCESS" });
          dispatch(getRooms());
        },
        (error) => {
          dispatch({ type: "SET_ERROR" });
        }
      );
  };
};
//LANDLORD API
export const getLandlords = () => {
  return (dispatch) => {
    dispatch({ type: "SET_PENDING" });

    axios.get(`${baseUrl}/landlords`).then(
      (response) => {
        dispatch({ type: "GET_LANDLORDS", payload: response });
        dispatch({ type: "SET_SUCCESS" });
      },
      (error) => {
        dispatch({ type: "GET_LANDLORDS", payload: { data: [] } });
        dispatch({ type: "SET_ERROR" });
      }
    );
  };
};
export const getTenants = () => {
  return (dispatch) => {
    dispatch({ type: "SET_PENDING" });

    axios.get(`${baseUrl}/tenants`).then(
      (response) => {
        dispatch({ type: "GET_TENANTS", payload: response });
        dispatch({ type: "SET_SUCCESS" });
      },
      (error) => {
        dispatch({ type: "GET_TENANTS", payload: { data: [] } });
        dispatch({ type: "SET_ERROR" });
      }
    );
  };
};
//DELETE ROOM
export const deleteRoom = (room_id) => {
  return (dispatch) => {
    dispatch({ type: "DELETE_ROOM" });
    dispatch({ type: "SET_PENDING" });

    axios.delete(`${baseUrl}/room/${room_id}`).then(
      (response) => {
        dispatch({ type: "SET_SUCCESS" });
        dispatch(getRooms());
      },
      (error) => {
        dispatch({ type: "SET_ERROR" });
      }
    );
  };
};
//edit Room
export const editRoom = (room_id, town, capacity, price) => {
  return (dispatch, getState) => {
    dispatch({ type: "EDIT_ROOMS" });
    dispatch({ type: "SET_PENDING" });

    const room_to_edit = getState().rooms.filter(
      (room) => room.id == room_id
    )[0];
    axios
      .put(
        `${baseUrl}/room/${room_id}`,
        roomReducer(room_to_edit, {
          type: "EDIT_ROOM",
          payload: { town: town, capacity: capacity, price: price },
        })
      )
      .then(
        (response) => {
          dispatch({ type: "SET_SUCCESS" });
          dispatch(getRooms());
        },
        (error) => {
          dispatch({ type: "SET_ERROR" });
        }
      );
  };
};
//reservation Api
//get reservation landlord
export const getReservationLandlord = (landlord_id) => {
  return (dispatch) => {
    dispatch({ type: "SET_PENDING" });

    axios.get(`${baseUrl}/reservationsByLandlord/${landlord_id}`).then(
      (response) => {
        dispatch({ type: "GET_RESERVATION_LANDLORD", payload: response });
        dispatch({ type: "SET_SUCCESS" });
      },
      (error) => {
        dispatch({ type: "GET_RESERVATION_LANDLORD", payload: { data: [] } });
        dispatch({ type: "SET_ERROR" });
      }
    );
  };
};
//get reservations tenants
export const getReservationTenant = (tenant_id) => {
  return (dispatch) => {
    dispatch({ type: "SET_PENDING" });

    axios.get(`${baseUrl}/reservationsByTenant/${tenant_id}`).then(
      (response) => {
        dispatch({ type: "GET_RESERVATION_TENANT", payload: response });
        dispatch({ type: "SET_SUCCESS" });
      },
      (error) => {
        dispatch({ type: "GET_RESERVATION_TENANT", payload: { data: [] } });
        dispatch({ type: "SET_ERROR" });
      }
    );
  };
};
//put reservation landlord
export const editReservationLandLord = (
  reservation_id,
  landlord_id,
  room,
  tenant,
  landlord,
  nbr_persons,
  in_date,
  out_date,
  total_price,
  status
) => {
  return (dispatch) => {
    dispatch({ type: "EDIT_RESERVATIONS_LANDLORD" });
    dispatch({ type: "SET_PENDING" });

    axios
      .put(`${baseUrl}/reservation/${reservation_id}`, {
        room: room,
        tenant: tenant,
        landlord: landlord,
        nbr_persons: nbr_persons,
        in_date: in_date,
        out_date: out_date,
        total_price: total_price,
        status: status,
      })
      .then(
        (response) => {
          dispatch({ type: "SET_SUCCESS" });
          dispatch(getReservationLandlord(landlord_id));
        },
        (error) => {
          dispatch({ type: "SET_ERROR" });
        }
      );
  };
};
//put reservation tenant
export const editReservationTenant = (
  reservation_id,
  tenant_id,
  room,
  tenant,
  landlord,
  nbr_persons,
  in_date,
  out_date,
  total_price,
  status
) => {
  return (dispatch) => {
    dispatch({ type: "EDIT_RESERVATIONS_TENANT" });
    dispatch({ type: "SET_PENDING" });

    axios
      .put(`${baseUrl}/reservation/${reservation_id}`, {
        room: room,
        tenant: tenant,
        landlord: landlord,
        nbr_persons: nbr_persons,
        in_date: in_date,
        out_date: out_date,
        total_price: total_price,
        status: status,
      })
      .then(
        (response) => {
          dispatch({ type: "SET_SUCCESS" });
          dispatch(getReservationTenant(tenant_id));
        },
        (error) => {
          dispatch({ type: "SET_ERROR" });
        }
      );
  };
};
//post reservation
export const createReservation = (
  room,
  tenant,
  landlord,
  nbr_persons,
  in_date,
  out_date,
  total_price,
  status
) => {
  return (dispatch) => {
    dispatch({ type: "POST_RESERVATION" });
    dispatch({ type: "SET_PENDING" });
    axios
      .post(
        `${baseUrl}/reservations`,
        reservationReducer(
          {},
          {
            type: "POST_RESERVATION",
            payload: {
              room: room,
              tenant: tenant,
              landlord: landlord,
              nbr_persons: nbr_persons,
              in_date: in_date,
              out_date: out_date,
              total_price: total_price,
              status: status,
            },
          }
        )
      )
      .then(
        (response) => {
          dispatch({ type: "SET_SUCCESS" });
        },
        (error) => {
          dispatch({ type: "SET_ERROR" });
        }
      );
  };
};
// delete reservation par tenant
export const deleteReservation = (reservation_id, user_id) => {
  return (dispatch) => {
    dispatch({ type: "DELETE_RESERVATION" });
    dispatch({ type: "SET_PENDING" });

    axios.delete(`${baseUrl}/reservation/${reservation_id}`).then(
      (response) => {
        dispatch({ type: "SET_SUCCESS" });
        dispatch(getReservationTenant(user_id));
      },
      (error) => {
        dispatch({ type: "SET_ERROR" });
      }
    );
  };
};

//POST
export const registerLandlord = (
  first_name,
  last_name,
  mail_address,
  birth_date,
  gender,
  username,
  benefits,
  password
) => {
  return (dispatch) => {
    dispatch({ type: "REGISTER_LANDLORD" });
    dispatch({ type: "SET_PENDING" });
    axios
      .post(
        `${baseUrl}/landlords`,
        landlordReducer(
          {},
          {
            type: "REGISTER_LANDLORD",
            payload: {
              first_name: first_name,
              last_name: last_name,
              mail_address: mail_address,
              birth_date: birth_date,
              gender: gender,
              username: username,
              benefits: benefits,
              password: password,
            },
          }
        )
      )
      .then(
        (response) => {
          dispatch({ type: "SET_SUCCESS" });
          dispatch(getLandlords());
        },
        (error) => {
          dispatch({ type: "SET_ERROR" });
        }
      );
  };
};
export const registerTenant = (
  first_name,
  last_name,
  mail_address,
  birth_date,
  gender,
  username,
  balance,
  password
) => {
  return (dispatch) => {
    dispatch({ type: "REGISTER_TENANT" });
    dispatch({ type: "SET_PENDING" });
    axios
      .post(
        `${baseUrl}/tenants`,
        tenantReducer(
          {},
          {
            type: "REGISTER_TENANT",
            payload: {
              first_name: first_name,
              last_name: last_name,
              mail_address: mail_address,
              birth_date: birth_date,
              gender: gender,
              username: username,
              balance: balance,
              password: password,
            },
          }
        )
      )
      .then(
        (response) => {
          dispatch({ type: "SET_SUCCESS" });
          dispatch(getTenants());
        },
        (error) => {
          dispatch({ type: "SET_ERROR" });
        }
      );
  };
};
//edit in profil landlord
export const editPassword = (landlord_id, password) => {
  return (dispatch, getState) => {
    dispatch({ type: "EDIT_LANDLORDS_PASSWORD" });
    dispatch({ type: "SET_PENDING" });

    const landlord_to_edit = getState().landlords.filter(
      (landlord) => landlord.id == landlord_id
    )[0];

    axios
      .put(
        `${baseUrl}/landlord/${landlord_id}`,
        landlordReducer(landlord_to_edit, {
          type: "EDIT_LANDLORD_PASSWORD",
          payload: { password: password },
        })
      )
      .then(
        (response) => {
          dispatch({ type: "SET_SUCCESS" });
          dispatch(getLandlords());
        },
        (error) => {
          dispatch({ type: "SET_ERROR" });
        }
      );
  };
};
export const editNomComplet = (landlord_id, nom, prenom) => {
  return (dispatch, getState) => {
    dispatch({ type: "EDIT_LANDLORDS_NAME" });
    dispatch({ type: "SET_PENDING" });

    const landlord_to_edit = getState().landlords.filter(
      (landlord) => landlord.id == landlord_id
    )[0];

    axios
      .put(
        `${baseUrl}/landlord/${landlord_id}`,
        landlordReducer(landlord_to_edit, {
          type: "EDIT_LANDLORD_NAME",
          payload: { nom: nom, prenom: prenom },
        })
      )
      .then(
        (response) => {
          dispatch({ type: "SET_SUCCESS" });
          dispatch(getLandlords());
        },
        (error) => {
          dispatch({ type: "SET_ERROR" });
        }
      );
  };
};


//edit profil tenant
export const editNomCompletTenant = (tenant_id, nom, prenom) => {
  return (dispatch, getState) => {
    dispatch({ type: "EDIT_TENANTS_NAME" });
    dispatch({ type: "SET_PENDING" });

    const tenant_to_edit = getState().tenants.filter(
      (tenant) => tenant.id == tenant_id
    )[0];

    axios
      .put(
        `${baseUrl}/tenant/${tenant_id}`,
        tenantReducer(tenant_to_edit, {
          type: "EDIT_TENANT_NAME",
          payload: { nom: nom, prenom: prenom },
        })
      )
      .then(
        (response) => {
          dispatch({ type: "SET_SUCCESS" });
          dispatch(getTenants());
        },
        (error) => {
          dispatch({ type: "SET_ERROR" });
        }
      );
  };
};
export const editPasswordTenant = (tenant_id, password) => {
  return (dispatch, getState) => {
    dispatch({ type: "EDIT_TENANTS_PASSWORD" });
    dispatch({ type: "SET_PENDING" });

    const tenant_to_edit = getState().tenants.filter(
      (tenant) => tenant.id == tenant_id
    )[0];

    axios
      .put(
        `${baseUrl}/tenant/${tenant_id}`,
        tenantReducer(tenant_to_edit, {
          type: "EDIT_TENANT_PASSWORD",
          payload: { password: password },
        })
      )
      .then(
        (response) => {
          dispatch({ type: "SET_SUCCESS" });
          dispatch(getTenants());
        },
        (error) => {
          dispatch({ type: "SET_ERROR" });
        }
      );
  };
};
export const editBalance = (tenant_id, balance) => {
  return (dispatch, getState) => {
    dispatch({ type: "EDIT_TENANTS_BALANCE" });
    dispatch({ type: "SET_PENDING" });

    const tenant_to_edit = getState().tenants.filter(
      (tenant) => tenant.id == tenant_id
    )[0];

    axios
      .put(
        `${baseUrl}/tenant/${tenant_id}`,
        tenantReducer(tenant_to_edit, {
          type: "EDIT_TENANT_BALANCE",
          payload: { balance: balance },
        })
      )
      .then(
        (response) => {
          dispatch({ type: "SET_SUCCESS" });
          dispatch(getTenants());
        },
        (error) => {
          dispatch({ type: "SET_ERROR" });
        }
      );
  };
};

//delete a compte
export const deleteLandlord = (landlord_id) => {
  return (dispatch) => {
    dispatch({ type: "DELETE_LANDLORD" });
    dispatch({ type: "SET_PENDING" });

    axios.delete(`${baseUrl}/landlord/${landlord_id}`).then(
      (response) => {
        dispatch({ type: "SET_SUCCESS" });
        dispatch(getLandlords());
      },
      (error) => {
        dispatch({ type: "SET_ERROR" });
      }
    );
  };
};
export const deleteTenant = (tenant_id) => {
  return (dispatch) => {
    dispatch({ type: "DELETE_TENANT" });
    dispatch({ type: "SET_PENDING" });

    axios.delete(`${baseUrl}/tenant/${tenant_id}`).then(
      (response) => {
        dispatch({ type: "SET_SUCCESS" });
        dispatch(getTenants());
      },
      (error) => {
        dispatch({ type: "SET_ERROR" });
      }
    );
  };
};

//get one tenant
export const getTenant = (tenant_id) => {
  return (dispatch) => {
    dispatch({ type: "SET_PENDING" });

    axios.get(`${baseUrl}/tenant/${tenant_id}`).then(
      (response) => {
        dispatch({ type: "GET_TENANT", payload: response });
        dispatch({ type: "SET_SUCCESS" });
      },
      (error) => {
        dispatch({ type: "GET_TENANT", payload: { data: [] } });
        dispatch({ type: "SET_ERROR" });
      }
    );
  };
};
