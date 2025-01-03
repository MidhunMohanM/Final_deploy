import React from 'react';
import logoImage from '../images/Logo.jpeg';

export default function Logo() {
  return (
    <div className="flex justify-center">
      <img src={logoImage} alt="LOVE ALL Logo" className="h-16 w-auto" />
    </div>
  );
}