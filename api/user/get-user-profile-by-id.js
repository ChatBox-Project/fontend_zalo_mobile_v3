import axios from "axios";
import { HOST } from "../../config/Config";

// Tìm kiem frofile nguoi dung theo id
export const getUserProfileById = async (myUserId, tokenAccess) => {
    const api = `${HOST}/users/profile/${myUserId}`;
    const code = await axios.get(api, {
        headers: {
            'Authorization': `Bearer ${tokenAccess}`
        }
    });
    return code;
};