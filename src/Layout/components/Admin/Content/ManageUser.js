import AddNewUser from "./AddNewUser";

import { useState, useEffect } from "react";

import { getAllUser } from "~/services/ApiServices";

import "./AddNewUser.scss";
import TableUser from "./TableUser";
import UpdateUser from "./UpdateUser";
import ViewDetailUser from "./ViewDetailUser";

function ManageUser() {
  const [listUser, setListUser] = useState([]);
  const [showListUpdateUser, setShowListUpdateUser] = useState(false);
  const [showViewDetailUser, setShowViewDetailUser] = useState(false);

  const [dataUpdateUser, setDataUpdateUser] = useState({});

  useEffect(() => {
    fetchListUsers();
  }, []);

  const fetchListUsers = async () => {
    let res = await getAllUser();
    if (res.EC === 0) {
      setListUser(res.DT);
    }
  };

  const handleClickUpdate = (user) => {
    setShowListUpdateUser(true);
    setDataUpdateUser(user);
  };
  const handleClickViewDetail = (user) => {
    setShowViewDetailUser(true);
    setDataUpdateUser(user);
  };

  return (
    <div className="manage-user-container">
      <div className="manage-user-title">Manage User</div>
      <div className="user-content"></div>
      <div>
        <AddNewUser fetchListUsers={fetchListUsers} />
      </div>
      <div className="user-table">
        <TableUser
          listUser={listUser}
          handleClickUpdate={handleClickUpdate}
          handleClickViewDetail={handleClickViewDetail}
        />
      </div>
      <UpdateUser
        show={showListUpdateUser}
        setShow={setShowListUpdateUser}
        fetchListUsers={fetchListUsers}
        dataUpdateUser={dataUpdateUser}
        setDataUpdateUser={setDataUpdateUser}
      />

      <ViewDetailUser
        show={showViewDetailUser}
        setShow={setShowViewDetailUser}
        dataUpdateUser={dataUpdateUser}
        setDataUpdateUser={setDataUpdateUser}
      />
    </div>
  );
}

export default ManageUser;
