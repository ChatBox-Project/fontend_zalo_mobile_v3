import AWS from "aws-sdk"
import { ACCESSKEY, REGION, SECRETKEY } from "../config/Config";

AWS.config.update({
    region: REGION,
    accessKeyId: ACCESSKEY,
    secretAccessKey: SECRETKEY
})

const ETBA = new AWS.S3();

export { ETBA }