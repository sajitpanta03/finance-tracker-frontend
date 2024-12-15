import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import InputComponent from "@/components/InputComponent";
import { useState } from "react";

export default function ForgotPassword() {
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const data = new FormData(e.currentTarget);
    const email = data.get("email");
    
    const url = `${import.meta.env.VITE_API_URL}/forgot-password`;

    setLoading(true);

    try {
      const res = await axios.post(url, { email: email });

      setLoading(false);

      if (res.data.success === false) {
        toast.error(res.data.message || "Something went wrong", {
          autoClose: 5000,
          position: "top-right",
        });
      } else {
        toast.success(res.data.message || "Password reset link sent", {
          autoClose: 5000,
          position: "top-right",
        });
      }
    } catch (error) {
      setLoading(false);

      toast.error("Something went wrong! Please try again.", {
        autoClose: 5000,
        position: "top-right",
      });
    }
  };

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
                  href="/forgot-password"
                  className="hover:text-blue-500"
                  aria-label="Forgot Password"
                >
                  <h1>Forgot Password</h1>
                </a>
              </li>
            </ol>
          </nav>
        </div>
      </div>

      <div className="bg-white border border-gray-300 p-5 rounded-lg shadow-lg max-w-7xl mx-auto my-10 flex justify-center items-center h-screen">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="flex justify-center items-center">
            <img
              src="/src/assets/images/forgotpassword.jpg"
              alt="forgotpassword"
              className="rounded-lg"
            />
          </div>

          <div className="flex flex-col justify-center items-center">
            <h3 className="text-3xl font-semibold text-gray-700 mb-5">
              Forgot Password
            </h3>
            <p className="text-gray-500 mb-10 text-center">
              Enter your email to receive a password reset link.
            </p>
            <form onSubmit={handleSubmit}>
              <div className="w-full">
                <InputComponent
                  type="email"
                  labelName="Email"
                  name="email"
                  className="w-96 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your email."
                />
              </div>
              <button
                type="submit"
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md"
                disabled={loading} // Disable button while loading
              >
                {loading ? "Loading..." : "Submit"} {/* Show loading text */}
              </button>
            </form>

            {/* Loader */}
            {loading && (
              <div className="mt-4 text-center text-blue-500">Loading...</div>
            )}
          </div>
        </div>
      </div>

      <ToastContainer />
    </>
  );
}
