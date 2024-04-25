import axios from "axios";
import { HOST } from "../../config/Config";

export const RequestAddFriend = async (userId, tokenAccess) => {
    const api = `${HOST}/users/request-add-friend/${userId}`;
    const code = await axios.post(api, {
        headers: {
            'Authorization': `Bearer ${tokenAccess}`
        }
    });
    return code;
};