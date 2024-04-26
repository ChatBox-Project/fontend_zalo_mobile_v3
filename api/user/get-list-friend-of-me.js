import axios from "axios";
import { HOST } from "../../config/Config";

// Lấy danh sách bạn bè của tôi
export const getListFriendOfMe = async (myUserId, tokenAccess) => {
    const api = `${HOST}/users/friends/${myUserId}`;
    const code = await axios.get(api, {
        headers: {
            'Authorization': `Bearer ${tokenAccess}`
        },
    });
    return code;
};