import { Response, NextFunction, Request } from "express"
import { generateUploadUrl } from '../middlewares/aws.middleware'
import { sendImageUrlToJavaBackend } from '../services/javaBackendService'

const getPresignedUrl = async (req: Request, res: Response, next: NextFunction) => {
    const { fileName } = req.body

    if (!fileName) {
        return res.status(400).json({ errorMessage: 'File name is required' })
    }

    const key = `${Date.now()}-${fileName}`

    try {
        const presignedUrl = await generateUploadUrl(process.env.AWS_S3_BUCKET_NAME!, key)

        const s3Url = `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`

        res.status(200).json({ presignedUrl, s3Url })

    } catch (error) {
        res.status(500).json({ errorMessage: 'Error generating presigned URL', error })
    }
}

const uploadImage = async (req: Request, res: Response, next: NextFunction) => {

    const { s3Url } = req.body

    if (!s3Url) {
        return res.status(400).json({ errorMessage: 'S3 URL is required' })
    }

    const { _id: owner } = req.payload

    try {
        await sendImageUrlToJavaBackend(s3Url, owner)
        res.status(201).json({ s3_url: s3Url })
    } catch (error) {
        res.status(500).json({ errorMessage: 'Error sending image URL to Java backend', error })
    }
}

export { getPresignedUrl, uploadImage }

