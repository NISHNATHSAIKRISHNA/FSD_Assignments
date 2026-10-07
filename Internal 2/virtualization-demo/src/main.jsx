import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './styles.css';

// NOTE: StrictMode is intentionally NOT used, so dev-mode double rendering
// does not distort the render-time measurements.
ReactDOM.createRoot(document.getElementById('root')).render(<App />);
