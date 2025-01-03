// src/PaymentPage.js
import React, { useState } from 'react';
import axios from 'axios';

const PaymentPage = () => {
  const [paymentMethod, setPaymentMethod] = useState('');
  const amount = 1000; // Amount in INR

  const handlePayment = async () => {
    if (!paymentMethod) {
      alert('Please select a payment method');
      return;
    }

    try {
      if (paymentMethod === 'razorpay') {
        // Corrected route based on new paymentController
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/payment/create-razorpay-order`, {
          amount,
        });
        const order = response.data;

        const options = {
          key: process.env.REACT_APP_RAZORPAY_KEY, // Razorpay Key ID
          amount: order.amount,
          currency: order.currency,
          name: 'Your Company Name',
          description: 'Test Transaction',
          order_id: order.id,
          handler: async function (response) {
            const data = {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            };

            // Corrected route for verifying the payment
            const verification = await axios.post(`${process.env.REACT_APP_API_URL}/payment/verify-razorpay-payment`, data);

            if (verification.data.status === 'success') {
              alert('Payment Successful');
              window.location.href = '/payment-success';
            } else {
              alert('Payment Verification Failed');
              window.location.href = '/payment-failure';
            }
          },
          prefill: {
            name: 'John Doe',
            email: 'john.doe@example.com',
            contact: '9999999999',
          },
          theme: {
            color: '#3399cc',
          },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
      } else if (paymentMethod === 'phonepe') {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/payment/create-phonepe-order`, {
          amount,
        });
        const order = response.data;

        // Implement PhonePe redirection logic here
        alert('PhonePe payment redirection not implemented yet.');
      }
    } catch (error) {
      console.error('Payment Error:', error);
      alert('Payment failed. Please try again.');
    }
  };

  return (
    <div style={styles.container}>
      <h2>Select Payment Method</h2>
      <div style={styles.radioContainer}>
        <label>
          <input
            type="radio"
            value="razorpay"
            checked={paymentMethod === 'razorpay'}
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          Razorpay
        </label>
      </div>
      <div style={styles.radioContainer}>
        <label>
          <input
            type="radio"
            value="phonepe"
            checked={paymentMethod === 'phonepe'}
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          PhonePe
        </label>
      </div>
      <button onClick={handlePayment} style={styles.button}>
        Pay ₹{amount}
      </button>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '400px',
    margin: '50px auto',
    padding: '20px',
    border: '1px solid #ddd',
    borderRadius: '5px',
    textAlign: 'center',
  },
  radioContainer: {
    margin: '10px 0',
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#3399cc',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default PaymentPage;
