import axios from "axios";
import { HOST } from "../../config/Config";


// Đăng ký
export const Register = async (username, email, phoneNumber, password) => {
  const api = `${HOST}/auth/register`;
  // const api = `http://10.0.2.2:4000/api/auth/register`;
  const register = await axios.post(api, {
    username: username,
    phoneNumber: phoneNumber,
    password: password,
    email: email,
  });

  console.log(register);
  return register;
};
