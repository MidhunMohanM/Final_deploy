import React from 'react';

const WaveBackground = () => {
  return (
    <svg
      id="wave"
      className="absolute top-0 left-0 w-full"
      style={{ transform: 'translateY(-40%)', transition: '0.3s', width: '100vw', height: 'auto' }}
      viewBox="0 0 1440 900"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="sw-gradient-0" x1="0" x2="0" y1="1" y2="0">
          <stop stopColor="rgba(71, 0, 28, 1)" offset="0%" />
          <stop stopColor="rgba(151, 17, 50, 1)" offset="100%" />
        </linearGradient>
      </defs>
      <path
        style={{ transform: 'translate(0, 0px)', opacity: 1 }}
        fill="url(#sw-gradient-0)"
        d="M0,450L80,435C160,420,320,390,480,420C640,450,800,540,960,540C1120,540,1280,450,1440,420C1600,390,1760,420,1920,480C2080,540,2240,630,2400,630C2560,630,2720,540,2880,480C3040,420,3200,390,3360,420C3520,450,3680,540,3840,540C4000,540,4160,450,4320,420C4480,390,4640,420,4800,450C4960,480,5120,510,5280,510C5440,510,5600,480,5760,450C5920,420,6080,390,6240,420C6400,450,6560,540,6720,570C6880,600,7040,570,7200,540C7360,510,7520,480,7680,450C7840,420,8000,390,8160,420C8320,450,8480,540,8640,570C8800,600,8960,570,9120,540C9280,510,9440,480,9600,450C9760,420,9920,390,10080,390C10240,390,10400,420,10560,450C10720,480,10880,510,11040,510C11200,510,11360,480,11440,465L11520,450L11520,900L0,900Z"
      ></path>
    </svg>
  );
};

export default WaveBackground;