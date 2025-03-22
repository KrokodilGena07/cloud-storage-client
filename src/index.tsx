import React from 'react';
import ReactDOM from 'react-dom/client';
import AppRouter from '@/pages/AppRouter';
import './index.css';
import {BrowserRouter} from 'react-router-dom';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLDivElement
);
root.render(
    <BrowserRouter>
        <AppRouter/>
    </BrowserRouter>
);