import axios from "axios";
import { HOST } from "../../config/Config";

// Hủy kết bạn
export const Unfriend = async (userIdSend, userIdRecieve, tokenAccess) => {
    const api = `${HOST}/users/unfriend/${userIdRecieve}`;
    const code = await axios.post(api, {userId: userIdSend}, {
        headers: {
            'Authorization': `Bearer ${tokenAccess}`
        },
    });
    return Unfriend;
};