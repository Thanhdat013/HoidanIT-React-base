import getAxios from "~/util/axiosCustomize";

// Users
export const CreateNewUser = (email, password, userName, role, avatar) => {
  // Call API submit data
  const data = new FormData();
  data.append("email", email);
  data.append("password", password);
  data.append("username", userName);
  data.append("role", role);
  data.append("avatar", avatar);

  return getAxios.post("v1/participant", data);
};

export const getAllUser = () => {
  return getAxios.get("v1/participant/all");
};

export const getUserWithPaginate = (page, limit) => {
  return getAxios.get(`v1/participant?page=${page}&limit=${limit}`);
};

export const putUpdateUser = (id, userName, role, avatar) => {
  const dataUpdate = new FormData();
  dataUpdate.append("id", id);
  dataUpdate.append("username", userName);
  dataUpdate.append("role", role);
  dataUpdate.append("userImage", avatar);

  return getAxios.put("v1/participant", dataUpdate);
};

export const deleteUser = (userId) => {
  return getAxios.delete("v1/participant", { data: { id: userId } });
};

export const getQuizByUser = () => {
  return getAxios.get("v1/quiz-by-participant");
};

// Login + Signup
export const postLogin = (email, password, delay) => {
  return getAxios.post("v1/login", {
    email,
    password,
    delay: 5000,
  });
};

export const postSignup = (email, password, username) => {
  return getAxios.post("v1/register", {
    email,
    password,
    username,
  });
};

// Quiz test
export const getDataQuiz = (id) => {
  return getAxios.get(`v1/questions-by-quiz?quizId=${id}`);
};

export const postSubmitQuiz = (data) => {
  return getAxios.post("v1/quiz-submit", { ...data });
};

export const createNewQuiz = (description, name, difficulty, quizImage) => {
  const data = new FormData();
  data.append("description", description);
  data.append("name", name);
  data.append("difficulty", difficulty);
  data.append("quizImage", quizImage);

  return getAxios.post("v1/quiz", data);
};
