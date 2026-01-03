import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import AppRoutes from './routes';

function App() {
    return (
        <BrowserRouter>
            <Toaster
                position="top-right"
                toastOptions={{
                    duration: 3000,
                    style: {
                        background: '#1a1f16',
                        color: '#e8f5e9',
                        border: '1px solid #2d3a24',
                    },
                    success: {
                        iconTheme: {
                            primary: '#c9d862',
                            secondary: '#1a1f16',
                        },
                    },
                    error: {
                        iconTheme: {
                            primary: '#ef4444',
                            secondary: '#1a1f16',
                        },
                    },
                }}
            />
            <AppRoutes />
        </BrowserRouter>
    );
}

export default App;
