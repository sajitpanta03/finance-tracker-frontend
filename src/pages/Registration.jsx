import InputComponent from '@/components/InputComponent'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import { FaGoogle, FaApple } from 'react-icons/fa'
import { useState } from 'react'
import useApi from '@/hooks/useApi'

export default function Registration() {
  const { data, error, loading, createData } = useApi('http://127.0.0.1:8000')

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    remember: true,
  })

  const handleFormData = async () => {
    try {
      await createData('/api/v1/register', formData)
    } catch (err) {
      console.error('There was a problem with the registration:', err.message)
    }
  }

  const handleOnChange = (data) => {
    setFormData((prev) => ({
      ...prev,
      ...data,
    }))
  }

  return (
    <div className="main-wrapper flex flex-row w-full h-[100vh]">
      <div className="formContainer flex flex-col justify-center p-[15px] lg:p-0 items-center h-[100vh] md:w-[50%] w-full">
        <div className="wrapper sm:w-[50%] md:w-[80%] lg:w-[50%] w-[70%]">
          <h3 className="font-bold font-poppins text-[22px]">
            Get Started Now
          </h3>
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="input-wrapper mt-10">
              <div className="input mb-[23px]">
                <InputComponent
                  type="text"
                  labelName="Name"
                  name="name"
                  placeholder="Enter your name"
                  onChange={handleOnChange}
                  required
                />
              </div>
              <div className="input mb-[23px]">
                <InputComponent
                  type="email"
                  labelName="Email address"
                  name="email"
                  placeholder="Enter your email"
                  onChange={handleOnChange}
                  required
                />
              </div>
              <div className="input mb-[33px]">
                <InputComponent
                  type="password"
                  labelName="Password"
                  name="password"
                  placeholder="Enter your password"
                  onChange={handleOnChange}
                  required
                />
              </div>
              <div className="button mb-12">
                <Button
                  className="w-full bg-slate-300"
                  variant="outline"
                  onClick={() => handleFormData()}
                >
                  Singup
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
                  <Link className="">Sign in with Google</Link>
                </div>

                <div className="link-wrapper flex border-[2px] border-gray-500 rounded pl-3 pr-3 pt-1 pb-1 mb-4 lg:mb-0">
                  <FaApple className="mr-2 mt-1" />
                  <Link className=" ">Sign in with Apple</Link>
                </div>
              </div>
              <div className="signInLink-wrapper flex justify-center">
                <span>
                  Have an account?
                  <Link to="login" className="ml-1 text-blue-800">
                    Sign in
                  </Link>
                </span>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className="imageContainer  md:w-[50%] md:block hidden">
        <div className="imagebox w-full h-[100vh] rounded-tl-[40px] rounded-bl-[40px] rounded-tr-[0px] rounded-br-[0px]">
          <img
            className="relative w-full h-full top-0 left-0 rounded-tl-[40px] rounded-bl-[40px] rounded-tr-[0px] rounded-br-[0px] object-cover"
            src="https://images.pexels.com/photos/7887815/pexels-photo-7887815.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="form-image"
          />
        </div>
      </div>
    </div>
  )
}
