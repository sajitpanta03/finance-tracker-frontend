import { Link } from "react-router-dom";
import { Button } from "./ui/button";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 via-teal-500 to-purple-500 text-white p-6">
      <div className="text-center max-w-lg mx-auto">
        <h1 className="text-5xl font-extrabold mb-4">Believe in Your Dreams</h1>
        <p className="text-xl mb-8">
          We are here to help you turn your dreams into reality. Empower your
          journey with tools, resources, and support to help you achieve
          success.
        </p>
        <Link
          to="/about"
          className="px-8 py-3 text-lg bg-blue-600 rounded-full hover:bg-blue-700 transition duration-300 transform hover:scale-105"
        >
          Learn More About Us
        </Link>
        <Button>Shad-cn button</Button>
      </div>
    </div>
  );
};

export default Home;
