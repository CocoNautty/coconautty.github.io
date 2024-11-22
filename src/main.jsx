import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './styles/main.scss'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <a class="skip" href="#content">Skip to Content</a>
    <App />
  </StrictMode>
)