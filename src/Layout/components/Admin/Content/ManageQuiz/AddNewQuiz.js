import { useState } from "react";
import Select from "react-select";

import { createNewQuiz } from "~/services/ApiServices";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";

import { FcPlus } from "react-icons/fc";

import "./ManageQuiz.scss";

const AddNewQuiz = ({ show, setShow }) => {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [quizType, setQuizType] = useState("");
  const [image, setImage] = useState(null);
  const [previewAvatar, setPreviewAvatar] = useState("");

  const handleSubmitCreateQuiz = async () => {
    if (!quizType?.value) {
      toast.error("Invalid difficult");
      return;
    }
    let data = await createNewQuiz(desc, name, quizType?.value, image);
    console.log(data);
    if (data && data.EC === 0) {
      toast.success(data.EM);
      handleClose();
    }

    if (data && data.EC !== 0) {
      toast.error(data.EM);
    }
  };

  const handleClose = () => {
    setShow(false);
    setName("");
    setDesc("");
    setQuizType("");
    setImage("");
    setPreviewAvatar("");
  };

  const handelPreviewAvatar = (e) => {
    if (e.target.files[0] !== undefined) {
      // check xem có file không
      setPreviewAvatar(URL.createObjectURL(e.target.files[0])); // tạo ra đường dẫn tạm
      setImage(e.target.files[0]);
      e.target.value = null;
      // e.target.value = null; // set cho value bằng null sau khi cọn ảnh, sửa bug onChange khi chọn liên tiếp 2 lần vào 1 ảnh thì giá trị không đổi
    }
  };

  const options = [
    { value: "EASY", label: "EASY" },
    { value: "MEDIUM", label: "MEDIUM" },
    { value: "HARD", label: "HARD" },
  ];

  return (
    <Modal
      backdrop="static"
      show={show}
      onHide={handleClose}
      size="xl"
      className="modal-add-user"
    >
      <Modal.Header closeButton>
        <Modal.Title>Add New Quiz</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form className="row g-3">
          <div className="col-md-12">
            <label className="form-label">Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Name quiz"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="col-md-12">
            <label className="form-label">Description</label>
            <input
              type="text"
              className="form-control"
              placeholder="Description"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />
          </div>

          <div className="col-md-12">
            <label className="form-label">Quiz type</label>
            <Select
              options={options}
              placeholder="Quiz type..."
              defaultValue={quizType}
              onChange={setQuizType}
            />
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
              <img src={previewAvatar} className="quiz-image" />
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
        <Button variant="primary" onClick={() => handleSubmitCreateQuiz()}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddNewQuiz;