import { useState } from 'react';
import * as dicomService from '../../services/DicomImageService';
import LoadingComponent from '../LoadingComponent';

export default function DicomImageForm ({ dicomImage }: { dicomImage?: any }) {
    const [filename, setFilename] = useState(dicomImage?.filename || '');
    const [file, setFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    if (loading) return <LoadingComponent/>;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            if (!file && !dicomImage) {
                throw new Error('Please select a file');
            }

            if (dicomImage) {
                await dicomService.updateDicomImage(dicomImage.id, { filename });
            } else {
                const formData = new FormData();
                formData.append('file', file as File);
                formData.append('filename', filename);
                await dicomService.createDicomImage(formData);
            }
            window.location.href = '/';
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
            };

            return (
        <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
            {error && <div className="text-red-500 mb-4">{error}</div>}
            <form onSubmit={handleSubmit}>
                <div className="grid gap-4">
                    <div>
                        <label htmlFor="first-name"
                               className="block mb-2 text-sm font-medium text-gray-900 ">Nome do arquivo</label>
                        <input type="text" name="first-name" id="first-name"
                               className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                               placeholder="Nome do arquivo"
                               required={true}
                               value={filename}
                               onChange={(e) => setFilename(e.target.value)}/>
                    </div>
                    <div className="flex items-center justify-center w-full">
                        <label htmlFor="dropzone-file"
                               className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <svg className="w-8 h-8 mb-4 text-gray-500 " aria-hidden="true"
                                     xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                          stroke-width="2"
                                          d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                                </svg>
                                <p className="mb-2 text-sm text-gray-500"><span
                                    className="font-semibold">Clique para fazer upload</span> ou arraste e solte o arquivo</p>
                                <p className="text-xs text-gray-500">Apenas arquivos DCOM</p>
                                {file &&
                                    <p className="text-sm text-green-500 mt-2">Arquivo selecionado: {file.name}</p>}
                            </div>
                            <input
                                id="dropzone-file"
                                type="file"
                                className="hidden"
                                onChange={(e) => setFile(e.target.files?.[0] || null)}
                                accept=".dcm"
                            />
                        </label>
                    </div>
                </div>
                <button type="submit"
                        className="w-full justify-center inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-primary-200 :ring-primary-900 hover:bg-primary-800">
                    Adicionar exame
                </button>
            </form>
        </div>
    );
};