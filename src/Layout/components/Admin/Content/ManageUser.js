import AddNewUser from "./AddNewUser";

import "./AddNewUser.scss";
import TableUser from "./TableUser";

function ManageUser() {
  return (
    <div className="manage-user-container">
      <div className="manage-user-title">Manage User</div>
      <div className="user-content"></div>
      <div>
        <AddNewUser />
      </div>
      <div className="user-table">
        <TableUser />
      </div>
    </div>
  );
}

export default ManageUser;
