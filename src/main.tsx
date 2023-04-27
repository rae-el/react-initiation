import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import * as serviceWorker from './serviceWorker'
import { makeServer } from './Server/server'

const server = makeServer()

//serviceWorker.register();


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

//serviceWorker.unregister();
serviceWorker.register({})
