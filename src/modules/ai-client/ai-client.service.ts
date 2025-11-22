import axios from 'axios';
import { ICarsResponse } from './interfaces';
import FormData from 'form-data';

export class AiClientService {
    public async getPhotoMetaData(image: Express.Multer.File): Promise<ICarsResponse> {
        const form = new FormData();
        form.append('file', image.buffer, {
            filename: image.originalname,
            contentType: image.mimetype,
        });

        const response: ICarsResponse = await axios.post('https://target-service.com/upload', form, {
            headers: {
                ...form.getHeaders(),
            },
        });

        return response;
    }

    private getMockCars() {
        return {
            cars: [
                {
                    plate: 'KI1111YD',
                    raw_text: 'KI1111YD',
                    confidence: 99.5,
                },
            ],
        };
    }
}
