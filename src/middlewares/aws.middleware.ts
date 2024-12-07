import { S3Client, PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3"
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { fromEnv } from "@aws-sdk/credential-provider-env"

const s3 = new S3Client({
    credentials: fromEnv(),
    region: process.env.AWS_REGION
})

const generateUploadUrl = async (bucket: string, key: string) => {
    const command = new PutObjectCommand({ Bucket: bucket, Key: key })
    return getSignedUrl(s3, command, { expiresIn: 3600 })
}

const deleteImageFromBucket = async (bucket: string, key: string) => {
    const command = new DeleteObjectCommand({ Bucket: bucket, Key: key })
    await s3.send(command);
}

export { s3, generateUploadUrl, deleteImageFromBucket }