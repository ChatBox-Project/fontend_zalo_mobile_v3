import axios from "axios";
import {HOST} from "../../config/Config";

axios.interceptors.request.use(request => {
    console.log('Starting Request', JSON.stringify(request.headers, null, 2))
    if (!request.headers['Authorization']) {
        console.log('Authorization header is missing');
    }
    return request
})

export const RequestAddFriend = async (userId, tokenAccess) => {
    const api = `${HOST}/users/request-add-friend/${userId}`;
    const code = await axios.post(api, {}, {
        headers: {
            'Authorization': `Bearer ${tokenAccess}`
        }
    });
    return code;
};