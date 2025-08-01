import React from 'react'; 
import { GoogleOAuthProvider } from '@react-oauth/google'
import { AppStateProvider } from '../data/app-state'; 
import AppRouter from './routes'

/* Assets */
import './theme.css'
import './styles.css'

const GOOGLE_AUTH_KEY = import.meta.env.VITE_GOOGLE_AUTH_KEY;

function App() {
  return (
    <GoogleOAuthProvider clientId={GOOGLE_AUTH_KEY}>
      <AppStateProvider>
        <AppRouter />
      </AppStateProvider>
    </GoogleOAuthProvider>
  )
}

export default App
