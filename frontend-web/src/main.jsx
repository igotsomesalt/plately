import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from './App.jsx';
import './index.css';
import { AuthProvider } from './auth/AuthContext.jsx';
import { HouseholdProvider } from './household/HouseholdContext.jsx';
import 'bootstrap/dist/css/bootstrap.min.css'

createRoot(document.getElementById("root")).render(
    <BrowserRouter>
        <AuthProvider>
            <HouseholdProvider>
                <App />
            </HouseholdProvider>
        </AuthProvider>
    </BrowserRouter>
);