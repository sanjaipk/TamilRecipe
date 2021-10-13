import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {AzureAD } from 'react-aad-msal';
import { authProvider } from './auth/authProvider';
    
import { store } from "./state/index";

const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');
const rootElement = document.getElementById('root');

ReactDOM.render(
    <Provider store={store}>
        <AzureAD
            provider={authProvider}
            reduxStore={store}
            forceLogin={true}>
            <BrowserRouter basename={baseUrl}>
                <App />
            </BrowserRouter>
        </AzureAD>
    </Provider>,
    rootElement);

registerServiceWorker();

