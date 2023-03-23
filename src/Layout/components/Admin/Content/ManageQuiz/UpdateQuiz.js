import React, { useState, useEffect } from "react";
import Select from "react-select";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import { FcPlus } from "react-icons/fc";

import { toast } from "react-toastify";

import { putUpdateQuizForAdmin } from "~/services/ApiServices";

import _ from "lodash";

function UpdateQuiz({
  fetchListQuiz,
  show,
  setShow,
  dataUpdateQuiz,
  setDataUpdateQuiz,
}) {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [quizType, setQuizType] = useState("");
  const [image, setImage] = useState(null);
  const [previewAvatar, setPreviewAvatar] = useState("");

  const options = [
    { value: "EASY", label: "EASY" },
    { value: "MEDIUM", label: "MEDIUM" },
    { value: "HARD", label: "HARD" },
  ];

  const handelPreviewAvatar = (e) => {
    if (e.target.files[0] !== undefined) {
      setPreviewAvatar(URL.createObjectURL(e.target.files[0]));
      setImage(e.target.files[0]);
      e.target.value = null;
    }
  };

  useEffect(() => {
    if (!_.isEmpty(dataUpdateQuiz)) {
      // check xem nếu không phải là Object rỗng
      setName(dataUpdateQuiz.name);
      setDesc(dataUpdateQuiz.description);
      setQuizType(dataUpdateQuiz.difficulty);
      setImage("");
      if (dataUpdateQuiz.image) {
        setPreviewAvatar(`data:image/jpeg;base64,${dataUpdateQuiz.image}`);
      }
    }
  }, [dataUpdateQuiz]);

  const handleClose = () => {
    setShow(false);
    setName("");
    setDesc("");
    setQuizType("");
    setImage("");
    setPreviewAvatar("");
    setDataUpdateQuiz({}); // set lại cho data của user thành Object rỗng đễ k lỗi useEffect
  };

  const handleSubmitUpdateQuiz = async () => {
    let data = await putUpdateQuizForAdmin(
      dataUpdateQuiz?.id,
      desc,
      name,
      quizType?.value,
      image
    );
    if (data && data.EC === 0) {
      toast.success(data.EM);
      handleClose();
      await fetchListQuiz();
    }

    if (data && data.EC !== 0) {
      toast.error(data.EM);
    }
  };

  return (
    <>
      <Modal
        show={show}
        backdrop="static"
        onHide={handleClose}
        size="xl"
        className="modal-add-user"
      >
        <Modal.Header closeButton>
          <Modal.Title>Update Quiz</Modal.Title>
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
          <Button variant="primary" onClick={() => handleSubmitUpdateQuiz()}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default UpdateQuiz;
