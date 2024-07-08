import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { AuthProvider } from './contexts/AuthContext.jsx';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Profile from './pages/Profile.jsx';
import ReportForm from './pages/ReportForm.jsx';
import ExchangePoints from './pages/ExchangePoints.jsx';
import Layout from './components/Layout.jsx';
import ErrorPage from './pages/ErrorPage.jsx';
import UserReportList from './pages/UserReportList.jsx';
import AdminReportList from './pages/AdminReportList.jsx';
import AdminReportForm from './pages/AdminReportForm.jsx';
import UserReportDetail from './pages/UserReportDetail.jsx';
import ProtectedRoute from './components/ProtectedRoute';
import PublicRoute from './components/PublicRoute.jsx';


const router = createBrowserRouter([
  {
    path: "/",
    element: 
      <AuthProvider>
        <Layout>
          <App />
        </Layout>
      </AuthProvider>,
    errorElement : 
      <AuthProvider>
        <Layout>
          <ErrorPage />
        </Layout>
      </AuthProvider>,
    children: [
      { index: true, element: <Home /> },
      { path: "/login", element: <PublicRoute><Login /></PublicRoute> },
      { path: "/register", element: <PublicRoute ><Register /></PublicRoute> },
      { path: "/profile", element: <ProtectedRoute><Profile /></ProtectedRoute> },
      { path: "/exchanges", element: <ProtectedRoute><ExchangePoints /></ProtectedRoute> },
      { path: "/user-report-form", element: <ProtectedRoute><ReportForm /></ProtectedRoute> },
      { path: "/user-report-list", element: <ProtectedRoute><UserReportList /></ProtectedRoute> },
      { path: "/admin-report-form", element: <ProtectedRoute><AdminReportForm /></ProtectedRoute> },
      { path: "/user-report-detail/:id", element: <ProtectedRoute><UserReportDetail /></ProtectedRoute> },
      { path: "/admin-report-list", element: <ProtectedRoute><AdminReportList /></ProtectedRoute> },
      { path: "/admin-report-detail/:id", element: <ProtectedRoute><AdminReportForm /></ProtectedRoute> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)