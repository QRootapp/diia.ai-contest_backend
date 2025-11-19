import { S3 } from '@aws-sdk/client-s3';

export class S3UploaderService {
    private readonly client: S3;
    private readonly bucket: string;

    constructor() {
        this.client = new S3({
            region: process.env.AWS_REGION!,
            credentials: {
                accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
                secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
            },
        });
        this.bucket = process.env.AWS_BUCKET!;
    }

    public async uploadFile(file: Express.Multer.File, fileName: string): Promise<string> {
        const key = fileName;

        await this.client.putObject({
            Bucket: this.bucket,
            Key: key,
            Body: file.buffer,
            ContentType: file.mimetype,
        });

        return key;
    }

    public async getPublicUrl(key: string): Promise<string> {
        return `https://${this.bucket}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
    }
}
