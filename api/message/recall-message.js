import {HOST} from "../../config/Config";
import axios from "axios";

async function RecallMessage(keyV4, message, tokenAccess) {
    const api = `${HOST}/messages/recall/message/${keyV4}`;
    const code = await axios.post(api,
        {
            message: message
        },
        {
            headers: {
                'Authorization': `Bearer ${tokenAccess}`
            },
        });
    return code;
}

export default RecallMessage