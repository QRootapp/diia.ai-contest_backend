import { S3Client } from '@aws-sdk/client-s3';
import { Upload } from '@aws-sdk/lib-storage';

export class S3UploaderService {
    private readonly client: S3Client;
    private readonly bucket: string;

    constructor() {
        this.client = new S3Client({
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

        const upload = new Upload({
            client: this.client,
            params: {
                Bucket: this.bucket,
                Key: key,
                Body: file.buffer,
                ContentType: file.mimetype,
            },
        });

        await upload.done();

        return key;
    }

    public getPublicUrl(key: string): string {
        return `https://${this.bucket}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
    }
}
