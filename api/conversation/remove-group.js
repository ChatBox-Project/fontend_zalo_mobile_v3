import {HOST} from "../../config/Config";
import axios from "axios";

async function RemoveGroup(conservationId, userId, tokenAccess) {
    const api = `${HOST}/conversations/delete-group/${conservationId}`;
    const code = await axios.post(api,
        {
            userId: userId
        },
        {
            headers: {
                'Authorization': `Bearer ${tokenAccess}`
            },
        });
    return code;
}

export default RemoveGroup