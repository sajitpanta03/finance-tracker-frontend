import { createBrowserRouter } from 'react-router-dom'
import App from '@/App'
import Registration from '@/pages/Registration'
import PasswordReset from '@/pages/PaswordReset'
import Login from '@/pages/Login'
import ForgotPassword from '@/pages/ForgotPassword'
import UserDashboard from '@/pages/UserDashboard'
import ProtectedRoute from '@/hooks/ProtectedRoute.js'
import IncomePage from '@/pages/incomes/IncomePage.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '',
        element: <Registration />,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'forgot-password',
        element: <ForgotPassword />,
      },
      {
        path: 'password-reset',
        element: <PasswordReset />,
      },
      {
        path: 'user-dashboard',
        element: (
          <ProtectedRoute>
            <UserDashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: 'view-income',
        element: (
          <ProtectedRoute>
            <IncomePage />
          </ProtectedRoute>
        ),
      },
    ],
  },
])

export default router
