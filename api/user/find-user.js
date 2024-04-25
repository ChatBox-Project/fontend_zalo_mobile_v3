import axios from "axios";
import { HOST } from "../../config/Config";

export const FindUser = async (phone, tokenAccess) => {
    const api = `${HOST}/users/phone/${phone}`;
    const code = await axios.get(api, {
        headers: {
            'Authorization': `Bearer ${tokenAccess}`
        }
    });
    return code;
};