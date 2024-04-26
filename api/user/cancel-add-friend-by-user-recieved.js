import axios from "axios";
import { HOST } from "../../config/Config";

// Huy ket ban tu nguoi nhan
export const cancelAddFriendByUserRecieved = async (myUserId, userRecieve ,tokenAccess) => {
    const api = `${HOST}/users/denied-add-friend/${userRecieve}`;
    const code = await axios.post(api, {userId: myUserId}, {
        headers: {
            'Authorization': `Bearer ${tokenAccess}`
        },
    });
    return code;
};