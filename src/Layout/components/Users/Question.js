import _ from "lodash";

import "./DetailQuiz.scss";

const Question = ({ data, currentQuestion, handleCheckAnswer }) => {
  if (_.isEmpty(data)) {
    // check xem có phải mảng rỗng không vơi thư viện Lodash
    return <></>;
  }

  const handleCheckBox = (e, answerId, questionId) => {
    handleCheckAnswer(answerId, questionId);
  };

  return (
    <>
      <div className="image">
        {data.image ? (
          <img
            className="question-image"
            src={`data:image/jpeg;base64,${data.image} `}
          />
        ) : (
          <img
            className="question-image"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/2048px-No_image_available.svg.png"
          />
        )}
      </div>
      <div className="question">
        Question {currentQuestion + 1} : {data.questionDesc}
      </div>

      <div className="answer">
        {data.answer &&
          data.answer.map((item) => {
            return (
              <div key={item.id}>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    checked={item.isChecked}
                    onChange={(e) =>
                      handleCheckBox(e, item.id, data.questionId)
                    }
                  />
                  <label className="form-check-label">{item.description}</label>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default Question;
