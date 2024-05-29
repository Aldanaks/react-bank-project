import instance from ".";
import { storeToken } from "./storage";

const login = async (userInfo) => {
  console.log(userInfo);
  const { data } = await instance.post(
    "/mini-project/api/auth/login",
    userInfo
  );
  if (data.token) {
    storeToken(data.token);
  }
  return data;
};

const register = async (userInfo) => {
  const formData = new FormData();

  for (let key in userInfo) {
    formData.append(key, userInfo[key]);
  }
  console.log(userInfo);
  const { data } = await instance.post(
    "/mini-project/api/auth/register",
    formData
  );
  if (data.token) {
    storeToken(data.token);
  }

  return data;
};

const me = async () => {
  const { data } = await instance.get("/auth/me");
  return data;
};

const getAllUsers = async () => {
  const { data } = await instance.get("/auth/users");
  return data;
};

export { login, register, me, getAllUsers };
