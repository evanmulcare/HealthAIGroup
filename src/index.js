import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { AuthContextProvider } from './Contexts/AuthContext';
import { ContextProvider } from './Contexts/ContextProvider';

ReactDOM.render(
    <ContextProvider>
        <AuthContextProvider>
            <App />
        </AuthContextProvider>
    </ContextProvider>
   ,
    document.getElementById('root')
);

