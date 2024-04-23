import axios from "axios";
import { HOST } from "../../config/Config";

export const SendSms = async (email) => {
  const api = `${HOST}/auth/send-sms`;
  const send = await axios.post(api, { email: email });
  return send;
};
