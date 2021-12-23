import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import roomsReducers from "./Reducers/roomsReducers";
import landlordsReducers from "./Reducers/landlordsReducers";
import tenantsReducers from "./Reducers/tenantsReducers";
import statusReducer from "./reducers/StatusReducer";
import isLoggedInReducer from "./reducers/isLoggedInReducer";
import currentUserReducer from "./reducers/currentUserReducer";
import TypeUser from "./reducers/TypeUser";
import reservationsLandlordReducers from "./Reducers/reservationsLandlordReducers";
import reservationsTenantReducers from "./Reducers/reservationsTenantReducers";
import getOneTanant from "./Reducers/getOneTanant";

const store = createStore(
  combineReducers({
    user: currentUserReducer,
    isLoggedIn: isLoggedInReducer,
    rooms: roomsReducers,
    status: statusReducer,
    landlords: landlordsReducers,
    tenants: tenantsReducers,
    reservationsLandlord: reservationsLandlordReducers,
    reservationsTenant: reservationsTenantReducers,
    type: TypeUser,
    Onetenant: getOneTanant,
  }),
  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);
export default store;
/*
import update from "react-addons-update";
const initialState = {
   count: 1,
  message: "lamine",
  isLoggedIn: "",
  user: [],
  users: [
    {
      username: "brim0049",
      email: "xragon_555@hotmail.com",
      password: "123456",
      prenom: "Mohammed El Amin",
      nom: "Brik",
      select: "locataire",
      solde: 2000,
    },

  ],
  location: [
    {
      id: 2,
      ville: "Rimouski",
      nbPersonne: "2",
      prix: "30",
      status: "Non reserver",
      dateEntree: new Date("2000-2-6"),
      dateSortie: new Date("2000-2-6"),
      locateur: "",
      locataire: "",
      nombreDeNuit: 1,
      total: "",
    },
  ], 

//Reducers
const reducers = (state = initialState, action) => {
  switch (action.type) {
    case "RESERVER_CHAMBRE":
      return update(state, {
        location: {
          [action.payload.id - 1]: {
            status: { $set: action.payload.status },
            locataire: { $set: action.payload.locataire },
          },
        },
      });
    case "ACCEPTER_CHAMBRE":
      return update(state, {
        location: {
          [action.payload.id - 1]: {
            status: { $set: action.payload.status },
          },
        },
      });
    case "ANNULER_CHAMBRE":
      return update(state, {
        location: {
          [action.payload.id - 1]: {
            status: { $set: action.payload.status },
            locataire: { $set: action.payload.locataire },
          },
        },
      });
    case "INCREMENT":
      return {
        ...state,
        location: state.location.map((_location) =>
          _location.id === action.payload.id
            ? { ..._location, nombreDeNuit: _location.nombreDeNuit + 1 }
            : _location
        ),
      };
    case "CALCULER_TOTAL":
      return update(state, {
        location: {
          [action.payload.id - 1]: {
            total: { $set: action.payload.total },
          },
        },
      });
    case "REGISTER_SUCCESS":
      return {
        ...state,
        users: [
          ...state.users,
          {
            username: action.payload.username,
            email: action.payload.email,
            password: action.payload.password,
            prenom: action.payload.prenom,
            nom: action.payload.nom,
            select: action.payload.select,
            solde: 2000,
          },
        ],
      };
    case "LOGIN_SUCCESS":
      const _vUser = state.users.findIndex(
        (_item) => _item.username === action.payload.username
      );
      const _vPassword = state.users.findIndex(
        (_item) => _item.password === action.payload.password
      );
      const filteruser = state.users.filter(
        (utilisateur) =>
          utilisateur.username.indexOf(action.payload.username) >= 0
      );
      if (_vUser > -1 && _vPassword > -1) {
        return {
          ...state,
          isLoggedIn: true,
          user: filteruser,
        };
      } else {
        return {
          ...state,
          isLoggedIn: false,
        };
      }
    case "LOGOUT":
      return update(state, {
        isLoggedIn: {
          $set: false,
        },
        user: {
          $set: null,
        },
      });
    case "CHANGE_PASSWORD":
      return {
        ...state,
        users: state.users.map((_user) =>
          _user.username === action.payload.username
            ? { ..._user, password: action.payload.password }
            : _user
        ),
        user: state.user.map((__user) =>
          __user.username === action.payload.username
            ? { ...__user, password: action.payload.password }
            : __user
        ),
      };
    case "ADD_CHAMBRE":
      return {
        ...state,
        location: [
          ...state.location,
          {
            id: state.location.length + 1,
            ville: action.payload.ville,
            nbPersonne: action.payload.nbPersonne,
            prix: action.payload.prix,
            status: "Non reserver",
            dateEntree: action.payload.dateEntree,
            dateSortie: action.payload.dateSortie,
            locateur: action.payload.locateur,
            locataire: "",
            nombreDeNuit: 1,
            total: "",
          },
        ],
      };
    case "DELETE_CHAMBRE":
      return {
        ...state,
        location: [...state.location.splice(action.payload.id, 1)],
      };
    default:
      return state;
  }
};
*/
