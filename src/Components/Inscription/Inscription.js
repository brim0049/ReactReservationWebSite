import { Form as Formulaire, Button, Row, Col } from "react-bootstrap";
import React, { useState, useRef } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";
import { registerTenant, registerLandlord } from "../../Services/service";

//* Verification */
const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        Ce champ est obligatoire!
      </div>
    );
  }
};

const validEmail = (value) => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        Ceci n'est pas un email valide !
      </div>
    );
  }
};
const vusername = (value) => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        Le nom d'utilisateur doit comporter entre 3 et 20 caractères.
      </div>
    );
  }
};
const vpassword = (value) => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        Le mot de passe doit comporter entre 6 et 40 caractères.
      </div>
    );
  }
};

// fonction generale
function Inscription(props) {
  //get reference
  const form = useRef();
  const checkBtn = useRef();
  // state local
  const stateInput = {
    prenom: "",
    nom: "",
    username: "",
    email: "",
    password: "",
    passwordVerification: "",
    select: "",
    genre: "",
    birthday: "",
  };

  //set State
  const [formulaire, setForm] = useState(stateInput);

  //get all values input
  const handleSetForm = ({ target: { name, value } }) => {
    setForm({ ...formulaire, [name]: value });
  };

  //*pour connaitre si l'inscription => oki */
  const [successful, setSuccessful] = useState(false);
  //button d'inscription
  function handleRegister(e) {
    e.preventDefault();
    setSuccessful(false);
    form.current.validateAll();
    if (checkBtn.current.context._errors.length === 0) {
      setSuccessful(true);
      if (formulaire.select == "locateur") {
        props.registerLandlord(
          formulaire.prenom,
          formulaire.nom,
          formulaire.email,
          formulaire.birthday,
          formulaire.genre,
          formulaire.username,
          0,
          formulaire.password
        );
      } else {
        props.registerTenant(
          formulaire.prenom,
          formulaire.nom,
          formulaire.email,
          formulaire.birthday,
          formulaire.genre,
          formulaire.username,
          3000,
          formulaire.password
        );
      }
    }
  }
  //si inscription oki=> redirect vers login
  if (successful) {
    return <Redirect to="../Connexion/Connexion" />;
  }
  return (
    <div className="col-md-12">
      <h1> Inscription</h1>
      <Form onSubmit={handleRegister} ref={form}>
        <div>
          <Row>
            <Formulaire.Group as={Col}>
              <Formulaire.Label>Prénom</Formulaire.Label>
              <Input
                type="text"
                className="form-control"
                name="prenom"
                value={formulaire.prenom}
                onChange={handleSetForm}
                validations={[required]}
              />
            </Formulaire.Group>
            <Formulaire.Group as={Col}>
              <Formulaire.Label>Nom</Formulaire.Label>
              <Input
                type="text"
                className="form-control"
                name="nom"
                value={formulaire.nom}
                onChange={handleSetForm}
                validations={[required]}
              />
            </Formulaire.Group>
            <Formulaire.Group as={Col}>
              <Formulaire.Label>Date de naissance</Formulaire.Label>
              <Input
                type="date"
                className="form-control"
                name="birthday"
                value={formulaire.birthday}
                onChange={handleSetForm}
                validations={[required]}
              />
            </Formulaire.Group>
          </Row>
          <Row className="mb-3">
            <Formulaire.Group as={Col}>
              <Formulaire.Label htmlFor="username">Username</Formulaire.Label>
              <Input
                type="text"
                className="form-control"
                name="username"
                value={formulaire.username}
                onChange={handleSetForm}
                validations={[required, vusername]}
              />
            </Formulaire.Group>
            <Formulaire.Group as={Col}>
              <Formulaire.Label htmlFor="email">Email</Formulaire.Label>
              <Input
                type="text"
                className="form-control"
                name="email"
                value={formulaire.email}
                onChange={handleSetForm}
                validations={[required, validEmail]}
              />
            </Formulaire.Group>
          </Row>
          <Row>
            <Formulaire.Group as={Col}>
              <Formulaire.Label htmlFor="password">Password</Formulaire.Label>
              <Input
                type="password"
                className="form-control"
                name="password"
                value={formulaire.password}
                onChange={handleSetForm}
                validations={[required, vpassword]}
              />
            </Formulaire.Group>
            <Formulaire.Group as={Col}>
              <Formulaire.Label htmlFor="password">
                Password vérification
              </Formulaire.Label>
              <Input
                type="password"
                className="form-control"
                name="passwordVerification"
                value={formulaire.passwordVerification}
                onChange={handleSetForm}
                validations={[required, vpassword]}
              />
              {!(formulaire.password == formulaire.passwordVerification) ? (
                <div className="alert alert-danger" role="alert">
                  Le mot de passe n'est pas le même!
                </div>
              ) : null}
            </Formulaire.Group>
          </Row>
          <Row className="mb-3">
            <Formulaire.Group as={Col} controlId="formGridState">
              <Formulaire.Label>Type d'utilisateur</Formulaire.Label>
              <Formulaire.Select
                name="select"
                value={formulaire.select}
                onChange={handleSetForm}
                validations={[required]}
              >
                <option value="...">Type d'utilisateur</option>
                <option value="locataire">Locataire</option>
                <option value="locateur">Locateur</option>
              </Formulaire.Select>
            </Formulaire.Group>
            <Formulaire.Group as={Col} controlId="formGridState">
              <Formulaire.Label>Genre</Formulaire.Label>
              <Formulaire.Select
                name="genre"
                value={formulaire.genre}
                onChange={handleSetForm}
                validations={[required]}
              >
                <option value="...">Genre</option>
                <option value="M">Homme</option>
                <option value="F">Femme</option>
              </Formulaire.Select>
            </Formulaire.Group>
          </Row>
          <Button variant="outline-dark" type="submit">
            Inscrire
          </Button>
        </div>

        <CheckButton style={{ display: "none" }} ref={checkBtn} />
      </Form>
    </div>
  );
}
export default connect(null, {
  registerLandlord: registerLandlord,
  registerTenant: registerTenant,
})(Inscription);
