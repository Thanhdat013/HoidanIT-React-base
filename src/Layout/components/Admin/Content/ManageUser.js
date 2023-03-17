import AddNewUser from "./AddNewUser";

import { useState, useEffect } from "react";

import { getAllUser } from "~/services/ApiServices";

import "./AddNewUser.scss";
import TableUser from "./TableUser";

function ManageUser() {
  const [listUser, setListUser] = useState([]);

  useEffect(() => {
    fetchListUsers();
  }, []);

  const fetchListUsers = async () => {
    let res = await getAllUser();
    if (res.EC === 0) {
      setListUser(res.DT);
    }
  };

  return (
    <div className="manage-user-container">
      <div className="manage-user-title">Manage User</div>
      <div className="user-content"></div>
      <div>
        <AddNewUser fetchListUsers={fetchListUsers} />
      </div>
      <div className="user-table">
        <TableUser listUser={listUser} />
      </div>
    </div>
  );
}

export default ManageUser;
