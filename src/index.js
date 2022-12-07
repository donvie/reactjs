import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import App from './pages/App';
import Todo from './pages/Todo';
import ProductTable from './components/ProductTable';

window.product = {};

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />
  },
  {
    path: "/todo",
    element: <Todo />
  },
  {
    path: "/product-table",
    element: <ProductTable />
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
