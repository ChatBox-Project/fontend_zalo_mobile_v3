import axios from "axios";
import { HOST } from "../../config/Config";

// Kiểm tra xem đã gửi yêu cầu kết bạn chưa
export const RequestAddFriendStatus = async (userIdRecieve, userIdSend, tokenAccess) => {
    const api = `${HOST}/users/request/status/${userIdRecieve}`;
    const code = await axios.get(api, {
        headers: {
            'Authorization': `Bearer ${tokenAccess}`
        },
        params: {
            userId: userIdSend
        }
    });
    return code;
};