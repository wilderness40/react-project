import { BrowserRouter } from "react-router-dom";
import App from './App.js'
import { CookiesProvider } from 'react-cookie';

function Browser () {
    return (
        <CookiesProvider>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
        </CookiesProvider>
    )
}

export default Browser