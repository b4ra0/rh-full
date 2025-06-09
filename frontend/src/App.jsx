import DicomImageList from "./pages/dicomImageList.tsx";
import {NavBar} from "./components/navBar";

function App() {
    return (
        <App>
            <div className="p-4">
                <NavBar/>
                <DicomImageList/>
            </div>
        </App>
    );
}

export default App;