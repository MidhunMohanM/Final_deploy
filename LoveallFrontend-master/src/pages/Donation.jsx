import React from 'react';

const Donation = () => {
  return (
    <div className='min-h-screen flex flex-col bg-[#8B0000]'>
      {/* Main Content */}
      <main className="flex-grow flex flex-col justify-between">
        <div className="container mx-auto px-4 py-24 text-center">
          <h1 className="text-6xl font-bold text-white mb-2">Donate</h1>
          <p className=" text-white mb-6 text-3xl">Make a Difference Today</p>
          <p className="text-white mb-6 leading-relaxed text-center text-xl">
            Your contribution can help provide nutritious meals to those in need. By donating to the Atria Foundation, <br />you are directly supporting our efforts to eradicate hunger in Bangalore. Every donation, big or small,<br /> goes a long way in ensuring that no one goes to bed hungry. Join us in making Bangalore a hunger-free city, one meal at a time.
          </p>
          <p className="text-white mb-12 text-2xl">
            Donate now and be part of the solution. Together, we can create a better tomorrow.
          </p>
        </div>

        {/* Curved section */}
        <div className="relative py-24 bg-white" >
          <div className="relative z-10 py-16">
            <div className="container mx-auto px-4">
              <div className="flex justify-center mb-12">
                <img src="" alt="" className="w-72 h-72 bg-[#971132]" />
              </div>
              <h2 className="text-2xl font-bold text-[#8B0000] text-center mb-8">
                Through Payment Gateway (Credit Card/Debit Card/Wallet/Netbanking)
              </h2>
              <form className="max-w-md mx-auto space-y-4">
                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Full name</label>
                  <input id="fullName" placeholder="Full name" className="border-[#8B0000] border-2 rounded mt-1 p-2 w-full" />
                </div>
                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
                  <input id="address" placeholder="Address" className="border-[#8B0000] border-2 rounded mt-1 p-2 w-full" />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
                  <input id="phone" placeholder="Phone" className="border-[#8B0000] border-2 rounded mt-1 p-2 w-full" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">E-mail</label>
                  <input id="email" placeholder="E-mail" className="border-[#8B0000] border-2 rounded mt-1 p-2 w-full" />
                </div>
                <div>
                  <label htmlFor="amount" className="block text-sm font-medium text-gray-700">Amount in INR</label>
                  <input id="amount" placeholder="Amount in INR" className="border-[#8B0000] border-2 rounded mt-1 p-2 w-full" />
                </div>
                <div>
                  <label htmlFor="panCard" className="block text-sm font-medium text-gray-700">Pan card no.</label>
                  <input id="panCard" placeholder="Pan card no." className="border-[#8B0000] border-2 rounded mt-1 p-2 w-full" />
                </div>
                <div>
                  <label htmlFor="nationality" className="block text-sm font-medium text-gray-700">Nationality</label>
                  <input id="nationality" placeholder="Nationality" className="border-[#8B0000] border-2 rounded mt-1 p-2 w-full" />
                </div>
                <button className="w-full bg-[#FF6B6B] hover:bg-[#FF4F4F] text-white rounded-full py-3 text-lg font-semibold shadow-md">
                  Pay now
                </button>
              </form>
              <p className="text-center mt-4 text-sm text-gray-600">Secure Payment with Razorpay</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Donation;
