// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './style.css'; // Импорт стилей

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);