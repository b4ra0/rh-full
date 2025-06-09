import {DicomImage} from "../models/DicomImage";
import {httpClient} from '../api/httpClient.ts';

export const getAllDicomImages = async (): Promise<DicomImage[]> => {
    const response = await httpClient.get('/dicom-images');
    return response.data;
};

export const getDicomImageById = async (id: string): Promise<DicomImage> => {
    const response = await httpClient.get(`/dicom-images/${id}`);
    return response.data;
};

export const createDicomImage = async (data: Partial<DicomImage>): Promise<DicomImage> => {
    const response = await httpClient.post('/dicom-images', data);
    return response.data;
};

export const updateDicomImage = async (id: string, data: Partial<DicomImage>): Promise<DicomImage> => {
    const response = await httpClient.put(`/dicom-images/${id}`, data);
    return response.data;
};

export const deleteDicomImage = async (id: string): Promise<void> => {
    await httpClient.delete(`/dicom-images/${id}`);
};