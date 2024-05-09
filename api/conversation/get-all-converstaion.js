import axios from "axios";
import { HOST } from "../../config/Config";

// lay tat ca cuoc tro chuyen
export const getAllConverstaion = async (userId, tokenAccess) => {
    const api = `${HOST}/conversations/${userId}`;
    const code = await axios.get(api, {
        headers: {
            'Authorization': `Bearer ${tokenAccess}`
        },
    });
    return code;
};