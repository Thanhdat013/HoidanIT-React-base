import { useState, useEffect } from "react";

import "./ManageQuestions.scss";
import Button from "react-bootstrap/Button";

import AddNewQuestions from "./AddNewQuestions";

const ManageQuestions = () => {
  const [isShow, setIsShow] = useState(false);
  const [listQuiz, setListQuiz] = useState([]);

  return (
    <div className="quiz-add-container">
      <div className="quiz-add-heading">Manage Questions</div>

      <AddNewQuestions />
    </div>
  );
};

export default ManageQuestions;
