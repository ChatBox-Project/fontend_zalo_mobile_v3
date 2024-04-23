import axios from "axios";
import { HOST } from "../../config/Config";

export const Register = async (username, email, phoneNumber, password) => {
  const api = `${HOST}/auth/registers`;
  // const api = `http://10.0.2.2:4000/api/auth/register`;
  const register = await axios.post(api, {
    username: username,
    email: email,
    phoneNumber: phoneNumber,
    password: password,
  });
  return register;
};
