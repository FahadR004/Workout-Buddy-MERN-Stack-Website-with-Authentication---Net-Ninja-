import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { WorkoutContextProvider } from './context/workoutContext.jsx'
import { AuthContextProvider } from './context/authContext.jsx'
import "./index.css"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthContextProvider>
        <WorkoutContextProvider>
            <App/>
        </WorkoutContextProvider>
    </AuthContextProvider>
  </StrictMode>,
)
