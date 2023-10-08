import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { ContextProvider } from './Contexts/ContextProvider';
import { Provider } from 'react-redux';
import store from './Contexts/provider/store';
ReactDOM.render(
    <Provider store={store}>

        <ContextProvider>
            <App />
        </ContextProvider>
    </Provider>
    ,
    document.getElementById('root')
);

