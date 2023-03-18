import getAxios from "~/util/axiosCustomize";

export const CreateNewUser = (email, password, userName, role, avatar) => {
  // Call API submit data
  const data = new FormData();
  data.append("email", email);
  data.append("password", password);
  data.append("username", userName);
  data.append("role", role);
  data.append("userImage", avatar);

  return getAxios.post("v1/participant", data);
};

export const getAllUser = () => {
  return getAxios.get("v1/participant/all");
};

export const putUpdateUser = (id, userName, role, avatar) => {
  const dataUpdate = new FormData();
  dataUpdate.append("id", id);
  dataUpdate.append("username", userName);
  dataUpdate.append("role", role);
  dataUpdate.append("userImage", avatar);

  return getAxios.put("v1/participant", dataUpdate);
};
