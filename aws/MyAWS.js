import AWS from "aws-sdk"
import { ACCESSKEY, REGION, SECRETKEY } from "../config/Config";

AWS.config.update({
    region: REGION,
    accessKeyId: ACCESSKEY,
    secretAccessKey: SECRETKEY
})

const s3 = new AWS.S3();

function saveImage(params) {
    s3.upload(params, async (err, data) => {
        if (err) {
            console.error(err)
        } else {
            return data.Location
        }
    })
}

export { saveImage }