export interface PhotoMetaDto {
    latitude: number;
    longitude: number;
    createdAt: Date;
}

export interface CreateReportDto {
    photoMeta: PhotoMetaDto;
}
