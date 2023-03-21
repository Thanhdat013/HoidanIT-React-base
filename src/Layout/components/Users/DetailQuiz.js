import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import _ from "lodash";

import { getDataQuiz } from "~/services/ApiServices";

import "./DetailQuiz.scss";
import Button from "~/components/Button/Button";
import Question from "./Question";

const DetailQuiz = () => {
  const params = useParams();
  const location = useLocation(); // check được xem người dùng chuyển hường từ đâu sang
  const quizId = params.id;

  useEffect(() => {
    fetchQuestion();
  }, [quizId]);

  const [dataQuiz, setDataQuiz] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const fetchQuestion = async () => {
    let res = await getDataQuiz(quizId);
    if (res && res.EC === 0) {
      let raw = res.DT;
      let data = _.chain(raw)
        // Group the elements of Array based on `color` property
        .groupBy("id")
        // `key` is group's name (color), `value` is the array of objects
        .map((value, key) => {
          let answer = [];
          let questionDesc,
            image = null;
          value.map((item, index) => {
            if (index === 0) {
              // để lấy ra giá trị của phần miêu tả và hình ảnh của câu hỏi
              questionDesc = item.description;
              image = item.image;
            }

            answer.push(item.answers);
          });
          return { questionId: key, answer, questionDesc, image };
        })
        .value();
      setDataQuiz(data);
    }
  };

  const handlePrev = () => {
    if (currentQuestion - 1 < 0) return;
    setCurrentQuestion(currentQuestion - 1);
  };

  const handleNext = () => {
    if (dataQuiz && dataQuiz.length > currentQuestion + 1)
      setCurrentQuestion(currentQuestion + 1);
  };

  return (
    <div className="quiz-container">
      <div className="quiz-left">
        <h2 className="quiz-left-title">Quiz : {location?.state?.quizTitle}</h2>
        <Question
          currentQuestion={currentQuestion}
          data={dataQuiz.length > 0 ? dataQuiz[currentQuestion] : []}
        />
        <div className="quiz-left-footer">
          <Button className="btn-footer" outline onClick={() => handlePrev()}>
            Prev
          </Button>
          <Button className="btn-footer" outline onClick={() => handleNext()}>
            Next
          </Button>
        </div>
      </div>
      <div className="quiz-right">Count down</div>
    </div>
  );
};

export default DetailQuiz;
