import axios from "axios";
import { HOST } from "../../config/Config";

// Lấy danh sách user gửi lời mời kết bạn đến mình
export const getListUserRequestAddFriendToMe = async (myUserId, tokenAccess) => {
    const api = `${HOST}/users/get/user/request-make-friend/to/me/${myUserId}`;
    console.log(api)
    const code = await axios.get(api, {
        headers: {
            'Authorization': `Bearer ${tokenAccess}`
        },
    });
    return code;
};