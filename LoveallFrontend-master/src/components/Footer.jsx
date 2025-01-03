import React from 'react';
import WaveBackground from './WaveBackground';

const Footer = () => {
  return (
    <footer className="relative overflow-hidden w-full pt-40">
      {/* Background */}
      <div className="absolute top-0 left-0 w-full h-full -z-10">
        <WaveBackground />
      </div>

      {/* Footer Content */}
      <div className="relative max-w-screen-xl mx-auto py-20 px-4 text-white grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* First Column */}
        <div>
          <h2 className="text-lg font-bold mb-4">LoveAll</h2>
          <p className="text-sm">
            Our free meal program intends to ensure that 
            <strong> NO ONE GOES HUNGRY</strong> in Bengaluru. Help us continue our free meals endeavor.
          </p>
        </div>

        {/* Second Column */}
        <div>
          <h2 className="text-lg font-bold mb-4">Links</h2>
          <ul className="space-y-2 text-sm">
            <li><a href="Midhun" className="hover:underline">Privacy Policy</a></li>
            <li><a href="Midhun" className="hover:underline">Terms of Service</a></li>
            <li><a href="Midhun" className="hover:underline">Contact Us</a></li>
            <li><a href="Midhun" className="hover:underline">Follow Us</a></li>
          </ul>
        </div>

        {/* Third Column */}
        <div>
          <h2 className="text-lg font-bold mb-4">LoveAll Links</h2>
          <ul className="space-y-2 text-sm">
            <li><a href="Midhun" className="hover:underline">Home</a></li>
            <li><a href="Midhun" className="hover:underline">About Us</a></li>
            <li><a href="Midhun" className="hover:underline">Contribute</a></li>
            <li><a href="Midhun" className="hover:underline">Business</a></li>
            <li><a href="Midhun" className="hover:underline">Contact Us</a></li>
          </ul>
        </div>

        {/* Fourth Column */}
        <div>
          <h2 className="text-lg font-bold mb-4">Contact Us</h2>
          <ul className="space-y-2 text-sm">
            <li>(+234) 137632128</li>
            <li>LoveAll@gmail.com</li>
            <li>Address goes here</li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;