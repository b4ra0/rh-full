import {useEffect, useMemo, useState} from "react";
import * as dicomService from "../../services/DicomImageService";
import {DicomImage} from "../../models/DicomImage";
import DicomViewer from "./DicomViewer";
import LoadingComponent from "../LoadingComponent";

export default function ViewDicomImage({id}: { id: number; }) {
    const [dicomImage, setDicomImage] = useState<DicomImage | null>(null);
    const [file, setFile] = useState<Blob | null>(null);
    const [carregando, setCarregando] = useState(true);
    const imageUrl = useMemo(() => {
        if (file) {
            const objectUrl = URL.createObjectURL(file);
            return 'wadouri:' + objectUrl;
        }
        return '';
    }, [file]);

    useEffect(() => {
        return () => {
            if (imageUrl) {
                URL.revokeObjectURL(imageUrl);
            }
        };
    }, [imageUrl]);

    useEffect(() => {
        setCarregando(true);

        Promise.all([
            dicomService.getDicomImageById(10),
            dicomService.getDicomImageFileById(10)
        ])
            .then(([imageData, fileData]) => {
                setDicomImage(imageData);
                setFile(fileData);
            })
            .catch(error => console.error("Erro ao carregar DICOM:", error))
            .finally(() => setCarregando(false));
    }, [id]);

    if (carregando) {
        return <LoadingComponent/>;
    }
    return (
        // divida a tela em duas partes: uma para os detalhes da imagem e outra para o visualizador DICOM
        <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 p-4 bg-white">
                <h1 className="text-2xl font-bold mb-4">Detalhes da Imagem DICOM</h1>
                <div className="mb-4">
                    <strong>ID:</strong> {dicomImage?.id}
                </div>
                <div className="mb-4">
                    <strong>Nome do Arquivo:</strong> {dicomImage?.filename.replace('exames/', '')}
                </div>
                <div className="mb-4">
                    <strong>Tamanho do Arquivo:</strong> {file?.size} bytes
                </div>
                <div className="mb-4">
                    <strong>Data de Criação:</strong> {new Date(dicomImage?.createdAt || '').toLocaleString()}
                </div>

                <div className="flex items-center px-4 space-x-4">
                    <button type="button"
                            onClick={() => window.alert("Edit" + dicomImage?.id)}
                            className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                        <svg aria-hidden="true" className="mr-1 -ml-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                             xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"></path>
                            <path fill-rule="evenodd"
                                  d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                                  clip-rule="evenodd"></path>
                        </svg>
                        Edit
                    </button>
                    <button type="button"
                            className="inline-flex items-center text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900">
                        <svg aria-hidden="true" className="w-5 h-5 mr-1.5 -ml-1" fill="currentColor" viewBox="0 0 20 20"
                             xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd"
                                  d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                  clip-rule="evenodd"></path>
                        </svg>
                        Delete
                    </button>
                </div>

            </div>
            <div className="flex-1 p-4 bg-white rounded shadow justify-center">
                <DicomViewer imageUrl={imageUrl}/>
            </div>
        </div>

    )
        ;
}