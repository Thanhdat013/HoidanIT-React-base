import Select from "react-select";
import { useState } from "react";

import "./ManageQuiz.scss";
import Button from "~/components/Button/Button";
import AddNewQuiz from "./AddNewQuiz";

const ManageQuiz = () => {
  const [isShow, setIsShow] = useState(false);

  const handleShowAddNewQuiz = () => {
    setIsShow(true);
  };
  return (
    <div className="quiz-add-container">
      <div className="quiz-add-heading">Manage Quizzes</div>

      <div className="quiz-add-body">
        <Button primary onClick={() => handleShowAddNewQuiz()}>
          Add new quiz{" "}
        </Button>
      </div>
      <div>Table</div>
      <AddNewQuiz show={isShow} setShow={setIsShow} />
    </div>
  );
};

export default ManageQuiz;
