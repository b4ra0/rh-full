import DicomImageList from "./pages/dicomImageList.tsx";
import {NavBar} from "./components/navBar";
import {useState} from "react";

function App() {
    // const [mode, setMode] = useState('list');
    return (
        <App>
            <div className="p-4">
                {/*<NavBar/>*/}
                {/*<button onClick={() => setMode('list')}>Listar</button>*/}
                {/*<button onClick={() => setMode('add')}>Adicionar</button>*/}
                {/*{ mode === 'list' && <DicomImageList/>}*/}
                {/*{ mode === 'add' && <h1>Adicionar</h1>}*/}
            </div>
        </App>
    );
}

export default App;