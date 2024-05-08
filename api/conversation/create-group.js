import axios from "axios";
import { HOST } from "../../config/Config";

// tạo nhóm
export const createGroup = async (data, tokenAccess) => {
    const api = `${HOST}/conversations`;
    const code = await axios.post(api, data, {
        headers: {
            'Authorization': `Bearer ${tokenAccess}`
        },
    });
    return code;
};