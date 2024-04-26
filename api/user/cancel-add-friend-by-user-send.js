import axios from "axios";
import { HOST } from "../../config/Config";

// Huy ket ban tu nguoi gui ket ban
export const CancelAddFriendByUserSend = async (userIdSend, userIdRecieve, tokenAccess) => {
    const api = `${HOST}/users/cancel-add-friend/${userIdRecieve}`;
    const code = await axios.post(api, {userId: userIdSend}, {
        headers: {
            'Authorization': `Bearer ${tokenAccess}`
        },
    });
    return code;
};