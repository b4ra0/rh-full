import {useEffect, useState} from 'react';
import {DicomImage} from '../../models/DicomImage.js';
import * as dicomService from '../../services/DicomImageService';
import TableDicomImage from "../../components/dicomImage/TableDicomImage";
import ViewDicomImage from "../../components/dicomImage/ViewDicomImage";
import { Link } from 'react-router-dom';

export default function DicomImageList() {
    const [images, setImages] = useState<DicomImage[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        dicomService.getAllDicomImages()
            .then(setImages)
            .finally(() => setLoading(false));
    }, []);


    return (
        <div>
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold mb-4">Lista de Imagens DICOM</h1>
                <Link to="/dicom-image/new">
                    <button
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                        Adicionar Imagem DICOM
                    </button>
                </Link>
            </div>
            <TableDicomImage loading={loading} images={images}/>
        </div>);

}
