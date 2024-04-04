import AWS from "aws-sdk"

AWS.config.update({
    region: process.env.REGION,
    accessKeyId: process.env.ACCESSKEY,
    secretAccessKey: process.env.SECRETKEY
})

const s3 = new AWS.S3();

export { s3 }