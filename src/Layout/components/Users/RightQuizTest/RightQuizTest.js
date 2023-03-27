import { useRef } from "react";

import CountDown from "./CountDown";
import "./RightQuizTest.scss";

const RightQuizTest = ({ dataQuiz, handleFinishQuiz, setCurrentQuestion }) => {
  const refDiv = useRef([]);

  const onTimeup = () => {
    handleFinishQuiz();
  };

  const getQuestion = (question) => {
    //check answer
    if (question && question.answer.length > 0) {
      let isAnswerSelected = question.answer.find((a) => a.isChecked === true);
      if (isAnswerSelected) {
        return "quiz-container-question selected";
      }
    }
    return "quiz-container-question";
  };

  const handleClickQuestion = (question, index) => {
    if (refDiv.current) {
      refDiv.current.forEach((item) => {
        if (item && item.className === "quiz-container-question clicked") {
          item.className = "quiz-container-question";
        }
      });
    }
    if (question && question.answer.length > 0) {
      let isAnswerSelected = question.answer.find((a) => a.isChecked === true);
      if (isAnswerSelected) {
        setCurrentQuestion(index);

        return;
      }
    }
    refDiv.current[index].className = "quiz-container-question clicked";
    setCurrentQuestion(index);
  };

  return (
    <>
      <div className="quiz-timer">
        <CountDown onTimeup={onTimeup} />
      </div>
      <div className="quiz-container-wrap">
        {dataQuiz.map((item, index) => (
          <div
            key={item.questionId}
            className={getQuestion(item)}
            onClick={() => handleClickQuestion(item, index)}
            ref={(element) => (refDiv.current[index] = element)}
          >
            {index + 1}
          </div>
        ))}
      </div>
    </>
  );
};

export default RightQuizTest;
