import {
  CopyObjectCommand,
  DeleteObjectCommand,
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
  S3ClientConfig,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { RequestPresigningArguments } from "./../../node_modules/@smithy/types/dist-types/signature.d";

const s3ClientConfig: S3ClientConfig = {
  region: process.env.AWS_S3_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY as string,
    secretAccessKey: process.env.AWS_SECRET_KEY as string,
  },
};

export const s3ClientInstance = new S3Client(s3ClientConfig);

const PRESIGNED_OPTIONS: RequestPresigningArguments = {
  expiresIn: parseInt(process.env.AWS_PRESIGNED_EXPIRED_IN || "3600"),
};

export async function getPresignedUrl(
  command: GetObjectCommand | PutObjectCommand | DeleteObjectCommand,
): Promise<string | void> {
  try {
    const url = await getSignedUrl(
      s3ClientInstance,
      command,
      PRESIGNED_OPTIONS,
    );

    return url;
  } catch {
    // ADD LOGGER
  }
}

export async function copyS3FileService(
  filename: string,
  sourceFolder: string,
  destinationFolder: string,
): Promise<void> {
  const bucketName = process.env.AWS_S3_BUCKET_NAME;
  const source = [bucketName, sourceFolder, filename].join("/");
  const destination = [destinationFolder, filename].join("/");

  const copyCommand = new CopyObjectCommand({
    Bucket: bucketName,
    CopySource: source,
    Key: destination,
  });

  await s3ClientInstance.send(copyCommand);
}

export async function deleteS3FileService(Key: string): Promise<void> {
  const command = new DeleteObjectCommand({
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    Key,
  });

  await s3ClientInstance.send(command);
}

export async function createS3FileService(
  Key: string,
  Body: File,
): Promise<void> {
  const command = new PutObjectCommand({
    Bucket: process.env.AWS_S3_BUCKET_NAME as string,
    Key,
    Body,
  });

  await s3ClientInstance.send(command);
}
