import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {ToastProvider} from "./contexts/ToastProvider.jsx";

ReactDOM.createRoot(document.getElementById('root')).render(
    <ToastProvider>
        <App/>
    </ToastProvider>
)
