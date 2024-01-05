import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import "./styles.css";

/**
 * Bootstrap
 */
import 'bootstrap/dist/css/bootstrap.min.css';

/**
 * Dépendances Font awesome
 */
import { library } from '@fortawesome/fontawesome-svg-core'
// import { fab } from '@fortawesome/free-brands-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'

library.add(fas)


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
