import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router'
import { Router } from './Routes/Router.jsx'
import AuthProvider from './Provider/AuthProvider.jsx'
import { Toaster } from 'react-hot-toast'
import { HelmetProvider } from 'react-helmet-async'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HelmetProvider>
<AuthProvider>
     <RouterProvider router={Router}/>
     <Toaster />
   </AuthProvider>
    </HelmetProvider>
   
  </StrictMode>,
)
