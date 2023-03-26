import CountDown from "./CountDown";
import "./RightQuizTest.scss";

const RightQuizTest = ({ dataQuiz, handleFinishQuiz }) => {
  const onTimeup = () => {
    handleFinishQuiz();
  };
  return (
    <>
      <div className="quiz-timer">
        <CountDown onTimeup={onTimeup} />
      </div>
      <div className="quiz-container-wrap">
        {dataQuiz.map((item, index) => (
          <div key={item.questionId} className="quiz-container-question">
            {index + 1}
          </div>
        ))}
      </div>
    </>
  );
};

export default RightQuizTest;
