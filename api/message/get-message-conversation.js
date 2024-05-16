import {HOST} from "../../config/Config";
import axios from "axios";

async function GetMessageConversation(conversationId, tokenAccess) {
    const api = `${HOST}/messages/${conversationId}`;
    const code = await axios.get(api,
        {
            headers: {
                'Authorization': `Bearer ${tokenAccess}`
            },
        });
    return code;
}

export default GetMessageConversation