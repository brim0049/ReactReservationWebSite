import React, { useState, useRef, useEffect } from "react";
import { connect, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { FiEdit, FiTrash } from "react-icons/fi";
import { FaRegWindowClose } from "react-icons/fa";
import { BiDownArrowCircle, BiUpArrowCircle } from "react-icons/bi";
import {
  Form as Formulaire,
  Button,
  Card,
  Row,
  Col,
  ListGroup,
  Container,
} from "react-bootstrap";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import {
  getRooms,
  addRoom,
  deleteRoom,
  editRoom,
  getReservationLandlord,
  getReservationTenant,
  editReservationLandLord,
  editReservationTenant,
  deleteReservation,
  editBalance,
  getTenant,
  getTenants,
} from "../Services/service";

function Reservations(props) {
  // for API
  useEffect(() => {
    props.getRooms();
    props.getTenants();
    type == "locataire"
      ? props.getReservationTenant(currentUser[0].id)
      : props.getReservationLandlord(currentUser[0].id);
  }, []);
  // recuperer states
  const Onetenant = useSelector((state) => state.Onetenant);
  const tenants = useSelector((state) => state.tenants);
  const landlords = useSelector((state) => state.landlords);
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const currentUser = useSelector((state) => state.user);
  const type = useSelector((state) => state.type);
  const rooms = useSelector((state) => state.rooms);
  const reservationsLandlord = useSelector(
    (state) => state.reservationsLandlord
  );
  const reservationsTenant = useSelector((state) => state.reservationsTenant);

  //edit room
  const [Afficher, setAfficher] = useState(true); //afficher  edit room
  const stateInputEdit = { editTown: "", editCapacity: "", editPrice: "" }; //state local>> room
  const [editroom, seteditroom] = useState(stateInputEdit);
  const onChangeEdit = ({ target: { name, value } }) => {
    seteditroom({ ...editroom, [name]: value });
  };
  const resetEdit = () => {
    seteditroom({ editTown: "", editCapacity: "", editPrice: "" });
  };
  const handleEdit = (e) => {
    e.preventDefault();
    form.current.validateAll();
    if (checkBtn.current.context._errors.length === 0) {
      setAfficher(true);
      resetEdit();
    }
  };
  //passe id chambre
  const [passeId, setPassId] = useState("");
  //pour verifier si l'utilisateur a entré des données ou non
  const required = (value) => {
    if (!value) {
      return <></>;
    }
  };
  // *******************Ajouter nouvelle chambre locateur
  //get reference
  const form = useRef();
  const checkBtn = useRef();
  // state local
  const stateInput = {
    ville: "",
    nbPersonne: "",
    prix: "",
    dateEntree: "",
    dateSortie: "",
    locateur: "",
    select: "",
  };
  //set State
  const [formulaire, setForm] = useState(stateInput);
  //get all values input
  const handleSetForm = ({ target: { name, value } }) => {
    setForm({ ...formulaire, [name]: value });
  };
  const resetForm = () => {
    setForm({ ville: "", nbPersonne: "", prix: "" });
  };
  //button add room
  const handleAdd = (e) => {
    e.preventDefault();
    form.current.validateAll();
    if (checkBtn.current.context._errors.length === 0) {
      props.addRoom(
        formulaire.ville,
        currentUser[0].id,
        formulaire.nbPersonne,
        formulaire.prix
      );
      resetForm();
    }
  };
  // ************** mapping
  //show rooms of landlord
  const LocateurMap = rooms.filter((room) => {
    return room.landlord == currentUser[0].id;
  });
  //show reservations of landlord
  const LocateurReservationMap = (id) => {
    return reservationsLandlord.filter((item) => item.room == id);
  };
  //Afficher les données de tenant for landlord part
  const LocateurTenantMap = (id) => {
    return tenants.filter((item) => item.id == id);
  };
  //Afficher les données de landlord for tenant part
  const LocataireLandlordMap = (id) => {
    return landlords.filter((item) => item.id == id);
  };
  //calculer le gain de landlord dans le cas ou la chambre est activé sinon !
  const gainReservation = reservationsLandlord.filter(
    (item) => item.status == "A"
  );
  const Gain = gainReservation.reduce((a, b) => a + b.total_price, 0);
  //......................................................................
  //show rooms of tenant
  const LocataireRoomMap = rooms.filter(
    (item) =>
      reservationsTenant.filter((reserva) => reserva.room === item.id).length
  );
  const LocataireReservationMap = (id) => {
    return reservationsTenant.filter((item) => item.room == id);
  };
  // pour calculer le solde de tenant
  const PaiementReservation = reservationsTenant.filter(
    (item) => item.status == "A"
  );
  const Paiement = PaiementReservation.reduce((a, b) => a + b.total_price, 0);

  // affichage tout d'abord partie landlord
  if (isLoggedIn) {
    if (type == "locateur") {
      return (
        <div className="container">
          <h1>Reservations</h1>
          <Card>
            <Card.Header className="text-center">
              <Card.Title>Reservations {type}:</Card.Title>
              {currentUser[0].last_name}, {currentUser[0].first_name}
            </Card.Header>
            <Card.Body>
              <Card.Text>
                <Card.Title>Gain: {Gain}$</Card.Title>
                {Afficher ? (
                  <Row>
                    <Col sm={4}>Ajouter une nouvelle chambres:</Col>
                    <Col sm={6}>
                      <div className="col-md-12">
                        <Form onSubmit={handleAdd} ref={form}>
                          <div>
                            <Row>
                              <Formulaire.Group as={Col}>
                                <Formulaire.Label>ville</Formulaire.Label>
                                <Input
                                  type="text"
                                  className="form-control"
                                  name="ville"
                                  value={formulaire.ville}
                                  onChange={handleSetForm}
                                  validations={[required]}
                                />
                              </Formulaire.Group>
                              <Formulaire.Group as={Col}>
                                <Formulaire.Label>
                                  Nombre de personne
                                </Formulaire.Label>
                                <Input
                                  type="text"
                                  className="form-control"
                                  name="nbPersonne"
                                  value={formulaire.nbPersonne}
                                  onChange={handleSetForm}
                                  validations={[required]}
                                />
                              </Formulaire.Group>
                            </Row>
                            <Row>
                              <Formulaire.Group as={Col}>
                                <Formulaire.Label>Prix</Formulaire.Label>
                                <Input
                                  type="text"
                                  className="form-control"
                                  name="prix"
                                  value={formulaire.prix}
                                  onChange={handleSetForm}
                                  validations={[required]}
                                />
                              </Formulaire.Group>
                            </Row>

                            <Button variant="outline-primary" type="submit">
                              Ajouter
                            </Button>
                          </div>

                          <CheckButton
                            style={{ display: "none" }}
                            ref={checkBtn}
                          />
                        </Form>
                      </div>
                    </Col>
                  </Row>
                ) : (
                  <Form onSubmit={handleEdit} ref={form}>
                    <div className="form-group">
                      <label>Town</label>
                      <Input
                        type="text"
                        className="form-control"
                        name="editTown"
                        value={editroom.editTown}
                        onChange={onChangeEdit}
                        validations={[required]}
                      />
                    </div>
                    <div className="form-group">
                      <label>Nombre de personne</label>
                      <Input
                        type="text"
                        className="form-control"
                        name="editCapacity"
                        value={editroom.editCapacity}
                        onChange={onChangeEdit}
                        validations={[required]}
                      />
                      <div className="form-group">
                        <label>Prix</label>
                        <Input
                          type="text"
                          className="form-control"
                          name="editPrice"
                          value={editroom.editPrice}
                          onChange={onChangeEdit}
                          validations={[required]}
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <button
                        className="btn btn-outline-success btn-block"
                        onClick={() => {
                          props.editRoom(
                            passeId,
                            editroom.editTown,
                            editroom.editCapacity,
                            editroom.editPrice
                          );
                        }}
                      >
                        <span>Modifier</span>
                      </button>
                    </div>
                    <CheckButton style={{ display: "none" }} ref={checkBtn} />
                  </Form>
                )}
              </Card.Text>
            </Card.Body>
          </Card>
          <Card>
            <Card.Header>Mes articles</Card.Header>
            <Card.Body>
              <Card.Text>
                <div>
                  {LocateurMap.map((chambre) => (
                    <ListGroup.Item key={chambre.id}>
                      {LocateurReservationMap(chambre.id).length ? (
                        LocateurReservationMap(chambre.id).map((reser) => (
                          <Container>
                            <Row>
                              <Col sm={3}>Ville </Col>
                              <Col sm={3}>{chambre.town}</Col>
                              <Col sm={2}>Status</Col>
                              <Col sm={2}>
                                {LocateurReservationMap(chambre.id).length
                                  ? reser.status == "P"
                                    ? "En attente"
                                    : reser.status == "A"
                                    ? "Active"
                                    : "Expired"
                                  : " "}
                              </Col>
                            </Row>
                            <Row>
                              <Col sm={3}>Nombre personne</Col>
                              <Col sm={3}>{chambre.capacity}</Col>
                              <Col sm={2}>Date d'entrée</Col>
                              <Col sm={2}>
                                {LocateurReservationMap(chambre.id).length
                                  ? LocateurReservationMap(chambre.id).map(
                                      (reser) => <>{reser.in_date}</>
                                    )
                                  : " "}
                              </Col>
                            </Row>
                            <Row>
                              <Col sm={3}>Prix par nuit </Col>
                              <Col sm={3}>{chambre.price}</Col>
                              <Col sm={2}>Date de sortie</Col>
                              <Col sm={2}>
                                {LocateurReservationMap(chambre.id).length
                                  ? LocateurReservationMap(chambre.id).map(
                                      (reser) => <>{reser.out_date}</>
                                    )
                                  : " "}
                              </Col>
                            </Row>
                            <Row>
                              <Col sm={3}>Total</Col>
                              <Col sm={3}>
                                {LocateurReservationMap(chambre.id).length
                                  ? reser.total_price
                                  : ""}
                                $
                              </Col>
                              <Col sm={2}>Locataire </Col>
                              <Col sm={2}>
                                {LocateurTenantMap(reser.tenant).map((ten) => (
                                  <>
                                    {ten.first_name}, {ten.last_name}
                                  </>
                                ))}
                              </Col>
                            </Row>
                            <Row>
                              <Col sm={4}>
                                <Button
                                  onClick={() => {
                                    props.editReservationLandLord(
                                      reser.id,
                                      chambre.landlord,
                                      reser.room,
                                      reser.tenant,
                                      reser.landlord,
                                      reser.nbr_persons,
                                      reser.in_date,
                                      reser.out_date,
                                      reser.total_price,
                                      "P"
                                    );
                                  }}
                                  variant="outline-secondary"
                                  id="button-addon2"
                                >
                                  Refuser
                                </Button>
                              </Col>
                              <Col sm={4}>
                                <Button
                                  onClick={() => {
                                    props.editReservationLandLord(
                                      reser.id,
                                      chambre.landlord,
                                      reser.room,
                                      reser.tenant,
                                      reser.landlord,
                                      reser.nbr_persons,
                                      reser.in_date,
                                      reser.out_date,
                                      reser.total_price,
                                      "A"
                                    );
                                  }}
                                  variant="outline-primary"
                                  id="button-addon2"
                                >
                                  Accepter
                                </Button>
                              </Col>
                              <Col sm={4}>
                                <Button
                                  onClick={() => {
                                    props.deleteRoom(chambre.id);
                                  }}
                                  variant="outline-danger"
                                  id="button-addon2"
                                >
                                  <FiTrash />
                                </Button>

                                {Afficher ? (
                                  <button
                                    className="btn btn-warning btn-block"
                                    onClick={() => {
                                      setPassId(chambre.id);
                                      setAfficher(false);
                                    }}
                                  >
                                    <FiEdit />
                                  </button>
                                ) : (
                                  <button
                                    className="btn btn-secondary btn-block"
                                    onClick={() => {
                                      setPassId("");
                                      setAfficher(true);
                                    }}
                                  >
                                    <FaRegWindowClose />
                                  </button>
                                )}
                              </Col>
                            </Row>
                          </Container>
                        ))
                      ) : (
                        <Container>
                          <Row>
                            <Col sm={3}>Ville </Col>
                            <Col sm={3}>{chambre.town}</Col>
                          </Row>
                          <Row>
                            <Col sm={3}>Nombre personne</Col>
                            <Col sm={3}>{chambre.capacity}</Col>
                          </Row>
                          <Row>
                            <Col sm={3}>Prix par nuit </Col>
                            <Col sm={3}>{chambre.price}</Col>
                          </Row>
                          <Row></Row>
                          <Row>
                            <Col sm={4}>
                              <Button
                                onClick={() => {
                                  props.deleteRoom(chambre.id);
                                }}
                                variant="outline-danger"
                                id="button-addon2"
                              >
                                <FiTrash />
                              </Button>

                              {Afficher ? (
                                <button
                                  className="btn btn-warning btn-block"
                                  onClick={() => {
                                    setPassId(chambre.id);
                                    setAfficher(false);
                                  }}
                                >
                                  <FiEdit />
                                </button>
                              ) : (
                                <button
                                  className="btn btn-secondary btn-block"
                                  onClick={() => {
                                    setPassId("");
                                    setAfficher(true);
                                  }}
                                >
                                  <FaRegWindowClose />
                                </button>
                              )}
                            </Col>
                          </Row>
                        </Container>
                      )}
                    </ListGroup.Item>
                  ))}
                </div>
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
      );
    }
    //partie locataire
    else {
      return (
        <div className="container">
          <h1>Reservations {props.getTenant(currentUser[0].id)}</h1>
          <Card>
            <Card.Title>
              Solde: {Onetenant.balance - Paiement}$
              <Button
                variant="secondary"
                onClick={() => {
                  props.editBalance(currentUser[0].id, Onetenant.balance + 1000);
                }}
              >
                <BiUpArrowCircle />
              </Button>
              <Button
                variant="secondary"
                onClick={() => {
                  props.editBalance(
                    currentUser[0].id,
                    Onetenant.balance - 1000
                  );
                }}
              >
                <BiDownArrowCircle />
              </Button>
            </Card.Title>
            <Card.Header>Mes articles</Card.Header>
            <Card.Body>
              <Card.Text>
                <div>
                  {LocataireRoomMap.map((chambre) => (
                    <ListGroup.Item key={chambre.id}>
                      {LocataireReservationMap(chambre.id).map((reser) => (
                        <Container>
                          <Row>
                            <Col sm={3}>Ville </Col>
                            <Col sm={3}>{chambre.town}</Col>
                            <Col sm={2}>Status</Col>
                            <Col sm={2}>
                              {" "}
                              {reser.status == "P"
                                ? "En attente"
                                : reser.status == "A"
                                ? "Active"
                                : "Expired"}
                            </Col>
                          </Row>
                          <Row>
                            <Col sm={3}>Nombre personne</Col>
                            <Col sm={3}>{chambre.capacity}</Col>
                            <Col sm={2}>Date d'entrée</Col>
                            <Col sm={2}>{reser.in_date}</Col>
                          </Row>
                          <Row>
                            <Col sm={3}>Prix par nuit </Col>
                            <Col sm={3}>{chambre.price}</Col>
                            <Col sm={2}>Date d'entrée</Col>
                            <Col sm={2}>{reser.out_date}</Col>
                          </Row>
                          <Row>
                            <Col sm={3}>Total</Col>
                            <Col sm={3}>{reser.total_price}$</Col>
                            <Col sm={2}>Locateur</Col>
                            <Col sm={2}>
                              {LocataireLandlordMap(reser.landlord).map(
                                (lan) => (
                                  <>{lan.first_name}, {lan.last_name}</>
                                )
                              )}
                            </Col>
                          </Row>
                          <Row>
                            <Col sm={3}>
                              {reser.status == "P" ? (
                                <></>
                              ) : (
                                <Button
                                  onClick={() => {
                                    props.editReservationTenant(
                                      reser.id,
                                      currentUser[0].id,
                                      reser.room,
                                      reser.tenant,
                                      reser.landlord,
                                      reser.nbr_persons,
                                      reser.in_date,
                                      reser.out_date,
                                      reser.total_price,
                                      "P"
                                    );
                                  }}
                                  variant="secondary"
                                  id="button-addon2"
                                >
                                  Annuler
                                </Button>
                              )}
                            </Col>
                            <Col sm={3}>
                              <Button
                                onClick={() => {
                                  props.deleteReservation(
                                    reser.id,
                                    currentUser[0].id
                                  );
                                }}
                                variant="danger"
                                id="button-addon2"
                              >
                                supprimer définitivement
                              </Button>
                            </Col>
                          </Row>
                        </Container>
                      ))}
                    </ListGroup.Item>
                  ))}
                </div>
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
      );
    }
  } else {
    return <Redirect to="../Connexion" />;
  }
}
/* const mapStateToProps = (state) => {
  return {
    data:state,
  };
};  */
export default connect(null, {
  getRooms: getRooms,
  addRoom: addRoom,
  deleteRoom: deleteRoom,
  editRoom: editRoom,
  getReservationLandlord: getReservationLandlord,
  getReservationTenant: getReservationTenant,
  editReservationLandLord: editReservationLandLord,
  editReservationTenant: editReservationTenant,
  deleteReservation: deleteReservation,
  editBalance: editBalance,
  getTenant: getTenant,
  getTenants: getTenants,
})(Reservations);
//map reduce pour calculer le gain
/* const gainMap = useSelector((state) =>
    state.location.filter((product) => {
      return (
        product.locateur.indexOf(currentUser[0].username) >= 0 &&
        product.status.indexOf("Reservé") >= 0
      );
    })
  ); 
 /*     <Formulaire.Group as={Col}>
    <Formulaire.Label>Date d'entrée</Formulaire.Label>
    <Input
      type="text"
      className="form-control"
      name="dateEntree"
      value={formulaire.dateEntree}
      onChange={handleSetForm}
      validations={[required]}
    />
  </Formulaire.Group> 
<Row>
  <Formulaire.Group as={Col}>
    <Formulaire.Label>
      Date de sortie
    </Formulaire.Label>
    <Input
      type="text"
      className="form-control"
      name="dateSortie"
      value={formulaire.dateSortie}
      onChange={handleSetForm}
      validations={[required]}
    />
  </Formulaire.Group>
</Row> 
  */
