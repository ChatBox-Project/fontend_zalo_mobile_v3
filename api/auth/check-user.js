import axios from "axios";
import { HOST } from "../../config/Config";

export const CheckUser = async (phone, email) => {
  const api = `${HOST}/auth/confirm_code`;
  const code = await axios.post(api, { email: email, phoneNumber: phone });
  return code;
};
