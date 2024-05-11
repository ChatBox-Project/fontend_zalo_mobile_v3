import {HOST} from "../../config/Config";
import axios from "axios";

async function addMemberConversation(conservationId, userId, tokenAccess) {
    const api = `${HOST}/conversations/add-member-group/${conservationId}`;
    const code = await axios.post(api,
        {
            member: userId
        },
        {
            headers: {
                'Authorization': `Bearer ${tokenAccess}`
            },
        });
    return code;
}

export default addMemberConversation