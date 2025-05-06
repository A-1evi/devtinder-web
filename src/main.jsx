import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { PersistGate } from 'redux-persist/integration/react'
import appStore, { persistor } from './utils/Store/appStore.js'
import { Provider } from 'react-redux'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={appStore}>
    <PersistGate loading={null} persistor={persistor}>
    <App />
    </PersistGate>
    </Provider>
  </StrictMode>,
)
