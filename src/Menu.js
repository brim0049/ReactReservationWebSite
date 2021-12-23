import React from "react";
import { Button, Navbar, Container, Nav } from "react-bootstrap";
import { HashRouter, Route, NavLink, Switch } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { connect, useSelector } from "react-redux";
//import { logout } from "./Components/Inscription/Action";
import {logout} from "./Services/service"
//Pages
import Accueil from "./Page/Accueil";
import Reservations from "./Page/Reservations";
import Connexion from "./Components/Connexion/Connexion";
import Inscription from "./Components/Inscription/Inscription";
import Profil from "./Page/Profil";
import NotFound from "./Page/NotFound";

function Menu(props) {
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const currentUser = useSelector((state) => state.user);
  /* const logoutButton = () => {
    props.dispatch(logout());
  }; */
  return (
    <HashRouter>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand to="/" exact replace as={NavLink}>
            <FaHome /> Accueil
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link to="/Reservations" replace as={NavLink}>
              {isLoggedIn ? "Reservations" : null}
            </Nav.Link>
            <Nav.Link to="/Profil" replace as={NavLink}>
              {isLoggedIn ? "Profil" : null}
            </Nav.Link>
          </Nav>
          <Nav className="justify-content-md-center">
            <Nav.Link to="/Connexion" replace as={NavLink}>
              {isLoggedIn ? currentUser[0].username : "Connexion"}
            </Nav.Link>
            <Nav.Link to="/Inscription" replace as={NavLink}>
              {isLoggedIn ? (
                <Button
                  onClick={() => {
                    //logoutButton();
                    props.logout();
                  }}
                >
                  Logout
                </Button>
              ) : (
                "Inscription"
              )}
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <Switch>
        <Route exact path="/" component={Accueil} />
        <Route path="/Reservations" component={Reservations} />
        <Route path="/Profil" component={Profil} />
        <Route path="/Connexion" component={Connexion} />
        <Route path="/Inscription" component={Inscription} />
        <Route component={NotFound} />
      </Switch>
    </HashRouter>
  );
}
/* const mapStateToProps = (state) => {
  return {
    state,
  };
}; */
export default connect(null,{logout:logout})(Menu);
