import AddNewUser from "./AddNewUser";

function ManageUser() {
  return (
    <div className="manage-user-container">
      <div className="manage-user-title">Manage User</div>
      <div className="user-content"></div>
      <div>
        <AddNewUser />
      </div>
      <div>Table user</div>
    </div>
  );
}

export default ManageUser;
