// import React, { useState } from 'react';
// import { login, forgetpassword, sendOtp, changePasswordAPI } from '../../service/authentication.js';
// import { Navigate, useNavigate } from 'react-router-dom';

// const SuccessPopup = ({ onClose }) => (
//   <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
//     <div className="bg-white p-6 rounded-lg shadow-lg text-center ">
//     <div class="flex justify-center items-center ">
//     <img src="https://optimworks.com/wp-content/uploads/2022/05/Cyber-Security-Testing.png" alt="Success" class="w-32 mb-4" />
// </div>

//       <h2 className="text-lg font-bold">Password Updated!</h2>
//       <p>Your password has been successfully changed.<br></br> You can now access all the features of your business account using your new password.</p>
//       <button
//         onClick={onClose}
//         className="mt-4 bg-[#8B1539] text-white py-2 px-4 rounded"
//       >
//         Back to Home
//       </button>
//     </div>
//   </div>
// );

// const ChangePasswordPopup = ({ onClose, email }) => {
//   const [currentPassword, setCurrentPassword] = useState('');
//   const [newPassword, setNewPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [errorMessage, setErrorMessage] = useState('');
//   const [successMessage, setSuccessMessage] = useState('');

//   const handleChangePassword = async () => {
//     if (newPassword !== confirmPassword) {
//       setErrorMessage('New password and confirm password do not match.');
//       return;
//     }

//     try {
//       // Call the API with separate parameters
//       const response = await changePasswordAPI(email, currentPassword, newPassword);
//       setSuccessMessage(response.message);
//       setErrorMessage(''); // Clear previous error messages
//       // Clear input fields
//       setCurrentPassword('');
//       setNewPassword('');
//       setConfirmPassword('');

//       // Dismiss the popup after a successful password change
//       setTimeout(() => {
//         onClose(); // Close the popup
//       }, 2000); // Optional: Delay for 2 seconds to show success message before closing

//     } catch (error) {
//       setErrorMessage(error.message || 'Failed to change password.');
//     }
//   };

//   return (
//     <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
//       <div className="bg-white p-6 rounded-lg shadow-lg text-center w-80">
//         <h2 className="text-lg font-bold">Change Your Password</h2>
//         {errorMessage && <p className="text-red-500">{errorMessage}</p>}
//         {successMessage && <p className="text-green-500">{successMessage}</p>}
        
//         <input
//           type="email"
//           value={email}
//           readOnly
//           className="w-full rounded-lg p-3 border border-gray-300 mt-4"
//         />
        
//         <div className="space-y-2">
//           <label className="block text-sm font-medium text-gray-700">Current Password</label>
//           <input
//             type="password"
//             placeholder="Current Password"
//             className="w-full rounded-lg p-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#8B1539]"
//             value={currentPassword}
//             onChange={(e) => setCurrentPassword(e.target.value)}
//             required
//           />
//         </div>

//         <div className="space-y-2">
//           <label className="block text-sm font-medium text-gray-700">New Password</label>
//           <input
//             type="password"
//             placeholder="New Password"
//             className="w-full rounded-lg p-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#8B1539]"
//             value={newPassword}
//             onChange={(e) => setNewPassword(e.target.value)}
//             required
//           />
//         </div>

//         <div className="space-y-2">
//           <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
//           <input
//             type="password"
//             placeholder="Confirm Password"
//             className="w-full rounded-lg p-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#8B1539]"
//             value={confirmPassword}
//             onChange={(e) => setConfirmPassword(e.target.value)}
//             required
//           />
//         </div>

//         <button
//           onClick={handleChangePassword}
//           className="mt-4 w-full bg-[#8B1539] text-white py-2 rounded"
//         >
//           Update Password
//         </button>
        
//         <button
//           onClick={onClose}
//           className="mt-2 text-gray-600 hover:underline"
//         >
//           Cancel
//         </button>
//       </div>
//     </div>
//   );
// };

// export default function LoginForm() {
//   const [email, setEmail] = useState(''); // Email state
//   const [password, setPassword] = useState('');
//   const [forgotPasswordStage, setForgotPasswordStage] = useState(0);
//   const [otp, setOtp] = useState('');
//   const [newPassword, setNewPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [errorMessage, setErrorMessage] = useState('');
//   const [successMessage, setSuccessMessage] = useState('');
//   const [isSuccessPopupVisible, setIsSuccessPopupVisible] = useState(false);
//   const [isChangePasswordPopupVisible, setIsChangePasswordPopupVisible] = useState(false);
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await login(email, password);
//       navigate('/business')
      
//     } catch (error) {
//       setErrorMessage(error.message || 'Login failed. Please check your credentials.');
//       if (error.message === "Kindly change your password.") {
//         setIsChangePasswordPopupVisible(true); // Show change password popup
//       }
//     }
//   };

//   const handleForgotPassword = () => {
//     setForgotPasswordStage(1);
//     setErrorMessage(''); // Reset error message
//     setSuccessMessage(''); // Reset success message
//   };

//   const handleSendOTP = async () => {
//     try {
//       await sendOtp(email);
//       setSuccessMessage('OTP sent successfully. Please check your email.');
//       setForgotPasswordStage(2);
//       setErrorMessage(''); // Reset error message
//     } catch (error) {
//       setErrorMessage(error.response?.data?.message || 'Failed to send OTP. Please check your email.');
//     }
//   };

//   const handleResetPassword = async () => {
//     if (newPassword !== confirmPassword) {
//       setErrorMessage('Passwords do not match');
//       return;
//     }

//     const payload = {
//       business_email: email,
//       otp: otp,
//       password: newPassword
//     };

//     try {
//       await forgetpassword(payload); // Call to forgetpassword API
//       setIsSuccessPopupVisible(true); // Show success popup
//       setForgotPasswordStage(0); // Reset the stage for future use
//       resetFormFields();
//     } catch (error) {
//       setErrorMessage(error.message || 'Failed to reset password. Please try again.');
//     }
//   };

//   const resetFormFields = () => {
//     setEmail('');
//     setPassword('');
//     setOtp('');
//     setNewPassword('');
//     setConfirmPassword('');
//     setErrorMessage('');
//     setSuccessMessage('');
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-white p-4">
//       <div className="w-full max-w-md shadow-lg rounded-3xl bg-white">
//         <div className="p-8 space-y-6">
//           <div className="text-center mb-8">
//             <div className="text-4xl font-bold tracking-tight inline-flex items-center">
//               L<svg className="h-8 w-8 text-red-500 mx-[-2px]" fill="currentColor" viewBox="0 0 20 20">
//                 <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
//               </svg>VE
//             </div>
//             <div className="text-4xl font-bold tracking-tight">ALL</div>
//           </div>

//           {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>}
//           {successMessage && <p className="text-green-500 text-center">{successMessage}</p>}

//           <form className="space-y-6" onSubmit={forgotPasswordStage === 0 ? handleLogin : (e) => e.preventDefault()}>
//             {forgotPasswordStage === 0 && (
//               <>
//                 <div className="space-y-2">
//                   <label htmlFor="email" className="block text-sm font-medium text-gray-700">Business Email</label>
//                   <input
//                     id="email"
//                     type="email"
//                     placeholder="Business Email"
//                     className="w-full rounded-lg p-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#8B1539]"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)} // Update email state
//                     required
//                   />
//                 </div>

//                 <div className="space-y-2">
//                   <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
//                   <input
//                     id="password"
//                     type="password"
//                     placeholder="Password"
//                     className="w-full rounded-lg p-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#8B1539]"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     required
//                   />
//                 </div>

//                 <div className="text-right">
//                   <button
//                     type="button"
//                     className="text-[#8B1539] hover:underline text-sm p-0 bg-transparent border-none cursor-pointer"
//                     onClick={handleForgotPassword}
//                   >
//                     Forgot Password?
//                   </button>
//                 </div>

//                 <button
//                   type="submit"
//                   className="w-full bg-[#8B1539] hover:bg-[#7A1230] text-white py-4 rounded-lg text-lg font-semibold"
//                 >
//                   Log in
//                 </button>
//               </>
//             )}

//             {forgotPasswordStage === 1 && (
//               <>
//                 <div className="space-y-2">
//                   <label htmlFor="forgot-email" className="block text-sm font-medium text-gray-700">Business Email</label>
//                   <input
//                     id="forgot-email"
//                     type="email"
//                     placeholder="Business Email"
//                     className="w-full rounded-lg p-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#8B1539]"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)} // Update email state
//                     required
//                   />
//                 </div>

//                 <button
//                   type="button"
//                   onClick={handleSendOTP}
//                   className="w-full bg-[#8B1539] hover:bg-[#7A1230] text-white py-4 rounded-lg text-lg font-semibold"
//                 >
//                   Send OTP
//                 </button>
//               </>
//             )}

//             {forgotPasswordStage === 2 && (
//               <>
//                 <div className="space-y-2">
//                   <label htmlFor="otp" className="block text-sm font-medium text-gray-700">OTP</label>
//                   <input
//                     id="otp"
//                     type="text"
//                     placeholder="Enter OTP"
//                     className="w-full rounded-lg p-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#8B1539]"
//                     value={otp}
//                     onChange={(e) => setOtp(e.target.value)}
//                     required
//                   />
//                 </div>

//                 <div className="space-y-2">
//                   <label htmlFor="new-password" className="block text-sm font-medium text-gray-700">New Password</label>
//                   <input
//                     id="new-password"
//                     type="password"
//                     placeholder="New Password"
//                     className="w-full rounded-lg p-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#8B1539]"
//                     value={newPassword}
//                     onChange={(e) => setNewPassword(e.target.value)}
//                     required
//                   />
//                 </div>

//                 <div className="space-y-2">
//                   <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">Confirm Password</label>
//                   <input
//                     id="confirm-password"
//                     type="password"
//                     placeholder="Confirm Password"
//                     className="w-full rounded-lg p-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#8B1539]"
//                     value={confirmPassword}
//                     onChange={(e) => setConfirmPassword(e.target.value)}
//                     required
//                   />
//                 </div>

//                 <button
//                   type="button"
//                   onClick={handleResetPassword}
//                   className="w-full bg-[#8B1539] hover:bg-[#7A1230] text-white py-4 rounded-lg text-lg font-semibold"
//                 >
//                   Reset Password
//                 </button>
//               </>
//             )}

//             <div className="text-center space-y-4">
//               {/* <a href="/login-otp" className="text-[#8B1539] hover:underline block text-sm">
//                 Log in with OTP
//               </a> */}

//               <div className="text-sm">
//                 Don&apos;t have an account?{' '}
//                 <a href="register" className="text-[#8B1539] hover:underline">
//                   Create Account
//                 </a>
//               </div>
//             </div>
//           </form>
//         </div>
//       </div>

//       {isSuccessPopupVisible && (
//         <SuccessPopup onClose={() => setIsSuccessPopupVisible(false)} />
//       )}

//       {isChangePasswordPopupVisible && (
//         <ChangePasswordPopup onClose={() => setIsChangePasswordPopupVisible(false)} email={email} />
//       )}
//     </div>
//   );
// }