import axios from "~/util/axiosCustomize";

export const CreateNewUser = (email, password, userName, role, avatar) => {
  // Call API submit data
  const data = new FormData();
  data.append("email", email);
  data.append("password", password);
  data.append("username", userName);
  data.append("role", role);
  data.append("userImage", avatar);

  return axios.post("v1/participant", data);
};
