import React, { useState, useEffect, useRef } from 'react';
import { Html5Qrcode } from 'html5-qrcode';

const QrScannerBusiness = () => {
  const [scanResult, setScanResult] = useState('No result');
  const [isScanning, setIsScanning] = useState(true);
  const scannerRef = useRef(null);

  useEffect(() => {
    const config = {
      fps: 10,
      qrbox: { width: 250, height: 250 },
    };

    let html5QrCode;

    const startScanner = async () => {
      html5QrCode = new Html5Qrcode("reader");
      scannerRef.current = html5QrCode;

      try {
        await html5QrCode.start(
          { facingMode: "environment" },
          config,
          (decodedText) => {
            setScanResult(decodedText);
            setIsScanning(false);
            html5QrCode.stop().catch(err => console.warn("Warning when stopping scanner:", err));
          },
          (errorMessage) => {
            console.warn(`QR Code scanning failure: ${errorMessage}`);
          }
        );
      } catch (err) {
        console.error("Error starting scanner:", err);
      }
    };

    if (isScanning) {
      startScanner();
    }

    return () => {
      if (html5QrCode && html5QrCode.isScanning) {
        html5QrCode.stop().catch(err => console.warn("Warning when stopping scanner:", err));
      }
    };
  }, [isScanning]);

  const handleRescan = () => {
    setScanResult('No result');
    setIsScanning(true);
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">QR Code Scanner</h2>
      <div className="max-w-md mx-auto">
        <div id="reader" className="mb-4 overflow-hidden rounded-lg"></div>
        {!isScanning && (
          <button
            onClick={handleRescan}
            className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            Scan Again
          </button>
        )}
      </div>
      <div className="mt-4">
        <h3 className="text-xl font-semibold">Scanned Result:</h3>
        <p className="mt-2 p-2 bg-gray-100 rounded">{scanResult}</p>
      </div>
    </div>
  );
};

export default QrScannerBusiness;

