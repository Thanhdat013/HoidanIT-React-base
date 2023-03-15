import VideoHomePage from "../../assets/header_video.mp4";

function HomePage() {
  return (
    <div className="homepage-container">
      <video className="" autoPlay loop muted>
        <source src={VideoHomePage} type="video/mp4" />
      </video>
    </div>
  );
}

export default HomePage;
