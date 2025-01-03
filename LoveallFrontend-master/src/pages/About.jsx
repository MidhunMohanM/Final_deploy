import React from 'react'

const About = () => {
  return (
    <div>
      <main className="">
        {/* About Us Hero */}
        <section className="bg-[#6D071A] text-white py-12 relative">
          <div className="max-w-6xl mx-auto px-4">
            <h1 className="text-4xl font-bold mb-4">About us</h1>
          </div>
        </section>

        {/* Our Mission */}
        <section className="py-12">
          <div className="max-w-6xl mx-auto px-4 flex flex-wrap items-center">
            <div className="w-full md:w-1/2 mb-8 md:mb-0">
                <img src="" alt="" className='bg-[#971132] h-80 rounded-lg' />
            </div>
            <div className="w-full md:w-1/2 md:pl-8">
              <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
              <p className="mb-4">
                At Atria Foundation, we are driven by a singular, powerful mission: to eradicate hunger in
                Bangalore. We believe that no one should go to bed hungry, and we are unwavering in our
                commitment to making this vision a reality. Hunger is not just about empty stomachs; it's
                about lost potential, weakened health, and shattered dreams. Through our efforts, we strive
                to restore hope, dignity, and the opportunity for a better future.
              </p>
            </div>
          </div>
        </section>

        {/* Our Initiative */}
        <section className="bg-gray-100 py-12">
          <div className="max-w-6xl mx-auto px-4 flex flex-wrap items-center">
            <div className="w-full md:w-1/2 mb-8 md:mb-0">
              <h2 className="text-3xl font-bold mb-4">Our Initiative</h2>
              <p className="mb-4">
                We've launched an innovative initiative to fuel our mission: annual discount cards for select
                restaurants, breweries, and bars across Bangalore. Here's how it works:
              </p>
              <ul className="list-disc list-inside mb-4">
                <li>Purchase an annual card for just 1000 INR</li>
                <li>Enjoy exclusive discounts at participating establishments for a full year</li>
                <li>100% of the proceeds go directly toward our hunger eradication efforts</li>
              </ul>
              <p>
                Every card purchased is a step toward a hunger-free Bangalore. Your enjoyment becomes
                someone else's nourishment.
              </p>
              <button className="mt-4 bg-[#FF6B6B] hover:bg-[#FF8787] text-white px-4 py-2 rounded-md">Purchase card</button>
            </div>
            <div className="w-full md:w-1/2 md:pl-8">
                <img src="" alt="" className='bg-[#971132] h-80 rounded-lg' />
            </div>
          </div>
        </section>

        {/* Our Impact */}
        <section className="py-12">
          <div className="max-w-6xl mx-auto px-4 flex flex-wrap items-center">
            <div className="w-full md:w-1/2 mb-8 md:mb-0">
                <img src="" alt="" className='bg-[#971132] h-80 rounded-lg' />
            </div>
            <div className="w-full md:w-1/2 md:pl-8">
              <h2 className="text-3xl font-bold mb-4">Our Impact</h2>
              <p className="mb-4">
                The funds raised through our discount card initiative have a direct and powerful effect on the
                community:
              </p>
              <ul className="list-disc list-inside mb-4">
                <li>Meals Provided: Over 100,000 nutritious meals served to those in need</li>
                <li>Communities Reached: Support extended to 50+ underprivileged communities</li>
                <li>Lives Changed: Thousands of lives positively impacted through our efforts</li>
              </ul>
              <p>
                Every card purchased helps us continue this mission, turning compassion into action
              </p>
            </div>
          </div>
        </section>

        {/* Join Our Mission */}
        <section className="bg-gray-100 py-12 text-center">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-3xl font-bold mb-4">Join Our Mission</h2>
            <p className="mb-4">
              Your participation can make a real difference. By purchasing a discount card, you're not just saving on meals and drinks—you're
              providing sustenance and hope to those who need it most. Together, we can create a hunger-free Bangalore.
              Be part of the change. Join us in our mission to eradicate hunger, one meal at a time.
            </p>
          </div>
        </section>
      </main>
    </div>
  )
}

export default About;
