const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const {
  S3Client,
  GetObjectCommand,
  PutObjectCommand,
} = require("@aws-sdk/client-s3");

async function uploadImageToS3(file, key) {
  const s3client = new S3Client();

  return await s3client.send(
    new PutObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: key,
      Body: file.buffer,
    })
  );
}

async function getSignedS3Url(bucket, key, expires = 3600) {
  const client = new S3Client();
  const command = new GetObjectCommand({
    Bucket: bucket,
    Key: key,
  });
  return await getSignedUrl(client, command, { expiresIn: expires });
}

module.exports = {
    uploadImageToS3,
    getSignedS3Url
}