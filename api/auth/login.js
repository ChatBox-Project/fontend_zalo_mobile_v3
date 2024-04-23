import axios from "axios";
import { HOST } from "../../config/Config";

export const Login = async (email, password) => {
  const api = `${HOST}/auth/login`;
  const login = await axios.post(api, { email: email, password: password });
  return login;
};
