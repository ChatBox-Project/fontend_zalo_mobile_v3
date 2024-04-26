import axios from "axios";
import { HOST } from "../../config/Config";

// Đổi mật khẩu
export const RefreshPassword = async (email, password) => {
  const api = `${HOST}/auth/reset-password`;
  const refreshpw = await axios.post(api, { email: email, password: password });
  return refreshpw;
};
