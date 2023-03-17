import React, { useState } from "react";
import axios from "axios";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import { FcPlus } from "react-icons/fc";

import { toast } from "react-toastify";

import { CreateNewUser } from "~/services/ApiServices";

function AddNewUser({ fetchListUsers }) {
  const [show, setShow] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [role, setRole] = useState("USER");
  const [avatar, setAvatar] = useState("");
  const [previewAvatar, setPreviewAvatar] = useState("");

  const handelPreviewAvatar = (e) => {
    if (e.target.files[0] !== undefined) {
      // check xem có file không
      setPreviewAvatar(URL.createObjectURL(e.target.files[0])); // tạo ra đường dẫn tạm
      setAvatar(e.target.files[0]);
      e.target.value = null;
      // e.target.value = null; // set cho value bằng null sau khi cọn ảnh, sửa bug onChange khi chọn liên tiếp 2 lần vào 1 ảnh thì giá trị không đổi
    }
  };

  const handleClose = () => {
    setShow(false);
    setEmail("");
    setPassword("");
    setUserName("");
    setRole("USER");
    setAvatar("");
    setPreviewAvatar("");
  };
  const handleShow = () => setShow(true);

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const handleSubmitCreateUser = async () => {
    // Validate
    const isValidEmail = validateEmail(email);
    if (!isValidEmail) {
      toast.error("Invalid email");
      return;
    }
    if (!password) {
      toast.error("Invalid password");
      return;
    }

    let data = await CreateNewUser(email, password, userName, role, avatar);

    if (data && data.EC === 0) {
      toast.success(data.EM);
      handleClose();
      await fetchListUsers();
    }

    if (data && data.EC !== 0) {
      toast.error(data.EM);
    }
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Add New User
      </Button>

      <Modal
        backdrop="static"
        show={show}
        onHide={handleClose}
        size="xl"
        className="modal-add-user"
      >
        <Modal.Header closeButton>
          <Modal.Title>Add New User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">UserName</label>
              <input
                type="text"
                className="form-control"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Role</label>
              <select
                className="form-select"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value={"USER"}>USER</option>
                <option value={"ADMIN"}>ADMIN</option>
              </select>
            </div>
            <div className="col-md-12">
              <label className="form-label upload-file" htmlFor="labelUpload">
                <FcPlus />
                Upload file image
              </label>
              <input
                type="file"
                hidden
                id="labelUpload"
                onChange={(e) => handelPreviewAvatar(e)}
              />
            </div>
            <div className="col-md-12 image-preview">
              {previewAvatar ? (
                <img src={previewAvatar} className="image" />
              ) : (
                <span>Preview image</span>
              )}
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleSubmitCreateUser()}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddNewUser;
