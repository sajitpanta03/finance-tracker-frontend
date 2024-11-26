const About = () => {
  return (
    <div className="max-w-screen-xl mx-auto p-8">
      {/* Hero Section */}
      <section className="text-center py-20">
        <h1 className="text-4xl font-bold text-gray-800">About Us</h1>
        <p className="mt-4 text-lg text-gray-600">
          We are a team of passionate individuals committed to providing the
          best service.
        </p>
      </section>

      {/* Mission Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-12 py-16">
        <div>
          <h2 className="text-3xl font-semibold text-gray-800">Our Mission</h2>
          <p className="mt-4 text-gray-600">
            Our mission is to deliver innovative solutions that help businesses
            grow and succeed in the modern world.
          </p>
        </div>
        <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
          <h2 className="text-3xl font-semibold text-gray-800">Our Vision</h2>
          <p className="mt-4 text-gray-600">
            We envision a future where technology bridges gaps, drives change,
            and makes the world a better place.
          </p>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16">
        <h2 className="text-3xl text-center font-semibold text-gray-800">
          Meet the Team
        </h2>
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h3 className="text-xl font-semibold text-gray-800">David Rai</h3>
            <p className="text-gray-600">Supervisor Developer / Lead Developer</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h3 className="text-xl font-semibold text-gray-800">Sajit Panta</h3>
            <p className="text-gray-600">Developer</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h3 className="text-xl font-semibold text-gray-800">Jeevan Rawal</h3>
            <p className="text-gray-600">Developer</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h3 className="text-xl font-semibold text-gray-800">Ramesh Prasad Joshi</h3>
            <p className="text-gray-600">Developer</p>
          </div>
        </div>
      </section>

      <section className="text-center py-16 bg-gray-100">
        <h2 className="text-3xl font-semibold text-gray-800">Get in Touch</h2>
        <p className="mt-4 text-lg text-gray-600">
          Have any questions? Feel free to reach out to us.
        </p>
        <a
          href="mailto:info@example.com"
          className="mt-6 inline-block px-6 py-3 bg-blue-600 text-white text-lg rounded-lg"
        >
          Contact Us
        </a>
      </section>
    </div>
  );
};

export default About;
