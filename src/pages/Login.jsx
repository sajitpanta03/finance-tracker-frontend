import { useReducer } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import InputComponent from '@/components/InputComponent'
import { FaGoogle, FaApple } from 'react-icons/fa'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import useApi from '@/hooks/useApi'

const initialState = {
  email: '',
  password: '',
  token: null,
  loading: false,
  error: null,
}

function reducer(state, action) {
  switch (action.type) {
    case 'SET_FIELD':
      return { ...state, [action.field]: action.value }
    case 'LOGIN_REQUEST':
      return { ...state, loading: true, error: null }
    case 'LOGIN_SUCCESS':
      return { ...state, loading: false, token: action.token }
    case 'LOGIN_FAILURE':
      return { ...state, loading: false, error: action.error }
    default:
      return state
  }
}

export default function Login() {
  const { createData } = useApi('http://127.0.0.1:8000')
  const navigate = useNavigate()

  const [state, dispatch] = useReducer(reducer, initialState)

  const handleFormData = async () => {
    dispatch({ type: 'LOGIN_REQUEST' }) // Start the login request

    try {
      const response = await createData('/api/v1/login', {
        email: state.email,
        password: state.password,
      })

      if (response && response.data.token) {
        dispatch({ type: 'LOGIN_SUCCESS', token: response.data.token })
        localStorage.setItem('authToken', response.data.token)
        navigate('/user-dashboard')
      } else {
        const errorMessage = response.message || 'Login failed'
        dispatch({ type: 'LOGIN_FAILURE', error: errorMessage })
        toast.error(errorMessage, { position: 'top-center', autoClose: 3000 })
      }
    } catch (err) {
      const errorMessage = 'Login failed, please try again.'
      dispatch({ type: 'LOGIN_FAILURE', error: errorMessage })
      toast.error(errorMessage, { position: 'top-center', autoClose: 3000 })
    }
  }

  const handleOnChange = (field, value) => {
    dispatch({ type: 'SET_FIELD', field, value })
  }

  return (
    <div className="main-wrapper flex flex-row w-full h-[100vh]">
      <div className="formContainer flex flex-col justify-center p-[15px] lg:p-0 items-center h-[100vh] md:w-[50%] w-full">
        <div className="wrapper sm:w-[50%] md:w-[80%] lg:w-[50%] w-[70%]">
          <h3 className="font-bold font-poppins text-[22px]">Welcome back!</h3>
          <h5>Enter your Credentials to access your account</h5>
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="input-wrapper mt-10">
              <div className="input mb-[23px]">
                <InputComponent
                  type="email"
                  labelName="Email address"
                  name="email"
                  placeholder="Enter your email"
                  onChange={(e) => handleOnChange('email', e.target.value)}
                  required
                />
              </div>
              <div className="input mb-[33px]">
                <InputComponent
                  type="password"
                  labelName="Password"
                  name="password"
                  placeholder="Enter your password"
                  onChange={(e) => handleOnChange('password', e.target.value)}
                  required
                >
                  <div className="flex justify-between">
                    <label>Password</label>
                    <span>
                      <Link
                        className="text-blue-800 text-sm"
                        to="/forgot-password"
                      >
                        Forgot password?
                      </Link>
                    </span>
                  </div>
                </InputComponent>
              </div>
              <div className="button mb-12">
                <Button
                  className="w-full"
                  variant="outline"
                  onClick={handleFormData}
                  disabled={state.loading}
                >
                  {state.loading ? 'Logging in...' : 'Login'}
                </Button>
              </div>
              <div className="flex items-center w-full max-w-md mb-4">
                <div className="flex-1 border-t border-gray-300"></div>
                <span className="mx-4 text-gray-500 font-semibold">or</span>
                <div className="flex-1 border-t border-gray-300"></div>
              </div>
              <div className="thirdPartySignup-Wrapper md:flex md:justify-between mb-4">
                <div className="link-wrapper flex border-[2px] border-gray-500 rounded pl-3 pr-3 pt-1 pb-1 mb-4 lg:mb-0">
                  <FaGoogle className="mr-2 mt-1" />
                  <Link to="/google-signin">Sign in with Google</Link>
                </div>

                <div className="link-wrapper flex border-[2px] border-gray-500 rounded pl-3 pr-3 pt-1 pb-1 mb-4 lg:mb-0">
                  <FaApple className="mr-2 mt-1" />
                  <Link to="/apple-signin">Sign in with Apple</Link>
                </div>
              </div>
              <div className="signInLink-wrapper flex justify-center">
                <span>
                  Don't have an account?
                  <Link to="/signup" className="ml-1 text-blue-800">
                    Sign up
                  </Link>
                </span>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className="imageContainer md:w-[50%] md:block hidden">
        <div className="imagebox w-full h-[100vh] bg-pink-500 rounded-tl-[40px] rounded-bl-[40px] rounded-tr-[0px] rounded-br-[0px]">
          <img
            className="relative w-full h-full top-0 left-0 rounded-tl-[40px] rounded-bl-[40px] rounded-tr-[0px] rounded-br-[0px] object-cover"
            src="https://images.pexels.com/photos/7887815/pexels-photo-7887815.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="A person working on a laptop"
          />
        </div>
      </div>
      <ToastContainer position="top-center" />
    </div>
  )
}
