import './App.css';
import Sidebar from "./layouts/sidebar/sidebar";

import AppRoutes from "./routes/routes";
import {BrowserRouter} from "react-router-dom";


function App() {
    return (
        <BrowserRouter>
            <div className="i-container">
                <Sidebar></Sidebar>
                <AppRoutes></AppRoutes>
            </div>
        </BrowserRouter>

    );
}

export default App;
