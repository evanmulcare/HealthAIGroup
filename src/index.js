import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import store from './Contexts/provider/store';
import { registerLicense } from '@syncfusion/ej2-base';

registerLicense('ORg4AjUWIQA/Gnt2V1hhQlJAfV5AQmBIYVp/TGpJfl96cVxMZVVBJAtUQF1hSn5adkFjWnpedHFQQWJV');
const root = ReactDOM.createRoot(document.getElementById('root'));


root.render(
    <Provider store={store}>
      <App />
    </Provider>
  );