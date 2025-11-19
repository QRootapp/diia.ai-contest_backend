import { ICarsResponse } from './interfaces';

export class AiClientService {
    public async getPhotoMetaData(image: Express.Multer.File): Promise<ICarsResponse> {
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
