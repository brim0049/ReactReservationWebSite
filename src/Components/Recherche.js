import React, { useState, useEffect } from "react";
import { connect, useSelector } from "react-redux";
import { Form, Button, ListGroup, Container, Row, Col } from "react-bootstrap";
import { FaSave } from "react-icons/fa";
import { valeurStateAfterInput, valeurStateBeforeInput } from "./stateInput";
import {
  getRooms,
  getLandlords,
  getTenants,
  getReservationLandlord,
  createReservation,
} from "../Services/service";
function Recherche(props) {
  //api
  useEffect(() => {
    props.getRooms();
    props.getLandlords();
    props.getTenants();
  }, []);

  // const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const currentUser = useSelector((state) => state.user);
  //States for filtring
  const [form, setForm] = useState(valeurStateBeforeInput);
  const [formAfter, setFormAfter] = useState(valeurStateAfterInput);

  //get all values input
  const handleSetForm = ({ target: { name, value } }) => {
    setForm({ ...form, [name]: value });
  };
  const resetForm = () => {
    setForm({ ville: "", nbPersonne: "", prix: "" });
  };

  //Button =>>> filter
  const confirm = (e) => {
    setFormAfter({
      ville: form.ville,
      nbPersonne: form.nbPersonne,
      prix: form.prix,
    });
    resetForm();
  };
  //mapping
  const locationMap = props.data.rooms.filter((product) => {
    return (
      product.town.toLowerCase().includes(formAfter.ville.toLowerCase()) &&
      product.capacity >= formAfter.nbPersonne &&
      product.price >= formAfter.prix
    );
  });
  const [edit_mode, setEdit] = useState(false);
  const stateInputReservation = { dateEntree: null, dateSortie: null };
  const [newreservation, setReservation] = useState(stateInputReservation);
  const onChangeReservation = ({ target: { name, value } }) => {
    setReservation({ ...newreservation, [name]: value });
  };
  const resetReservation = () => {
    setReservation({ dateEntree: "", dateSortie: "" });
  };
  const handleReservation = (e) => {
    e.preventDefault();
  };

  const create = (room, landlord, capacity, price) => {
    if (edit_mode) {
      props.createReservation(
        room,
        currentUser[0].id,
        landlord,
        capacity,
        newreservation.dateEntree,
        newreservation.dateSortie,
        ((new Date(newreservation.dateSortie).getTime() -
          new Date(newreservation.dateEntree).getTime()) /
          (1000 * 3600 * 24)) *
          price,
        "P"
      );
      setEdit(false);
      resetReservation();
    } else {
      setEdit(true);
    }
  };
  return (
    <div>
      <Form className="col-md-5 mx-auto">
        <Form.Group className="mb-3">
          <Form.Label>Ville</Form.Label>
          <Form.Control
            value={form.ville}
            name="ville"
            onChange={handleSetForm}
            type="text"
            placeholder="Lévis"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Nombre personne</Form.Label>
          <Form.Control
            value={form.nbPersonne}
            name="nbPersonne"
            onChange={handleSetForm}
            type="text"
            placeholder="1"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>prix</Form.Label>
          <Form.Control
            value={form.prix}
            name="prix"
            onChange={handleSetForm}
            type="text"
            placeholder="30 $"
          />
        </Form.Group>

        <Button
          onClick={() => {
            confirm();
          }}
          variant="outline-dark"
        >
          Recherche
        </Button>
      </Form>
      <div className="col-md-5 mx-auto">
        <h4>Resultat du recherche</h4>
        {locationMap.map((chambre) => (
          <ListGroup.Item key={chambre.id}>
            <Container>
              <Row>
                <Col sm={4}>Ville </Col>
                <Col sm={3}>{chambre.town}</Col>
              </Row>
              <Row>
                <Col sm={4}>Nombre personne</Col>
                <Col sm={4}>{chambre.capacity}</Col>
              </Row>
              <Row>
                <Col sm={4}>Prix par nuit </Col>
                <Col sm={4}>{chambre.price}$</Col>
              </Row>
              {edit_mode ? (
                <Form onSubmit={handleReservation}>
                  <div className="col-md-12">
                    <Row>
                      <Form.Group className="mb-3" as={Col}>
                        <Form.Label>Date d'entrée</Form.Label>

                        <Form.Control
                          value={newreservation.dateEntree}
                          name="dateEntree"
                          onChange={onChangeReservation}
                          type="date"
                          placeholder="Date d'entrée (yyyy-mm-dd)"
                        />
                      </Form.Group>
                      <Form.Group className="mb-3" as={Col}>
                      <Form.Label>Date de sortie</Form.Label>
                        <Form.Control
                          value={newreservation.dateSortie}
                          name="dateSortie"
                          onChange={onChangeReservation}
                          type="date"
                          placeholder="Date de sortie (yyyy-mm-dd)"
                        />
                      </Form.Group>
                    </Row>
                  </div>
                </Form>
              ) : (
                <></>
              )}
              <Row>
                <Col xs={1}>
                  <Button
                    onClick={() => {
                      create(
                        chambre.id,
                        chambre.landlord,
                        chambre.capacity,
                        chambre.price
                      );
                    }}
                    variant="primary"
                  >
                    {edit_mode ? <FaSave /> : "Réserver"}
                  </Button>
                </Col>
              </Row>
            </Container>
          </ListGroup.Item>
        ))}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    data: state,
  };
};
export default connect(mapStateToProps, {
  getRooms: getRooms,
  getTenants: getTenants,
  getLandlords: getLandlords,
  getReservationLandlord: getReservationLandlord,
  createReservation: createReservation,
})(Recherche);
/*
   <Row>
                <Col sm={4}>Date d'entrée</Col>
                <Col sm={4}>{chambre.dateEntree.toLocaleDateString()}</Col>
              </Row> 
                <Row>
                <Col sm={4}>Date de sorite</Col>
                <Col sm={4}>{chambre.dateSortie.toLocaleDateString()}</Col>
              </Row> 
               <Row>
                <Col sm={4}>Total</Col>
                <Col sm={4} >
                   <strong>{chambre.total} $</strong>
                   </Col>
              </Row> 
   <Form.Group className="mb-3">
          <Form.Label>Date d'entrée</Form.Label>
          <Form.Control
            value={form.dateEntree}
            name="dateEntree"
            onChange={handleSetForm}
            type="text"
            placeholder="yyyy-mm-dd"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Date de sortie</Form.Label>
          <Form.Control
            value={form.dateSortie}
            name="dateSortie"
            onChange={handleSetForm}
            type="text"
            placeholder="yyyy-mm-dd"
          />
        </Form.Group> 

<Button
                    onClick={() => {
                      {
                        chambre.status == "Non reserver"
                          ? isLoggedIn
                            ? reserverButton(
                                chambre.id,
                                currentUser[0].username
                              )
                            : reserverButtonOut(chambre.id)
                          : annulerButton(chambre.id);
                      }
                      calculerButton(
                        chambre.id,
                        parseInt(chambre.prix) * chambre.nombreDeNuit
                      );
                    }}
                    variant="outline-dark"
                    id="button-addon2"
                  >
                    {chambre.status == "Non reserver" ? "Reserver" : "Annuler"}
                  </Button>
                    //Reservation
  const reserverButton = (id, locataire) => {
    props.dispatch(reserver(id, locataire));
  };
  //Reservation
  const reserverButtonOut = (id) => {
    props.dispatch(reserver(id));
  };
  //Annuler reservations
  const annulerButton = (id) => {
    props.dispatch(annuler(id));
  };
  //ajouter des nuits
  const incrementButton = (id) => {
    props.dispatch(increment(id));
  };
  //calculer total
  const calculerButton = (id, total) => {
    props.dispatch(calculer(id, total));
  }; */
