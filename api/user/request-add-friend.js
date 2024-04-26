import axios from "axios";
import {HOST} from "../../config/Config";

// axios.interceptors.request.use(request => {
//     console.log('Starting Request', JSON.stringify(request.headers, null, 2))
//     if (!request.headers['Authorization']) {
//         console.log('Authorization header is missing');
//     }
//     return request
// })

// Yêu cầu kết bạn
export const RequestAddFriend = async (userIdRecieve, userIdSend, tokenAccess) => {
    const api = `${HOST}/users/request-add-friend/${userIdRecieve}`;
    const code = await axios.post(api, {userId: userIdSend}, {
        headers: {
            'Authorization': `Bearer ${tokenAccess}`
        }
    });
    return code;
};