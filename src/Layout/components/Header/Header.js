import { NavLink, useNavigate } from "react-router-dom";
import classNames from "classnames/bind";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation, Trans } from "react-i18next";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

import styles from "./Header.scss";

import Button from "~/components/Button/Button";
import { postLogout } from "~/services/ApiServices";
import { doLogout } from "~/redux/action/userAction";
import Language from "./Language";

const cx = classNames.bind(styles);

const Header = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleLogin = () => {
    navigate("/login");
  };
  const handleSignup = () => {
    navigate("/signup");
  };
  // Redux
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const account = useSelector((state) => state.user.account);
  const dispatch = useDispatch();
  const handleLogout = async () => {
    let res = await postLogout(account.email, account.refresh_token);

    if (res && res.EC === 0) {
      // clear data Redux
      dispatch(doLogout());
      navigate("/login");
    }
  };

  return (
    <Navbar bg="light" expand="lg" className={cx("navbar")}>
      <Container>
        <NavLink to="/" className={cx("navbar-brand")}>
          {t("header.headerBrand")}
        </NavLink>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavLink to="/" className={cx("nav-link")}>
              {t("header.headerHome")}
            </NavLink>
            <NavLink to="/users" className={cx("nav-link")}>
              {t("header.headerUsers")}
            </NavLink>
            <NavLink to="/admin" className={cx("nav-link")}>
              {t("header.headerAdmin")}
            </NavLink>
          </Nav>
          <Nav>
            {isAuthenticated ? (
              <>
                <NavDropdown title="Setting" id="basic-nav-dropdown">
                  <NavDropdown.Item>Profile </NavDropdown.Item>
                  <NavDropdown.Item onClick={() => handleLogout()}>
                    Log out
                  </NavDropdown.Item>
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
            <Language />
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
