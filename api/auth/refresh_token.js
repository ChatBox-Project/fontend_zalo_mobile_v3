import axios from "axios";
import { HOST } from "../../config/Config";

export const RefreshToken = async () => {
  const api = `${HOST}/auth/refresh_token`;
  const refreshToken = await axios.post(api);
  return refreshToken;
};
