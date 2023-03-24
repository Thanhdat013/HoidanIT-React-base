import { useState, useEffect } from "react";
import Select from "react-select";
import React from "react";
import { v4 as uuidv4 } from "uuid";
import _ from "lodash";

import { FcPlus, FcMinus } from "react-icons/fc";
import { Button } from "react-bootstrap";

import {
  getAllQuiz,
  postCreateNewQuestion,
  postCreateNewAnswer,
} from "~/services/ApiServices";

const AddNewQuestions = () => {
  const [questions, setQuestions] = useState([
    {
      id: uuidv4(),
      description: "",
      image: "",
      imageName: "",
      answers: [
        {
          id: uuidv4(),
          description: "",
          isCorrect: false,
        },
      ],
    },
  ]);

  // add and remove questions
  const handleAddRemoveQuestion = (type, id) => {
    if (type === "ADD") {
      const newQuestion = {
        id: uuidv4(),
        description: "",
        image: "",
        imageName: "",
      };
      setQuestions([...questions, newQuestion]);
    }
    if (type === "REMOVE") {
      let questionClone = _.cloneDeep(questions);
      let removeQuestion = questionClone.filter(
        (question) => question.id !== id
      );

      setQuestions(removeQuestion);
    }
  };

  // add and remove answers
  const handleAddRemoveAnswer = (type, questionId, answerId) => {
    let questionClone = _.cloneDeep(questions);
    let index = questionClone.findIndex((item) => item.id === questionId);
    if (type === "ADD" && index > -1) {
      const newAnswer = {
        id: uuidv4(),
        description: "",
        isCorrect: false,
      };

      questionClone[index].answers.push(newAnswer);
      setQuestions(questionClone);
    }
    if (type === "REMOVE" && index > -1) {
      questionClone[index].answers = questionClone[index].answers.filter(
        (answer) => answer.id !== answerId
      );

      setQuestions(questionClone);
    }
  };

  // change value of question and answers
  const handleChangeQuestionAnswer = (type, e, questionId, answerId) => {
    let questionClone = _.cloneDeep(questions);
    let index = questionClone.findIndex((item) => item.id === questionId);
    if (type === "QUESTION") {
      questionClone[index].description = e.target.value;
      setQuestions(questionClone);
    }
    if (type === "ANSWER") {
      let indexAnswer = questionClone[index].answers.findIndex(
        (answer) => answer.id === answerId
      );
      questionClone[index].answers[indexAnswer].description = e.target.value;
      setQuestions(questionClone);
    }
  };

  // add + remove image for questions
  const handleAddImage = (e, questionId) => {
    let questionClone = _.cloneDeep(questions);
    let index = questionClone.findIndex((item) => item.id === questionId);
    if (e.target.files[0] !== undefined) {
      questionClone[index].image = e.target.files[0];
      setQuestions(questionClone);
    }
  };
  const handleRemoveImage = (questionId) => {
    let questionClone = _.cloneDeep(questions);
    let index = questionClone.findIndex((item) => item.id === questionId);

    questionClone[index].image = "";
    setQuestions(questionClone);
  };

  const [listQuiz, setListQuiz] = useState([]);
  const [selectedQuiz, setSelectedQuiz] = useState({});

  useEffect(() => {
    fetchListQuiz();
  }, []);

  const fetchListQuiz = async () => {
    let res = await getAllQuiz();
    if (res.EC === 0) {
      let quiz = res.DT.map((item) => {
        return {
          value: item.id,
          label: `${item.id} - ${item.name}`,
        };
      });
      setListQuiz(quiz);
    }
  };

  const handleSubmitQuestion = async () => {
    console.log("check submit", questions);

    await Promise.all(
      questions.map(async (question) => {
        const newQuestion = await postCreateNewQuestion(
          +selectedQuiz.value,
          question.description,
          question.image
        );

        await Promise.all(
          question.answers.map(async (answer) => {
            const newAnswer = await postCreateNewAnswer(
              answer.description,
              answer.isCorrect,
              newQuestion.DT.id
            );
          })
        );
      })
    );
  };

  return (
    <div className="question-container">
      <div className="select-quiz">
        <label className="form-label">Quiz type</label>
        <Select
          options={listQuiz}
          placeholder="Quiz type..."
          defaultValue={selectedQuiz}
          onChange={setSelectedQuiz}
        />
      </div>
      {questions &&
        questions.length > 0 &&
        questions.map((item) => {
          return (
            <div key={item.id} className="add-question-container mb-5">
              <div className="add-question-container-left">
                <form className="row g-3 questions-container-left ">
                  <div className="col-md-12  ">
                    <label className="form-label mb-3">Question</label>
                    <div className="question-body">
                      <input
                        value={item.description}
                        onChange={(e) =>
                          handleChangeQuestionAnswer("QUESTION", e, item.id)
                        }
                        type="text"
                        className="form-control"
                        placeholder="Add new question"
                      />
                      <div className="add-remove-icon">
                        <FcPlus
                          onClick={() => handleAddRemoveQuestion("ADD")}
                        />
                      </div>

                      {questions.length > 1 && (
                        <div className="add-remove-icon">
                          <FcMinus
                            onClick={() =>
                              handleAddRemoveQuestion("REMOVE", item.id)
                            }
                          />
                        </div>
                      )}
                    </div>
                  </div>
                  <label className="form-label mb-1 ">Answers</label>
                  {item.answers &&
                    item.answers.map((answer) => {
                      return (
                        <div key={answer.id} className="col-md-12 ">
                          <div className=" answer-container">
                            <input
                              className="answer-container-check"
                              type="checkbox"
                            />
                            <input
                              type="text"
                              className="form-control col-md-10 answer-container-text "
                              placeholder="Add new answer "
                              value={answer.description}
                              onChange={(e) =>
                                handleChangeQuestionAnswer(
                                  "ANSWER",
                                  e,
                                  item.id,
                                  answer.id
                                )
                              }
                            />
                            <div className="add-remove-icon">
                              <FcPlus
                                onClick={() =>
                                  handleAddRemoveAnswer("ADD", item.id)
                                }
                              />
                            </div>
                            {item.answers.length > 1 && (
                              <div className="add-remove-icon">
                                <FcMinus
                                  onClick={() =>
                                    handleAddRemoveAnswer(
                                      "REMOVE",
                                      item.id,
                                      answer.id
                                    )
                                  }
                                />
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                </form>
              </div>
              <div className="add-questions-container-right ">
                <form className="row g-3 questions-container-right ">
                  <div className="col-md-12">
                    <input
                      type="file"
                      hidden
                      id={`${item.id}`}
                      onChange={(e) => handleAddImage(e, item.id)}
                    />
                  </div>
                  <div className="col-md-12 image-preview">
                    {item.image ? (
                      <img
                        src={URL.createObjectURL(item.image)}
                        className="question-image"
                      />
                    ) : (
                      <span>Preview image</span>
                    )}
                  </div>
                  <div className="question-btn-image">
                    <label
                      className="form-label upload-file"
                      htmlFor={`${item.id}`}
                    >
                      <FcPlus />
                      Upload file image
                    </label>
                    <label
                      className="form-label upload-file"
                      onClick={() => handleRemoveImage(item.id)}
                    >
                      <FcMinus />
                      Remover file image
                    </label>
                  </div>
                </form>
              </div>
            </div>
          );
        })}
      {questions && questions.length > 0 && (
        <Button
          className="btn btn-warning"
          onClick={() => handleSubmitQuestion()}
        >
          Save questions
        </Button>
      )}
    </div>
  );
};

export default AddNewQuestions;
