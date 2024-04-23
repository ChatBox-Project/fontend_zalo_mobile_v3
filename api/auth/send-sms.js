import axios from "axios";
import { HOST } from "../../config/Config";

export const SendSms = async (email) => {
  const api = `${HOST}/auth/send-sms`;
  // const api = `http://10.0.2.2:4000/api/auth/send-sms`;
  const send = await axios.post(api, { email: email });
  return send;
};
