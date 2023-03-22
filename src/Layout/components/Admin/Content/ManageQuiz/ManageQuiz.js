import { useState, useEffect } from "react";

import { getAllQuiz } from "~/services/ApiServices";

import "./ManageQuiz.scss";
import Button from "~/components/Button/Button";
import AddNewQuiz from "./AddNewQuiz";
import TableQuizzes from "./TableQuizzes";

import DeleteQuiz from "./DeleteQuiz";

const ManageQuiz = () => {
  const [isShow, setIsShow] = useState(false);
  const [listQuiz, setListQuiz] = useState([]);

  const [showDeleteQuiz, setShowDeleteQuiz] = useState(false);
  const [dataDeleteQuiz, setDataDeleteQuiz] = useState({});

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
  return (
    <div className="quiz-add-container">
      <div className="quiz-add-heading">Manage Quizzes</div>

      <div>
        <TableQuizzes
          listQuiz={listQuiz}
          handleClickDeleteQuiz={handleClickDeleteQuiz}
        />
      </div>
      <div className="quiz-add-body">
        <Button primary onClick={() => handleShowAddNewQuiz()}>
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
    </div>
  );
};

export default ManageQuiz;
