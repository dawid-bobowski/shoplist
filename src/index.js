import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import ProvideList from './providers/ProvideList';

ReactDOM.render(
    <React.StrictMode>
        <ProvideList>
            <App />
        </ProvideList>
    </React.StrictMode>,
    document.getElementById('root')
);
