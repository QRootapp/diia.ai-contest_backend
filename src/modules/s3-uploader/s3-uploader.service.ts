import { S3Client } from '@aws-sdk/client-s3';
import { Upload } from '@aws-sdk/lib-storage';

export class S3UploaderService {
    private readonly client: S3Client;
    private readonly bucket: string;

    constructor() {
        this.client = new S3Client({
            region: process.env.SPACES_REGION!,
            endpoint: process.env.SPACES_ENDPOINT!,
            credentials: {
                accessKeyId: process.env.SPACES_ACCESS_KEY_ID!,
                secretAccessKey: process.env.SPACES_SECRET_ACCESS_KEY!,
            },
            forcePathStyle: false,
        });
        this.bucket = process.env.SPACES_BUCKET!;
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
                ACL: 'public-read',
            },
        });

        await upload.done();

        return key;
    }
}
