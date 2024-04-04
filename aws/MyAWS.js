import AWS from "aws-sdk"

AWS.config.update({
    region: process.env.REGION,
    accessKeyId: process.env.ACCESSKEY,
    secretAccessKey: process.env.SECRETKEY
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