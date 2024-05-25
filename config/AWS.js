import AWS from "aws-sdk"
import { createParams } from "../util/function/MyFunction";

AWS.config.update({
    region: process.env.REGION,
    accessKeyId: process.env.ACCESSKEY,
    secretAccessKey: process.env.SECRETKEY,
})

const ETBA = new AWS.S3();

const upateImageToS3 = async (file, mineType) => {
    const params = await createParams(file, mineType);
    return await ETBA.upload(params).promise()
}

export { upateImageToS3 }