import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import _ from "lodash";

import { getDataQuiz, postSubmitQuiz } from "~/services/ApiServices";

import "./DetailQuiz.scss";
import Button from "~/components/Button/Button";
import Question from "./Question";
import ModalResult from "./ModalResult";

const DetailQuiz = () => {
  const params = useParams();
  const location = useLocation(); // check được xem người dùng chuyển hường từ đâu sang
  const quizId = params.id;

  useEffect(() => {
    fetchQuestion();
  }, [quizId]);

  const [dataQuiz, setDataQuiz] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isShowModalResult, setIsShowModalResult] = useState(false);
  const [dataModalResult, setDataModalResult] = useState({});

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

            item.answers.isChecked = false;
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

  const handleFinishQuiz = async () => {
    if (dataQuiz && dataQuiz.length > 0) {
      let dataFinishSubmit = {
        quizId: +quizId,
        answers: [],
      };
      let answers = [];
      dataQuiz.forEach((item) => {
        let questionId = +item.questionId;
        let answerResult = [];
        item.answer.map((answerCheck) => {
          if (answerCheck.isChecked) answerResult.push(answerCheck.id);
        });
        answers.push({
          questionId: questionId,
          userAnswerId: answerResult,
        });
      });
      dataFinishSubmit.answers = answers;
      console.log(dataFinishSubmit);
      // Submit API
      let res = await postSubmitQuiz(dataFinishSubmit);
      console.log(res);
      if (res && res.EC === 0) {
        setDataModalResult({
          countCorrect: res.DT.countCorrect,
          countTotal: res.DT.countTotal,
          quizData: res.DT.quizData,
        });
        setIsShowModalResult(true);
      }
    }
  };

  const handleCheckAnswer = (answerId, questionId) => {
    let dataQuizClone = _.cloneDeep(dataQuiz);
    let question = dataQuizClone.find(
      (item) => +item.questionId === +questionId
    );
    if (question && question.answer) {
      let answerChecked = question.answer.map((item) => {
        if (+item.id === +answerId) {
          item.isChecked = !item.isChecked;
        }
        return item;
      });
      question.answer = answerChecked;
    }
    let index = dataQuizClone.findIndex(
      (item) => +item.questionId === +questionId // tìm đc cái index trong dataQuizClone mà nó đang được check hoặc uncheck
    );
    if (index > -1) {
      dataQuizClone[index] = question; // gán cái dataQuizClone có cái index đang được check hoặc uncheck giá trị item.isChecked
      setDataQuiz(dataQuizClone);
    }
  };

  return (
    <div className="quiz-container">
      <div className="quiz-left">
        <h2 className="quiz-left-title">Quiz : {location?.state?.quizTitle}</h2>
        <Question
          handleCheckAnswer={handleCheckAnswer}
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
          <Button
            className="btn-footer"
            outline
            onClick={() => handleFinishQuiz()}
          >
            Finish
          </Button>
        </div>
      </div>
      <div className="quiz-right">Count down</div>
      <ModalResult
        show={isShowModalResult}
        setShow={setIsShowModalResult}
        dataModalResult={dataModalResult}
      />
    </div>
  );
};

export default DetailQuiz;
