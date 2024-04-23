import axios from "axios";
import { HOST } from "../../config/Config";

export const ConfirmCode = async (code, email) => {
  const api = `${HOST}/auth/confirm_code`;
  const code1 = await axios.post(api, { code_verify: JSON.stringify(code), email: email });
  return code1;
};
