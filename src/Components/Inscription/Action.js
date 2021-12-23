/* //..........................action
//inscription
export function register(prenom, nom, username, email, password, select) {
  return {
    type: "REGISTER_SUCCESS",
    payload: {
      prenom: prenom,
      nom: nom,
      username: username,
      email: email,
      password: password,
      select: select,
    },
  };
}

export function login(username, password) {
  return {
    type: "LOGIN_SUCCESS",
    payload: {
      username: username,
      password: password,
    },
  };
}
export function logout() {
  return {
    type: "LOGOUT",
  };
}
export function modifier(username, password) {
  return {
    type: "CHANGE_PASSWORD",
    payload: {
      username: username,
      password: password,
    },
  };
}
//ADD CHAMBRE
export function ajouter(ville, nbPersonne, prix, dateEntree, dateSortie, locateur) {
  return {
    type: "ADD_CHAMBRE",
    payload: {
      ville: ville,
      nbPersonne: nbPersonne,
      prix: prix,
      dateEntree: new Date(dateEntree),
      dateSortie: new Date(dateSortie),
      locateur: locateur,
    },
  };
} 
//DELETE CHAMBRE
export function supprimer(id) {
  return {
    type: "DELETE_CHAMBRE",
    payload: {
      id,
    },
  };
}
//..........................action
//reserver une chambre

export function reserver(id,locataire) {
  return {
    type: "RESERVER_CHAMBRE",
    payload: {
      id,
      status: "En attente",
      locataire,
    },
  };
}
export function accepter(id) {
  return {
    type: "ACCEPTER_CHAMBRE",
    payload: {
      id,
      status: "Reservé",
    },
  };
}
export function annuler(id) {
  return {
    type: "ANNULER_CHAMBRE",
    payload: {
      id,
      status: "Non reserver",
      locataire:''
    },
  };
}
//Callculer total de reservation
export function calculer(id, newtotal) {
  return {
    type: "CALCULER_TOTAL",
    payload: {
      id,
      total:newtotal,
    },
  };
} 
//ajouter des nuits
export function increment(id) {
return{
    type: 'INCREMENT',
    payload: {
      id,
    },
  }
}
 */