import axios from "axios";
import { HOST } from "../../config/Config";

export const RequestAddFriendStatus = async (userId, tokenAccess) => {
    const api = `${HOST}/users/request/status/${userId}`;
    const code = await axios.get(api, {
        headers: {
            'Authorization': `Bearer ${tokenAccess}`
        }
    });
    return code;
};