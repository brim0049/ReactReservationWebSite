import React, { useState, useRef } from "react";
import { Redirect } from "react-router-dom";
import { connect, useSelector } from "react-redux";
import { Card, Row, Col, Container } from "react-bootstrap";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import {
  editPassword,
  editNomComplet,
  deleteLandlord,
  editPasswordTenant,
  editNomCompletTenant,
  deleteTenant,
  logout,
  currentUser,
} from "../Services/service";
//verification
const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        Ce champ est obligatoire!
      </div>
    );
  }
};
//la fonction
function Profil(props) {
  //for edit
  const [Afficher, setAfficher] = useState(true); //afficher  edit password
  const [AfficherName, setAfficherName] = useState(true); //afficher  edit nom prenom
  // get state pour afficher les info user et definie le type locateur/locataire
  const Onetenant = useSelector((state) => state.Onetenant);
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const user = useSelector((state) => state.user);
  const type = useSelector((state) => state.type);
  //for form
  const form = useRef();
  const checkBtn = useRef();

  // get new password
  const [password, setPassword] = useState("");
  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };
  const handlePassword = (e) => {
    e.preventDefault();
    form.current.validateAll();
    setAfficher(true);
    if (checkBtn.current.context._errors.length === 0) {
      if (type == "locateur") {
        props.editPassword(user[0].id, password);
        props.logout();
      } else {
        props.editPasswordTenant(user[0].id, password);
        props.logout();
      }
    }
  };
  //get new Nom, prenom
  const stateInput = { nom: "", prenom: "" };
  const [nomComplet, setNomComplet] = useState(stateInput);
  const handleSetNomComplet = ({ target: { name, value } }) => {
    setNomComplet({ ...nomComplet, [name]: value });
  };
  const handleNomComplet = (e) => {
    e.preventDefault();
    form.current.validateAll();
    setAfficherName(true);
    if (checkBtn.current.context._errors.length === 0) {
      if (type == "locateur") {
        props.editNomComplet(user[0].id, nomComplet.nom, nomComplet.prenom);
        props.logout();
      } else {
        props.editNomCompletTenant(
          user[0].id,
          nomComplet.nom,
          nomComplet.prenom
        );
        props.logout();
      }
    }
  };
  //delete compte
  const handleDelete = (e) => {
    e.preventDefault();
    if (checkBtn.current.context._errors.length === 0) {
      if (type == "locateur") {
        props.deleteLandlord(user[0].id);
        props.logout();
      } else {
        props.deleteTenant(user[0].id);
        props.logout();
      }
    }
  };
  // si n'est pas connecté <<<<<<
  if (!isLoggedIn) {
    return <Redirect to="../Connexion" />;
  }
  return (
    <Container>
      <h1>Profil</h1>
      <Container>
        <Row>
          <Col sm={2}>
            {user[0].gender == "M" ? (
              <img
                width="300"
                height="300"
                variant="top"
                src="https://www.pngall.com/wp-content/uploads/5/Profile-Transparent.png"
              />
            ) : (
              <img
                width="300"
                height="300"
                variant="top"
                src="https://cdn4.iconfinder.com/data/icons/avatars-21/512/avatar-circle-human-female-5-512.png"
              />
            )}
          </Col>
          <Col sm={2}></Col>
          <Col sm={8}>
            <Card>
              <Card.Header>
                <Row>
                  <Col sm={4}>
                    Profil {user[0].last_name}, {user[0].first_name}
                  </Col>
                  {AfficherName ? (
                    <>
                      <Col sm={4}></Col>
                      <Col sm={4}>
                        <div className="vr" />
                        <button
                          className="btn btn-outline-dark btn-block"
                          onClick={() => {
                            setAfficherName(false);
                          }}
                        >
                          <span>Modifier le nom complet</span>
                        </button>
                      </Col>
                    </>
                  ) : (
                    <>
                      <Form onSubmit={handleNomComplet} ref={form}>
                        <div className="form-group">
                          <label>Nom</label>
                          <Input
                            type="text"
                            className="form-control"
                            name="nom"
                            value={nomComplet.nom}
                            onChange={handleSetNomComplet}
                            validations={[required]}
                          />
                        </div>
                        <div className="form-group">
                          <label>Prenom</label>
                          <Input
                            type="text"
                            className="form-control"
                            name="prenom"
                            value={nomComplet.prenom}
                            onChange={handleSetNomComplet}
                            validations={[required]}
                          />
                        </div>
                        <div className="form-group">
                          <button className="btn btn-success btn-block">
                            <span>Modifier le nom complet</span>
                          </button>
                        </div>
                        <CheckButton
                          style={{ display: "none" }}
                          ref={checkBtn}
                        />
                      </Form>
                      <div className="form-group">
                        <button
                          className="btn btn-warning"
                          onClick={() => {
                            setAfficherName(true);
                          }}
                        >
                          <span>Annuler {"              "}</span>
                        </button>
                      </div>
                    </>
                  )}
                </Row>
              </Card.Header>
              <Card.Body>
                <Card.Text>
                  <Row>
                    <Col sm={4}>Nom d'utilisateur:</Col>
                    <Col sm={2}>{user[0].username}</Col>
                    <Col sm={4}>Type d'utilisateur:</Col>
                    <Col sm={2}>{type}</Col>
                  </Row>
                  <Row>
                    <Col sm={4}>Email:</Col>
                    <Col sm={4}>{user[0].mail_address}</Col>
                  </Row>
                  <Row>
                    <Col sm={4}>Date de naissance:</Col>
                    <Col sm={4}>{user[0].birth_date}</Col>
                  </Row>
                </Card.Text>
                {Afficher ? (
                  <button
                    className="btn btn-primary btn-block"
                    onClick={() => {
                      setAfficher(false);
                    }}
                  >
                    <span>Modifier mot de passe</span>
                  </button>
                ) : (
                  <>
                    <Form onSubmit={handlePassword} ref={form}>
                      <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <Input
                          type="password"
                          className="form-control"
                          name="password"
                          value={password}
                          onChange={onChangePassword}
                          validations={[required]}
                        />
                      </div>
                      <div className="form-group">
                        <button className="btn btn-success">
                          <span>Modifier</span>
                        </button>
                      </div>
                      <CheckButton style={{ display: "none" }} ref={checkBtn} />
                    </Form>
                    <div className="form-group">
                      <button
                        className="btn btn-warning"
                        onClick={() => {
                          setAfficher(true);
                        }}
                      >
                        <span>Annuler{"              "}</span>
                      </button>
                    </div>
                  </>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      {
        <Form onSubmit={handleDelete} ref={form}>
          <div className="form-group">
            <button className="btn btn-danger btn-block">
              <span>Supprimer le compte</span>
            </button>
          </div>
          <CheckButton style={{ display: "none" }} ref={checkBtn} />
        </Form>
      }
    </Container>
  );
}
export default connect(null, {
  editPassword: editPassword,
  editNomComplet: editNomComplet,
  deleteLandlord: deleteLandlord,
  editPasswordTenant: editPasswordTenant,
  editNomCompletTenant: editNomCompletTenant,
  deleteTenant: deleteTenant,
  currentUser: currentUser,
  logout: logout,
})(Profil);
