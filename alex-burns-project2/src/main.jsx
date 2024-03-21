import React from 'react'
import ReactDOM from 'react-dom/client'
import Home from './components/Home.jsx'
import App from './components/App.jsx'
import Credits from './components/Credits.jsx'
import NavBar from './components/NavBar.jsx'
import GridProvider from './components/GridProvider.jsx'
import {
  createBrowserRouter,
  RouterProvider,
  Route,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/app",
    element: <App />
  },
  {
    path: "/credits",
    element: <Credits />
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>,
)
