const multer = require('multer');
const multerS3 = require('multer-s3');
const { S3Client } = require('@aws-sdk/client-s3');
const dotenv = require('dotenv');

dotenv.config();

// S3 client
const s3 = new S3Client({
  region: process.env.AWS_REGION,
  endpoint: process.env.AWS_URL,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.AWS_BUCKET_NAME,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    acl: 'public-read',
    key: function (req, file, cb) {
      const ext = file.originalname.split('.').pop();
      const fileName = `dictionary/${Date.now()}-${Math.round(Math.random() * 1e9)}.${ext}`;
      cb(null, fileName);
    },
  }),
  limits: { fileSize: 10 * 1024 * 1024 },
});

module.exports = upload;
