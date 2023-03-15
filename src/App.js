import Header from "./components/Header/Header";
import { Outlet, Link } from "react-router-dom";

import "./App.scss";
const App = () => {
  return (
    <div className="App-container">
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
