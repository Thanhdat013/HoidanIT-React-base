import { useState } from "react";
import Select from "react-select";

import { FcPlus, FcMinus } from "react-icons/fc";

const AddNewQuestions = () => {
  const options = [
    { value: "EASY", label: "EASY" },
    { value: "MEDIUM", label: "MEDIUM" },
    { value: "HARD", label: "HARD" },
  ];

  const [image, setImage] = useState(null);
  const [previewAvatar, setPreviewAvatar] = useState("");

  const handelPreviewAvatar = (e) => {
    if (e.target.files[0] !== undefined) {
      // check xem có file không
      setPreviewAvatar(URL.createObjectURL(e.target.files[0])); // tạo ra đường dẫn tạm
      setImage(e.target.files[0]);
      e.target.value = null;
      // e.target.value = null; // set cho value bằng null sau khi cọn ảnh, sửa bug onChange khi chọn liên tiếp 2 lần vào 1 ảnh thì giá trị không đổi
    }
  };

  return (
    <>
      <div className="select-quiz">
        <label className="form-label">Quiz type</label>
        <Select options={options} placeholder="Quiz type..." />
      </div>
      <div className="add-question-container">
        <div className="add-question-container-left">
          Add new questions
          <form className="row g-3 questions-container-left mt-3 ">
            <div className="col-md-12">
              <label className="form-label">Question</label>
              <input
                type="text"
                className="form-control"
                placeholder="Add new question"
              />
            </div>
            <div className="col-md-12 ">
              <label className="form-label">Answers</label>
              <div className=" answer-container">
                <input className="answer-container-check" type="checkbox" />
                <input
                  type="text"
                  className="form-control col-md-10 answer-container-text "
                  placeholder="Add new answer "
                />
                <div className="answer-icon">
                  <FcPlus />
                </div>
                <div className="answer-icon">
                  <FcMinus />
                </div>
              </div>
            </div>
          </form>
        </div>
        <div className="add-questions-container-right ">
          Add new image
          <form className="row g-3 questions-container-right ">
            <div className="col-md-12">
              <input
                type="file"
                hidden
                id="labelUpload"
                onChange={(e) => handelPreviewAvatar(e)}
              />
            </div>
            <div className="col-md-12 image-preview">
              {previewAvatar ? (
                <img src={previewAvatar} className="question-image" />
              ) : (
                <span>Preview image</span>
              )}
            </div>
            <div className="question-btn-image">
              <label className="form-label upload-file" htmlFor="labelUpload">
                <FcPlus />
                Upload file image
              </label>
              <label className="form-label upload-file">
                <FcMinus />
                Remover file image
              </label>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddNewQuestions;
