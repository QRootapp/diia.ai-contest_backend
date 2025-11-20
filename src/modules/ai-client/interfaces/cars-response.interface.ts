export interface ICarInfo {
    plate: string;
    raw_text?: string;
    confidence: number;
}

export interface ICarsResponse {
    cars: ICarInfo[];
}
