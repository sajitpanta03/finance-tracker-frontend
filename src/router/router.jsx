import { createBrowserRouter } from 'react-router-dom'
import App from '@/App'
import Registration from '@/pages/Registration'
import PasswordReset from '@/pages/PaswordReset'
import Login from '@/pages/Login'
import ForgotPassword from '@/pages/ForgotPassword'

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
        element: <PasswordReset />
      }
    ],
  },
])

export default router
