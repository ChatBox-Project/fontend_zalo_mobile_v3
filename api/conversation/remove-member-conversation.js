import {HOST} from "../../config/Config";
import axios from "axios";

async function RemoveMember(memberId, data, tokenAccess) {
    const api = `${HOST}/conversations/delete-member/${memberId}`;
    const code = await axios.post(api, data,
        {
            headers: {
                'Authorization': `Bearer ${tokenAccess}`
            },
        });
    return code;
}

export default RemoveMember