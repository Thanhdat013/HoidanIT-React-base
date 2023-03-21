import classNames from "classnames/bind";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import styles from "./HomePage.scss";

import VideoHomePage from "~/assets/header_video.mp4";
import Button from "~/components/Button/Button";

const cx = classNames.bind(styles);

function HomePage() {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const navigate = useNavigate();

  return (
    <div className="homepage-container">
      <video className={cx("video")} autoPlay loop muted>
        <source src={VideoHomePage} type="video/mp4" />
      </video>
      <div className={cx("homepage-content")}>
        <h1 className={cx("title")}>There's a better way to ask</h1>
        <p className={cx("desc")}>
          You don't want to make a boring form. And your audience won't answer
          one. Create a typeform instead—and make everyone happy.
        </p>
        <div>
          {isAuthenticated === false ? (
            <Button
              large
              primary
              className={cx("homepage-content-btn")}
              onClick={() => navigate("/login")}
            >
              Get started - it's free
            </Button>
          ) : (
            <Button
              large
              primary
              className={cx("homepage-content-btn")}
              onClick={() => navigate("/users")}
            >
              Doing Quiz Now !
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
