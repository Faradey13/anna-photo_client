import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './styles/index.scss'
import {BrowserRouter} from "react-router-dom";
import '../shared/lib/i18n/i18n';
import ThemeProvider from "./providers/ThemeProvider/ThemeProvider.tsx";
import {SmootherProvider} from "./providers/gsapContext/gsapContext.tsx";

ReactDOM.createRoot(document.getElementById('root')!).render(
    // <React.StrictMode>
    <BrowserRouter>
        <SmootherProvider>
            <ThemeProvider>
                <App/>
            </ThemeProvider>
        </SmootherProvider>
    </BrowserRouter>
    // {/*</React.StrictMode>,*/}
)
