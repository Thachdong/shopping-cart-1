"use server";

import { withServerAction } from "@/libs/hocs/with-server-action";
import { getPresignedUrl } from "@/services/s3-services";
import { GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";

// GET PUT URL ACTION
async function getUploadUrl(filename: string): Promise<string | void> {
  const command = new PutObjectCommand({
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    Key: [process.env.AWS_S3_TEMP_PATH, filename].join("/"),
  });

  return await getPresignedUrl(command);
}

export const getUploadUrlAction =
  withServerAction<typeof getUploadUrl>(getUploadUrl);

// GET GET URL ACTION
async function getFetchUrl(Key: string) {
  const command = new GetObjectCommand({
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    Key,
  });

  return await getPresignedUrl(command);
}

export const getFetchUrlAction =
  withServerAction<typeof getFetchUrl>(getFetchUrl);
