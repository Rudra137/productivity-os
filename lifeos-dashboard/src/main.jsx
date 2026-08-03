import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

console.log("MAIN ENV:", import.meta.env);
console.log("MAIN API:", import.meta.env.VITE_FIREBASE_API_KEY);
console.log("MAIN AUTH DOMAIN:", import.meta.env.VITE_FIREBASE_AUTH_DOMAIN);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
