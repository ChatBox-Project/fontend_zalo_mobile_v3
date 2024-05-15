import {HOST} from "../../config/Config";
import axios from "axios";

async function SaveMessage(data, tokenAccess) {
    const api = `${HOST}/messages/`;
    const code = await axios.post(api,
        {
            ...data
        },
        {
            headers: {
                'Authorization': `Bearer ${tokenAccess}`
            },
        });
    return code;
}

export default SaveMessage