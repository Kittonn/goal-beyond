import axios from "axios";
import { RegisterI, LoginI } from "../interfaces/auth.interface";

const register = async (userData: RegisterI) => {
  const response = await axios.post(
    `${process.env.REACT_APP_API_URL}/users/`,
    userData
  );
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

const login = async (userData: LoginI) => {
  const response = await axios.post(
    `${process.env.REACT_APP_API_URL}/users/login`,
    userData
  );
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

const logout = () => {
  localStorage.removeItem("user");
};

export default { register, login, logout };
