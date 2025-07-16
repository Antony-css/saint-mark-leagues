import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

// Pages

import Home from './Pages/Home';
import Dashboard from './Pages/Dashboard';

const router = createBrowserRouter([
  {path: '/', element: <Home />},
  {path: '/dashboard', element: <Dashboard />}
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
