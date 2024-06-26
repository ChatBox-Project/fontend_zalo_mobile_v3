import AWS from "aws-sdk"
import { createParams } from "../util/function/MyFunction";

AWS.config.update({
    region: process.env.EXPO_PUBLIC_REGION,
    accessKeyId: process.env.EXPO_PUBLIC_ACCESSKEY,
    secretAccessKey: process.env.EXPO_PUBLIC_SECRETKEY,
})

const ETBA = new AWS.S3();

const upateImageToS3 = async (file, mineType) => {
    const params = await createParams(file, mineType);
    return await ETBA.upload(params).promise()
}

export { upateImageToS3 }