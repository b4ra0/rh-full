import {useEffect, useState} from 'react';
import {DicomImage} from '../models/DicomImage.ts';
import * as dicomService from '../services/dicomImageService.ts';
import {NavBar} from "../components/navBar.tsx";
import DicomViewer from "../components/dicomViewer";

export default function DicomImageList() {
    const [images, setImages] = useState<DicomImage[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        dicomService.getAllDicomImages()
            .then(setImages)
            .finally(() => setLoading(false));
    }, []);

    const handleDelete = async (id: string) => {
        await dicomService.deleteDicomImage(id);
        setImages(prev => prev.filter(img => img.id.toString() !== id));
    };

    return (
        <div>
            <div className={"flex justify-center items-center pt-8"}>
                <h1 className="text-xl font-bold mb-4 ">Imagens DICOM</h1>
            </div>
            <ul className="space-y-2">
                {images.map((img) => (
                    <li key={img.id} className="border p-4 rounded shadow">
                        <p><strong>Paciente:</strong> {img.filename}</p>
                        <p><strong>Data do Estudo:</strong> {img.createdAt.toString()}</p>
                        <p><strong>Modalidade:</strong> {img.filename}</p>
                        <img src={img.filename} alt="DICOM" className="w-64 mt-2"/>
                        <button
                            onClick={() => handleDelete(img.id.toString())}
                            className="mt-2 text-red-500 hover:underline"
                        >
                            Deletar
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
