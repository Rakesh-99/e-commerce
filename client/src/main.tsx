import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import 'bootstrap-icons/font/bootstrap-icons.css';
import store, { persistor } from './app/store/store.ts';
import { Provider } from 'react-redux';
import { Toaster } from 'sonner';
import { PersistGate } from 'redux-persist/integration/react';



createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <App />
    </PersistGate>
    <Toaster />
  </Provider>
)
