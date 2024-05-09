import { HOST } from "../../config/Config";
import axios from "axios";

async  function getDetailConversation(conservationId, tokenAccess) {
    const api = `${HOST}/conversations/detail/${conservationId}`;
    const code = await axios.get(api, {
        headers: {
            'Authorization': `Bearer ${tokenAccess}`
        },
    });
    return code;
}

export default getDetailConversation