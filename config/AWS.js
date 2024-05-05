import AWS from "aws-sdk"
import { ACCESSKEY, REGION, SECRETKEY } from "./Config";
import { createParams } from "../util/function/MyFunction";

AWS.config.update({
    region: REGION,
    accessKeyId: ACCESSKEY,
    secretAccessKey: SECRETKEY
})

const ETBA = new AWS.S3();

const upateImageToS3 = async (file) => {
    const params = await createParams(file);
    return await ETBA.upload(params).promise()
}

export { upateImageToS3 }