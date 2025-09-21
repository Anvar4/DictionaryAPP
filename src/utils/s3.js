const { S3Client, PutObjectCommand, DeleteObjectCommand } = require('@aws-sdk/client-s3');
const {
  AWS_REGION,
  AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY,
  AWS_URL,
  AWS_BUCKET_NAME,
} = require('./secret');

const s3Client = new S3Client({
  region: AWS_REGION,
  endpoint: AWS_URL,
  credentials: { accessKeyId: AWS_ACCESS_KEY_ID, secretAccessKey: AWS_SECRET_ACCESS_KEY },
});

async function uploadFile(buffer, fileName, mimetype) {
  const params = {
    Bucket: AWS_BUCKET_NAME,
    Key: fileName,
    Body: buffer,
    ContentType: mimetype,
  };
  await s3Client.send(new PutObjectCommand(params));
  return `${AWS_URL}/${AWS_BUCKET_NAME}/${fileName}`;
}

async function deleteFileS3(location) {
  if (!location) return;
  const key = location.split(`${AWS_URL}/${AWS_BUCKET_NAME}/`)[1]; // masalan: dictionary/img1.jpg
  if (!key) return;
  await s3Client.send(new DeleteObjectCommand({ Bucket: AWS_BUCKET_NAME, Key: key }));
}

module.exports = { s3Client, uploadFile, deleteFileS3 };
