import axios from "axios";
import { HOST } from "../../config/Config";

// cap nhat thong tin nguoi dung
export const UpdateProfile = async (userId, data, tokenAccess) => {
    const api = `${HOST}/users/edit-infor/${userId}`
    const code = await axios.post(api, data, {
        headers: {
            'Authorization': `Bearer ${tokenAccess}`
        },
    });
    return code;
};