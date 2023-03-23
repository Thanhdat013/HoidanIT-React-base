import { useState, useEffect } from "react";

import { getAllQuiz } from "~/services/ApiServices";

import "./ManageQuiz.scss";
import Button from "react-bootstrap/Button";

import AddNewQuiz from "./AddNewQuiz";
import TableQuizzes from "./TableQuizzes";

import DeleteQuiz from "./DeleteQuiz";
import UpdateQuiz from "./UpdateQuiz";

const ManageQuiz = () => {
  const [isShow, setIsShow] = useState(false);
  const [listQuiz, setListQuiz] = useState([]);

  // set state delete quiz
  const [showDeleteQuiz, setShowDeleteQuiz] = useState(false);
  const [dataDeleteQuiz, setDataDeleteQuiz] = useState({});

  // set state update quiz
  const [showUpdateQuiz, setShowUpdateQuiz] = useState(false);
  const [dataUpdateQuiz, setDataUpdateQuiz] = useState({});

  useEffect(() => {
    fetchListQuiz();
  }, []);

  const fetchListQuiz = async () => {
    let res = await getAllQuiz();
    if (res.EC === 0) {
      setListQuiz(res.DT);
    }
  };

  const handleShowAddNewQuiz = () => {
    setIsShow(true);
  };
  const handleClickDeleteQuiz = (quiz) => {
    setShowDeleteQuiz(true);
    setDataDeleteQuiz(quiz);
  };

  const handleClickUpdateQuiz = (quiz) => {
    setShowUpdateQuiz(true);
    setDataUpdateQuiz(quiz);
  };

  return (
    <div className="quiz-add-container">
      <div className="quiz-add-heading">Manage Quizzes</div>

      <div>
        <TableQuizzes
          listQuiz={listQuiz}
          handleClickDeleteQuiz={handleClickDeleteQuiz}
          handleClickUpdateQuiz={handleClickUpdateQuiz}
        />
      </div>
      <div className="quiz-add-body">
        <Button
          className="btn btn-primary"
          onClick={() => handleShowAddNewQuiz()}
        >
          Add new quiz{" "}
        </Button>
      </div>
      <AddNewQuiz
        show={isShow}
        setShow={setIsShow}
        fetchListQuiz={fetchListQuiz}
      />
      <DeleteQuiz
        show={showDeleteQuiz}
        setShow={setShowDeleteQuiz}
        fetchListQuiz={fetchListQuiz}
        dataDeleteQuiz={dataDeleteQuiz}
      />
      <UpdateQuiz
        show={showUpdateQuiz}
        setShow={setShowUpdateQuiz}
        fetchListQuiz={fetchListQuiz}
        dataUpdateQuiz={dataUpdateQuiz}
        setDataUpdateQuiz={setDataUpdateQuiz}
      />
    </div>
  );
};

export default ManageQuiz;
