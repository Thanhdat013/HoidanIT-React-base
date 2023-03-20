import { NavLink, useNavigate } from "react-router-dom";
import classNames from "classnames/bind";
import { useSelector } from "react-redux";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

import styles from "./Header.scss";

import Button from "~/components/Button/Button";

const cx = classNames.bind(styles);

const Header = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };
  const handleSignup = () => {
    navigate("/signup");
  };
  // Redux
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const account = useSelector((state) => state.user.account);
  return (
    <Navbar bg="light" expand="lg" className={cx("navbar")}>
      <Container>
        <NavLink to="/" className={cx("navbar-brand")}>
          React-Bootstrap
        </NavLink>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavLink to="/" className={cx("nav-link")}>
              Home
            </NavLink>
            <NavLink to="/users" className={cx("nav-link")}>
              Users
            </NavLink>
            <NavLink to="/admin" className={cx("nav-link")}>
              Admin
            </NavLink>
          </Nav>
          <Nav>
            {isAuthenticated ? (
              <>
                <NavDropdown title="Setting" id="basic-nav-dropdown">
                  <NavDropdown.Item>Log out</NavDropdown.Item>
                  <NavDropdown.Item>Profile </NavDropdown.Item>
                </NavDropdown>
              </>
            ) : (
              <>
                <Button outline onClick={() => handleLogin()}>
                  Log in
                </Button>
                <Button primary onClick={() => handleSignup()}>
                  Sign up
                </Button>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
