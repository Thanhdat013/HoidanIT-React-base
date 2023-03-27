import "./Header.scss";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useTranslation, Trans } from "react-i18next";
const Language = () => {
  const { t, i18n } = useTranslation();

  const handleChangeLanguage = (languages) => {
    i18n.changeLanguage(languages);
  };
  return (
    <>
      <NavDropdown
        title={i18n.language === "en" ? "English" : "Việt Nam"}
        className="languages"
      >
        <NavDropdown.Item onClick={() => handleChangeLanguage("vi")}>
          Việt Nam{" "}
        </NavDropdown.Item>
        <NavDropdown.Item onClick={() => handleChangeLanguage("en")}>
          English
        </NavDropdown.Item>
      </NavDropdown>
    </>
  );
};

export default Language;
