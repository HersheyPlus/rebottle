import { S3Client } from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";
import multer from 'multer';
import multerS3 from 'multer-s3';

const createS3Client = () => {
  try {
    return new S3Client({
      region: process.env.AWS_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      },
    });
  } catch (error) {
    console.error('Error creating S3 client:', error);
    throw error;
  }
};

const s3Client = createS3Client();

const upload = multer({
  storage: multerS3({
    s3: s3Client,
    bucket: process.env.S3_BUCKET_NAME,
    metadata: function (req, file, cb) {
      cb(null, {fieldName: file.fieldname});
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString() + '-' + file.originalname);
    }
  }),
  limits: { fileSize: 5 * 1024 * 1024 }
}).single('profileImage');

const handleUpload = (req, res, next) => {
  upload(req, res, function (error) {
    if (error instanceof multer.MulterError) {
      console.error('Multer error:', error);
      return res.status(400).json({ message: `Upload error: ${error.message}` });
    } else if (error) {
      console.error('Unknown upload error:', error);
      return res.status(500).json({ message: `Upload error: ${error.message}` });
    }
    next();
  });
};

export const uploadToS3 = async (file, key) => {
  try {
    const upload = new Upload({
      client: s3Client,
      params: {
        Bucket: process.env.S3_BUCKET_NAME,
        Key: key,
        Body: file,
      },
    });

    return await upload.done();
  } catch (error) {
    console.error('Error in uploadToS3:', error);
    throw error;
  }
};

export { handleUpload };