import React, { useState, useRef, useEffect } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { Form as Formulaire, Col, Row } from "react-bootstrap";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import {
  setTypeLandlord,
  setTypeTenant,
  isloggedin,
  logout,
  currentUser,
  getLandlords,
  getTenants,
} from "../../Services/service";
//verification input required
const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        Ce champ est obligatoire!
      </div>
    );
  }
};
//la fonction connexion
const Connexion = (props) => {
  //api
  useEffect(() => {
    props.getLandlords();
    props.getTenants();
  }, []);
//pour faire login for landlord avec les verifications
  const loginLandlords = (username, password) => {
    const _vUser = props.data.landlords.findIndex(
      (_item) => _item.username === username && _item.password === password
    );
    if (_vUser > -1) {
      const filteruser = props.data.landlords.filter(
        (utilisateur) =>
          utilisateur.username.indexOf(username) > -1 &&
          utilisateur.password.indexOf(password) > -1
      );
      props.isloggedin();
      props.setTypeLandlord();
      props.currentUser(filteruser);
    } else {
      setAfficher(false);
      props.logout();
    }
  };
//pour faire login pour tenant avec les verifications
  const loginTenant = (username, password) => {
    const _vUser = props.data.tenants.findIndex(
      (_item) => _item.username === username && _item.password === password
    );

    if (_vUser > -1) {
      const filteruser = props.data.tenants.filter(
        (utilisateur) =>
          utilisateur.username.indexOf(username) > -1 &&
          utilisateur.password.indexOf(password) > -1
      );
      props.isloggedin();
      props.setTypeTenant();
      props.currentUser(filteruser);
    } else {
      setAfficher(false);
      props.logout();
    }
  };
  //afficher  authentification incorrecte dans le cas d'erreur
  const [Afficher, setAfficher] = useState(true); 
   //get reference 
  const form = useRef();
  const checkBtn = useRef();
  //stTate local pour obtenir username password, type
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [typeConnexion, setTypeConnnesxion] = useState("");
  //
  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
    setAfficher(true);
  };
  //
  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
    setAfficher(true);
  };
  //
  const onChangeType = (e) => {
    const type = e.target.value;
    setTypeConnnesxion(type);
  };
  // button login 
  const handleLogin = (e) => {
    e.preventDefault();
    form.current.validateAll();
    if (checkBtn.current.context._errors.length === 0) {
      if (typeConnexion == "locateur") {
        loginLandlords(username, password);
      } else {
        if (typeConnexion == "locataire") {
          loginTenant(username, password);
        } else {
          setAfficher(false);
        }
      }
    }
  };
  //quand l'utilisateur est connecté >>> profil
  if (props.data.isLoggedIn) {
    return <Redirect to="../Profil" />;
  }
  return (
    <div>
      <h1>Connexion</h1>
      <div>
        <Row className="justify-Content-center">
          <Col></Col>
          <Col md="auto">
            <img
              width="150"
              height="150"
              variant="top"
              src="https://static.thenounproject.com/png/541486-200.png"
            />
          </Col>
          <Col></Col>
        </Row>
        <Row>
          <Col></Col>
          <Col>
            <Form onSubmit={handleLogin} ref={form}>
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <Input
                  type="text"
                  className="form-control"
                  name="username"
                  value={username}
                  onChange={onChangeUsername}
                  validations={[required]}
                />
              </div>

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
              <div>
                <Formulaire.Group as={Col} controlId="formGridState">
                  <Formulaire.Label>Type d'utilisateur</Formulaire.Label>
                  <Formulaire.Select
                    name="typeConnexion"
                    value={typeConnexion}
                    onChange={onChangeType}
                    validations={[required]}
                  >
                    <option value="...">Type d'utilisateur</option>
                    <option value="locataire">Locataire</option>
                    <option value="locateur">Locateur</option>
                  </Formulaire.Select>
                </Formulaire.Group>
              </div>
              <div className="form-group">
                <button className="btn btn-outline-dark btn-block">
                  <span>Login</span>
                </button>
              </div>
              <CheckButton style={{ display: "none" }} ref={checkBtn} />
            </Form>{" "}
            {Afficher ? <></> : <h6>Authentification incorrecte!</h6>}
          </Col>
          <Col></Col>
        </Row>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    data: state,
  };
};
export default connect(mapStateToProps, {
  getTenants: getTenants,
  getLandlords: getLandlords,
  isloggedin: isloggedin,
  logout: logout,
  currentUser: currentUser,
  setTypeTenant: setTypeTenant,
  setTypeLandlord: setTypeLandlord,
})(Connexion);
