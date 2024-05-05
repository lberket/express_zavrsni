import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";


const router = createBrowserRouter([
  {
    path: "/",
    element: <App name={"home"}></App>,
  },
  {
    path: "/informacije",
    element: <App name={"informacije"}></App>,
  },
  {
    path: "/popis",
    element: <App name={"popis"}></App>,
  },
  {
    path: "/donacije",
    element: <App name={"donacije"}></App>,
  },
  {
    path: "/unos",
    element: <App name={"unos"}></App>,
  },  
  {
    path: "/prijava",
    element: <App name={"prijava"}></App>,
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
