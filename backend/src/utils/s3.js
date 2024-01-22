import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

import config from "../config/index.js";

const s3 = new S3Client({
  region: config.AWS.REGION,
  credentials: {
    accessKeyId: config.AWS.ACCESS_KEY_ID,
    secretAccessKey: config.AWS.SECRET_ACCESS_KEY,
  },
});

const BUCKET_NAME = config.AWS.BUCKET_NAME;
const REGION = config.AWS.REGION;

export default async function createPresignedPost({ key, contentType }) {
 
  const command = new PutObjectCommand({
    Bucket: BUCKET_NAME,
    Key: key,
    ContentType: contentType,
  });

  const fileLink = `https://${BUCKET_NAME}.s3.${REGION}.amazonaws.com/${key}`;

  const signedUrl = await getSignedUrl(s3, command, {
    expiresIn: 5 * 60,
  });

  return { fileLink, signedUrl };
}
