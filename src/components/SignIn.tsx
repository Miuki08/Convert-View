// components/SignIn.tsx
import { useState, ChangeEvent, FormEvent } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface FormData {
  email: string;
  password: string;
  mobile: string;
}

export default function SignIn() {
  const [activeTab, setActiveTab] = useState<'email' | 'mobile'>('email');
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    mobile: ''
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission here
    console.log(formData);
  };

  const generateOTP = () => {
    // Handle OTP generation here
    alert('OTP would be sent to your mobile number');
  };

  return (
    <div className="min-h-screen bg-blue-500 flex items-center justify-center p-4">
      {/* Background squares */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <div key={i} className="absolute w-10 h-10 border border-white border-opacity-20"></div>
        ))}
      </div>

      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md z-10">
        <div className="flex justify-center mb-6">
          <Image 
            src="/assets/images/brand-logos/toggle-logo.png" 
            alt="logo" 
            width={40} 
            height={40}
            className="h-10 w-auto"
          />
        </div>

        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800">Welcome back!</h2>
          <p className="text-gray-600 mt-2">Please sign in to continue.</p>
        </div>

        <div className="mt-6 border-b border-gray-200">
          <div className="flex">
            <button
              className={`py-2 px-4 font-medium ${activeTab === 'email' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-500'}`}
              onClick={() => setActiveTab('email')}
              type="button"
            >
              Email
            </button>
            <button
              className={`py-2 px-4 font-medium ${activeTab === 'mobile' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-500'}`}
              onClick={() => setActiveTab('mobile')}
              type="button"
            >
              Mobile no
            </button>
          </div>
        </div>

        <div className="mt-4">
          {activeTab === 'email' ? (
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-medium mb-2">Email</label>
                <input
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your email"
                  type="email"
                  name="email"
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-medium mb-2">Password</label>
                <input
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your password"
                  type="password"
                  name="password"
                  onChange={handleChange}
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200"
              >
                Sign In
              </button>

              <div className="flex justify-center mt-6 space-x-3 mb-4">
                <button 
                  type="button"
                  className="p-2 rounded-full border border-gray-200 hover:bg-gray-100"
                >
                  <i className="bx bxl-facebook text-blue-600 text-xl"></i>
                </button>
                <button 
                  type="button"
                  className="p-2 rounded-full border border-gray-200 hover:bg-gray-100"
                >
                  <i className="bx bxl-twitter text-blue-400 text-xl"></i>
                </button>
                <button 
                  type="button"
                  className="p-2 rounded-full border border-gray-200 hover:bg-gray-100"
                >
                  <i className="bx bxl-linkedin text-blue-700 text-xl"></i>
                </button>
                <button 
                  type="button"
                  className="p-2 rounded-full border border-gray-200 hover:bg-gray-100"
                >
                  <i className="bx bxl-instagram text-purple-600 text-xl"></i>
                </button>
              </div>
            </form>
          ) : (
            <div className="mt-4">
              <div className="flex mb-4">
                <span className="inline-flex items-center px-3 border border-r-0 border-gray-300 bg-gray-50 text-gray-500 rounded-l-md">
                  +91
                </span>
                <input
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-r-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="number"
                  type="tel"
                  name="mobile"
                  onChange={handleChange}
                />
              </div>
              <p className="text-sm text-gray-500 mb-4">
                Note: Login with registered mobile number to generate OTP.
              </p>
              <button
                onClick={generateOTP}
                type="button"
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200"
              >
                Proceed
              </button>
            </div>
          )}
        </div>

        <div className="text-center mt-6">
          <p className="mb-3">
            <Link href="/forgot" className="text-blue-500 hover:underline">
              Forgot password?
            </Link>
          </p>
          <p className="text-gray-600">
            Dont have an account?{' '}
            <Link href="/signup" className="text-blue-500 hover:underline">
              Create an Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}