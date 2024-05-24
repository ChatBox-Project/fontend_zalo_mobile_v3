import axios from "axios";
import { HOST } from "../../config/Config";

// Lấy danh sách user gửi lời mời kết bạn đến mình
export const getListUserRequestAddFriendOfMe = async (myUserId, tokenAccess) => {
    const api = `${HOST}/users/get-list-user-send-request-add-friend-of-me/${myUserId}`;
    // console.log(api)
    const code = await axios.get(api, {
        headers: {
            'Authorization': `Bearer ${tokenAccess}`
        },
    });
    return code;
};