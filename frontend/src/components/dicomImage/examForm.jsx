const ExamForm = ({examToEdit, onSubmit, onCancel}) => {
    // Inicializa o estado do formulário com os dados do exame a ser editado ou vazio para um novo
    const [formData, setFormData] = useState(examToEdit || {
        patientName: '',
        patientId: '',
        modality: '',
        studyDate: '',
        description: '',
        imageUrl: `https://placehold.co/400x300/e0e0e0/000000?text=DICOM+Image`
    });

    // Manipulador de mudança de input
    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
    };

    // Manipulador de submit do formulário
    const handleSubmit = async (e) => {
        e.preventDefault();
        // Validação básica
        if (!formData.patientName || !formData.patientId || !formData.modality || !formData.studyDate) {
            showAlert('Por favor, preencha todos os campos obrigatórios: Nome do Paciente, ID do Paciente, Modalidade e Data do Estudo.');
            return;
        }
        onSubmit(formData); // Chama a função onSubmit passada pelo pai
    };

    return (
        <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-2xl mx-auto">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-6 text-center">
                {examToEdit ? 'Editar Exame' : 'Adicionar Novo Exame'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label htmlFor="patientName" className="block text-sm font-medium text-gray-700">Nome do
                        Paciente</label>
                    <input
                        type="text"
                        name="patientName"
                        id="patientName"
                        value={formData.patientName}
                        onChange={handleChange}
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="patientId" className="block text-sm font-medium text-gray-700">ID do
                        Paciente</label>
                    <input
                        type="text"
                        name="patientId"
                        id="patientId"
                        value={formData.patientId}
                        onChange={handleChange}
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="modality" className="block text-sm font-medium text-gray-700">Modalidade</label>
                    <input
                        type="text"
                        name="modality"
                        id="modality"
                        value={formData.modality}
                        onChange={handleChange}
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="studyDate" className="block text-sm font-medium text-gray-700">Data do
                        Estudo</label>
                    <input
                        type="date"
                        name="studyDate"
                        id="studyDate"
                        value={formData.studyDate}
                        onChange={handleChange}
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">Descrição</label>
                    <textarea
                        name="description"
                        id="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows="3"
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    ></textarea>
                </div>
                <input
                    type="hidden"
                    name="imageUrl"
                    value={formData.imageUrl}
                />

                <div className="flex justify-end space-x-4">
                    <button
                        type="button"
                        onClick={onCancel}
                        className="inline-flex justify-center py-2 px-6 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-300 ease-in-out"
                    >
                        Cancelar
                    </button>
                    <button
                        type="submit"
                        className="inline-flex justify-center py-2 px-6 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-300 ease-in-out"
                    >
                        {examToEdit ? 'Salvar Alterações' : 'Adicionar Exame'}
                    </button>
                </div>
            </form>
        </div>
    );
};