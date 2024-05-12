import {HOST} from "../../config/Config";
import axios from "axios";

// Hàm này dùng để rời khỏi nhóm
async function outGroup(conservationId, userId, tokenAccess) {
    const api = `${HOST}/conversations/out-group/${conservationId}`;
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

export default outGroup