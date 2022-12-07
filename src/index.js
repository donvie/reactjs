import { HashRouter } from "react-router-dom";
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import MainLayout from './layouts/MainLayout';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
window.product = {
  action: 'add'
};

root.render(
  <React.StrictMode>
    <HashRouter>
      <MainLayout />
    </HashRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();


// createBrowserRouter not working in GithubPages

// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './index.css';
// import reportWebVitals from './reportWebVitals';
// import {
//   createBrowserRouter,

//   RouterProvider,
// } from "react-router-dom";

// import App from './pages/App';
// import Todo from './pages/Todo';
// import Product from './components/Product';

// window.product = {};

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <App />
//   },
//   {
//     path: "/todo",
//     element: <Todo />
//   },
//   {
//     path: "/product-table",
//     element: <Product />
//   },
// ]);

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <RouterProvider router={router} />
//   </React.StrictMode>
// );

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
