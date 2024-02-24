import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import LoginPage from './components/LoginPage.jsx'
import SignUpPage from './components/SignUpPage.jsx'
import ForgotPage from './components/ForgotPage.jsx'
import MainBoard from './components/MainPage/MainBoard.jsx'
import AvatarDashboard from './components/AvatarDashboard.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <LoginPage />,
  },
  {
    path: '/chat',
    element: <MainBoard />
  },
  {
    path: 'SignUpPage',
    element: <SignUpPage />
  },
  {
    path: 'ForgotPage',
    element: <ForgotPage />
  },
  {
    path: 'AvatarDashboard',
    element: <AvatarDashboard />
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
