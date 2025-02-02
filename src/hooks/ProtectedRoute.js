import { useNavigate } from 'react-router-dom'

export default function ProtectedRoute({ children }) {
  const isAuthenticated = localStorage.getItem('authToken')
  const navigate = useNavigate()

  if (!isAuthenticated) {
    return navigate('login')
  }

  return children
}
