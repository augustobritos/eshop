import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { getAwsConfig } from "../config/index.js";

export default async function createPresignedPost({ key, contentType }) {
  try {
    const config = await getAwsConfig();
    const BUCKET_NAME = process.env.BUCKET_NAME;
    const REGION = process.env.REGION;

    const s3 = new S3Client({
      region: REGION,
      credentials: {
        accessKeyId: config.AWS.ACCESS_KEY_ID,
        secretAccessKey: config.AWS.SECRET_ACCESS_KEY,
      },
    });

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
  } catch (error) {
    console.error("Error creating presigned post:", error);
    throw error;
  }
}
