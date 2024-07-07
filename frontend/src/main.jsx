import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Profile from './pages/Profile.jsx';
import ReportForm from './pages/ReportForm.jsx';
import ExchangePoints from './pages/ExchangePoints.jsx';
import Layout from './components/Layout.jsx';
import ErrorPage from './pages/ErrorPage.jsx';
import ReportList from './pages/ReportList.jsx';
import AdminReportDetail from './pages/AdminReportDetail.jsx';
import UserReportDetail from './pages/UserReportDetail.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout><App /></Layout>,
    errorElement : <Layout><ErrorPage /></Layout>,
    children: [
      { index: true, element: <Home /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      { path: "/profile", element: <Profile /> },
      { path: "/exchanges", element: <ExchangePoints /> },
      { path: "/report", element: <ReportForm /> },
      { path: "/admin-report-detail", element: <AdminReportDetail /> },
      { path: "/user-report-detail", element: <UserReportDetail /> },
      { path: "/report-received", element: <ReportList /> },

    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)