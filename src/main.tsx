import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import * as serviceWorker from './Server/services/serviceWorker'
import { makeServer } from './Server/server'

//serviceWorker.register();
const server = makeServer()
console.log(server)


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

serviceWorker.unregister();
