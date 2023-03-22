import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import App from "./App";
import Admin from "~/Layout/components/Admin/Admin";
import Login from "~/Layout/components/Auth/Login";
import HomePage from "~/Layout/components/Home/HomePage";
import ManageUser from "./Layout/components/Admin/Content/ManageUsers/ManageUser";
import DashBoard from "./Layout/components/Admin/Content/ManageUsers/DashBoard";
import Register from "~/Layout/components/Auth/Register";
import ListQuiz from "~/Layout/components/Users/ListQuiz";
import DetailQuiz from "~/Layout/components/Users/DetailQuiz";
import ManageQuiz from "~/Layout/components/Admin/Content/ManageQuiz/ManageQuiz";

const Layout = () => {
  const NotFound = () => {
    return (
      <div className=" mt-3 alert alert-danger">
        404. Not found data with your URL{" "}
      </div>
    );
  };

  return (
    <>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="users" element={<ListQuiz />} />
        </Route>
        <Route path="/quiz/:id" element={<DetailQuiz />} />

        <Route path="/admin" element={<Admin />}>
          <Route index element={<DashBoard />} />
          <Route path="manage-user" element={<ManageUser />} />
          <Route path="manage-quizzes" element={<ManageQuiz />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route path="*/*" element={<NotFound />} />
      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
};

export default Layout;
