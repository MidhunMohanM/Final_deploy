import React from "react";

const Volunteer = () => {
  return (
    <div className="flex flex-col min-h-screen bg-[#6D071A]">
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative text-center text-white px-4 py-12 overflow-hidden">
          <h1 className="text-6xl font-bold mb-6">Volunteer</h1>
          <h2 className="text-2xl mb-4">
            Atria Foundation: Creating a Better Bangalore
          </h2>
          <p className="max-w-3xl mx-auto mb-4">
            Atria Foundation is committed to tackling key challenges in
            Bangalore, including hunger, healthcare, and education. During the
            2020 COVID-19 pandemic, the foundation delivered 1,50,000 meals
            daily through 20 kitchens, supported by over 350 volunteers.
          </p>
          <p className="max-w-3xl mx-auto mb-4">
            Today, our mission has grown. We aim to collaborate with residential
            welfare associations in every ward of Bangalore to establish free
            food centres that provide 100 meals daily, 365 days a year.
          </p>
          <p className="max-w-3xl mx-auto mb-12">
            By focusing on these critical areas, Atria Foundation is working to
            ensure that everyone in Bangalore has access to the essentials they
            need for a better future.
          </p>
          {/* Curved element at the bottom of the hero section */}
          <div className="absolute bottom-0 left-0 right-0 z-[-1]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1440 320"
              className="w-full h-auto"
            >
              <path
                fill="#FFFFFF"
                fillOpacity="1"
                d="M0,160L48,176C96,192,192,224,288,224C384,224,480,192,576,176C672,160,768,160,864,176C960,192,1056,224,1152,224C1248,224,1344,192,1392,176L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
              ></path>
            </svg>
          </div>
        </section>

        {/* Volunteer Form Section */}
        <section className="bg-white p-8">
          <div className="max-w-6xl mx-auto flex flex-wrap">
            <div className="w-full md:w-1/2 mb-8 md:mb-0">
              <img
                src=""
                alt=""
                className="w-full h-72 bg-[#6D071A]"
              />
              <div className="mt-4">
                <h3 className="font-bold mb-2">
                  We're seeking volunteers for three crucial roles:
                </h3>
                <ol className="list-decimal list-inside">
                  <li>
                    Pathfinders: Identify residential welfare associations
                    interested in joining the program.
                  </li>
                  <li>
                    Engagers: Communicate with these associations to ensure
                    daily execution of the program.
                  </li>
                  <li>
                    Enablers: Work with Resident Welfare Associations to bring
                    the mission to local wards and decentralize our efforts.
                  </li>
                </ol>
                <p className="mt-4">
                  In the next 90 days, we aim to partner with volunteers and at
                  least one residential association. If you believe in this
                  endeavor, be a part of something bigger by signing up below.
                  Your support will shape a future where Bangalore sets an
                  example for the entire nation.
                </p>
                <p className="mt-2">
                  Visit{" "}
                  <a
                    href="http://atriafoundation.org/"
                    className="text-blue-600 hover:underline"
                  >
                    http://atriafoundation.org/
                  </a>{" "}
                  to know more about the Atria Foundation.
                </p>
              </div>
            </div>

            <div className="w-full md:w-1/2 md:pl-8">
              <h3 className="text-sm text-red-600 mb-4">
                * Indicates required question
              </h3>
              <form className="space-y-4">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email*
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>

                <div>
                  <label
                    htmlFor="fullName"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Full Name*
                  </label>
                  <input
                    id="fullName"
                    type="text"
                    required
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>

                <div>
                  <label
                    htmlFor="contactNumber"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Contact Number*
                  </label>
                  <input
                    id="contactNumber"
                    type="tel"
                    required
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>

                <div>
                  <label
                    htmlFor="pinCode"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Residential Area Pin Code*
                  </label>
                  <input
                    id="pinCode"
                    type="text"
                    required
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>

                <div>
                  <label
                    htmlFor="wardNumber"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Residential Area Municipality Ward Number*
                  </label>
                  <input
                    id="wardNumber"
                    type="text"
                    required
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>

                <div>
                  <label
                    htmlFor="bbmpWardNo"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Add NEW BBMP Ward No:
                  </label>
                  <input
                    id="bbmpWardNo"
                    type="text"
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    I want to contribute as:*
                  </label>
                  <div className="mt-2">
                    <div className="flex items-center">
                      <input
                        id="pathfinder"
                        name="role"
                        type="radio"
                        value="pathfinder"
                        className="h-4 w-4 text-blue-600"
                        required
                      />
                      <label
                        htmlFor="pathfinder"
                        className="ml-3 block text-sm font-medium text-gray-700"
                      >
                        Pathfinder
                      </label>
                    </div>
                    <div className="flex items-center mt-2">
                      <input
                        id="engager"
                        name="role"
                        type="radio"
                        value="engager"
                        className="h-4 w-4 text-blue-600"
                      />
                      <label
                        htmlFor="engager"
                        className="ml-3 block text-sm font-medium text-gray-700"
                      >
                        Engager
                      </label>
                    </div>
                    <div className="flex items-center mt-2">
                      <input
                        id="enabler"
                        name="role"
                        type="radio"
                        value="enabler"
                        className="h-4 w-4 text-blue-600"
                      />
                      <label
                        htmlFor="enabler"
                        className="ml-3 block text-sm font-medium text-gray-700"
                      >
                        Enabler
                      </label>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Volunteer;
