import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode> {/* react does additionaly checks during development and
    it gives us warmings in the console */}
    <App />
  </React.StrictMode>
);