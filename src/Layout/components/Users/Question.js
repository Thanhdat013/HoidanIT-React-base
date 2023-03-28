import { useTranslation } from "react-i18next";
import _ from "lodash";
import { useState } from "react";
import Lightbox from "react-awesome-lightbox";
import "./DetailQuiz.scss";

const Question = ({ data, currentQuestion, handleCheckAnswer }) => {
  const [isPreviewImage, setIsPreviewImage] = useState(false);
  const { t } = useTranslation();

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
          <>
            <img
              onClick={() => setIsPreviewImage(true)}
              className="question-image"
              src={`data:image/jpeg;base64,${data.image} `}
            />
            {isPreviewImage === true && (
              <Lightbox
                image={`data:image/jpeg;base64,${data.image} `}
                onClose={() => setIsPreviewImage(false)}
              ></Lightbox>
            )}
          </>
        ) : (
          <>
            <img
              className="question-image"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/2048px-No_image_available.svg.png"
            />
            {isPreviewImage === true && (
              <Lightbox
                image={`data:image/jpeg;base64,${data.image} `}
                onClose={() => setIsPreviewImage(false)}
              ></Lightbox>
            )}
          </>
        )}
      </div>
      <div className="question">
        {t("question.question")} {currentQuestion + 1} : {data.questionDesc}
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
