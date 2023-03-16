import classNames from "classnames/bind";

import styles from "./HomePage.scss";

import VideoHomePage from "~/assets/header_video.mp4";
import Button from "~/components/Button/Button";

const cx = classNames.bind(styles);

function HomePage() {
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
          <Button large primary className={cx("homepage-content-btn")}>
            Get started - it's free
          </Button>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
