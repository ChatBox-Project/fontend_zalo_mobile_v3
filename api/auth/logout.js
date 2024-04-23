import axios from "axios";
import { HOST } from "../../config/Config";

export const Logout = async () => {
  const api = `${HOST}/auth/logout`;
  const logout = axios.post(api);
  return logout;
};
