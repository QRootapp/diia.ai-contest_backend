export interface ICarInfo {
    plate: string;
    raw_text?: string;
    confidence: number;
}

export interface ICarInfoRes {
    confidence: number | null;
    plate: string | null;
}
export interface ICarsResponse {
    cars: ICarInfo[];
}
