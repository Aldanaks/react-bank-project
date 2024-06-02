import instance from ".";
import { storeToken } from "./storage";

const login = async (userInfo) => {
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

  const { data } = await instance.post(
    "/mini-project/api/auth/register",
    formData
  );
  if (data.token) {
    storeToken(data.token);
  }

  return data;
};

const getProfile = async () => {
  const { data } = await instance.get("/mini-project/api/auth/me");
  return data;
};

const getAllUsers = async () => {
  const { data } = await instance.get("/mini-project/api/auth/users");
  return data;
};

const getTrans = async () => {
  const { data } = await instance.get("/mini-project/api/transactions/my");
  return data;
};

const withdraw = async () => {
  const { data } = await instance.put(
    "'/mini-project/api/transactions/withdraw"
  );
  return data;
};

const deposit = async () => {
  const { data } = await instance.put(
    "//mini-project/api/transactions/deposit"
  );

  return data;
};

export {
  login,
  register,
  getProfile,
  getAllUsers,
  getTrans,
  deposit,
  withdraw,
};
