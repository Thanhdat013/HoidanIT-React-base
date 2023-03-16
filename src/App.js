import Header from "~/Layout/components/Header/Header";
import { Outlet } from "react-router-dom";

import "./App.scss";
const App = () => {
  return (
    <div className="app-container">
      <div className="header-container">
        <Header />
      </div>
      <div className="main-content">
        <div className="sidebar-container"></div>
      </div>
      <div className="app-content">
        <Outlet />
      </div>
    </div>
  );
};

export default App;
