import axios from 'axios';
import { ICarsResponse } from './interfaces';
import FormData from 'form-data';

export class AiClientService {
    public async getPhotoMetaData(image: Express.Multer.File): Promise<ICarsResponse> {
        // const form = new FormData();
        // form.append('file', image.buffer, {
        //     filename: image.originalname,
        //     contentType: image.mimetype,
        // });

        // const response = await axios.post('http://host.docker.internal:8000/detect', form, {
        //     headers: {
        //         ...form.getHeaders(),
        //     },
        // });

        // return response.data;
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(this.getMockCars());
            }, 100);
        });
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
