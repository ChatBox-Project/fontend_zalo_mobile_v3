import axios from "axios";
import { HOST } from "../../config/Config";

// Đăng nhập
export const Login = async (phoneNumber, password) => {
  const api = `${HOST}/auth/login`;
  const login = await axios.post(api, { phoneNumber: phoneNumber, password: password });
  return login;
};
