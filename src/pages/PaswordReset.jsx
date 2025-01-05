import { useLocation, useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import InputComponent from '@/components/InputComponent'
import useApi from '@/hooks/useApi'
import { useState } from 'react'

export default function PasswordReset() {
  const location = useLocation()
  const navigation = useNavigate()
  const { createData, loading, error } = useApi(import.meta.env.VITE_API_URL)

  const [passwordErrors, setPasswordErrors] = useState([])

  const queryParams = new URLSearchParams(location.search)
  const token = queryParams.get('token')
  const email = queryParams.get('email')

  const handleSubmit = async (e) => {
    e.preventDefault()

    const data = new FormData(e.currentTarget)
    const password = data.get('password')
    const confirmPassword = data.get('confirmPassword')

    if (password !== confirmPassword) {
      setPasswordErrors(['Password doesnot match!'])
      return
    }

    try {
      const response = await createData('/api/v1/password-reset', {
        token: token,
        email: email,
        password: password,
      })

      if (response.success === false) {
        setPasswordErrors([])

        if (response.errors && response.errors.password) {
          const passwordErrors = response.errors.password
          setPasswordErrors(passwordErrors)
        } else {
          toast.error(response.message || 'Something went wrong', {
            autoClose: 5000,
            position: 'top-right',
          })
        }
      } else {
        toast.success(response.message || 'Password successfully reset', {
          autoClose: 5000,
          position: 'top-right',
        })
      }
    } catch (error) {
      toast.error(error.message || 'Something went wrong! Please try again.', {
        autoClose: 5000,
        position: 'top-right',
      })
    }
  }

  return (
    <>
      <div className="container mx-auto px-4">
        <div className="flex justify-center items-center mt-6">
          <nav aria-label="Breadcrumb">
            <ol className="flex space-x-2 text-sm text-gray-700">
              <li>
                <a href="/" className="hover:text-blue-500" aria-label="Home">
                  <h3>Home</h3>
                </a>
              </li>
              <li className="text-gray-400">/</li>
              <li>
                <a
                  href="/password-reset"
                  className="hover:text-blue-500"
                  aria-label="Password Reset"
                >
                  <h1>Password Reset</h1>
                </a>
              </li>
            </ol>
          </nav>
        </div>
      </div>

      <div className="bg-white border border-gray-300 p-5 rounded-lg shadow-lg max-w-7xl mx-auto my-10 flex justify-center items-center h-screen">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="flex flex-col justify-center items-center">
            <h3 className="text-3xl font-semibold text-gray-700 mb-5">
              Reset Password for{' '}
              <p className="text-lg text-slate-600">{email}</p>
            </h3>
            <p className="text-gray-500 mb-10 text-center">
              Enter a new password to reset your account.
            </p>

            {passwordErrors.length > 0 && (
              <div className="text-red-500 mb-4 text-center">
                {passwordErrors.map((message, index) => (
                  <p key={index}>{message}</p>
                ))}
              </div>
            )}

            {error && (
              <div className="text-red-500 mb-4 text-center">
                <p>{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="w-full">
                <InputComponent
                  type="password"
                  labelName="New Password"
                  name="password"
                  className="w-96 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your new password."
                />
              </div>
              <div className="w-full mt-4">
                <InputComponent
                  type="password"
                  labelName="Confirm Password"
                  name="confirmPassword"
                  className="w-96 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Confirm your new password."
                />
              </div>
              <button
                type="submit"
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md"
                disabled={loading}
              >
                {loading ? 'Loading...' : 'Reset Password'}
              </button>
            </form>

            {loading && (
              <div className="mt-4 text-center text-blue-500">Loading...</div>
            )}
          </div>

          <div className="flex justify-center items-center">
            <img
              src="/src/assets/images/passwordreset.png"
              alt="passwordreset"
              className="rounded-lg"
            />
          </div>
        </div>
      </div>

      <ToastContainer />
    </>
  )
}
