import AddNewUser from "./AddNewUser";

import "./AddNewUser.scss";

function ManageUser() {
  return (
    <div className="manage-user-container">
      <div className="manage-user-title">Manage User</div>
      <div className="user-content"></div>
      <div>
        <AddNewUser />
      </div>
      <div className="user-table">Table user</div>
    </div>
  );
}

export default ManageUser;
