import {HOST} from "../../config/Config";
import axios from "axios";

async function ChangeGroupName(conservationId, nameGroup, tokenAccess) {
    const api = `${HOST}/conversations/change-label/${conservationId}`;
    const code = await axios.put(api,
        {
            newLabel: nameGroup,
        },
        {
            headers: {
                'Authorization': `Bearer ${tokenAccess}`
            },
        });
    return code;
}

export default ChangeGroupName