// components/SignUp.tsx
import { useState, ChangeEvent, FormEvent } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function SignUp() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
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
            src="../public/assets/images/brand-logos/toggle-logo.png" 
            alt="logo" 
            width={40} 
            height={40} 
            className="h-10 w-auto"
          />
        </div>

        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800">Get Started</h2>
          <p className="text-gray-600 mt-2">Its free to signup and only takes a minute.</p>
        </div>

        <form className="mt-6" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-2">Firstname & Lastname</label>
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your firstname and lastname"
              type="text"
              name="firstName"
              onChange={handleChange}
              required
            />
          </div>

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
            Create Account
          </button>

          <div className="flex justify-center mt-6 space-x-3">
            <button className="p-2 rounded-full border border-gray-200 hover:bg-gray-100">
              <i className="bx bxl-facebook text-blue-600 text-xl"></i>
            </button>
            <button className="p-2 rounded-full border border-gray-200 hover:bg-gray-100">
              <i className="bx bxl-twitter text-blue-400 text-xl"></i>
            </button>
            <button className="p-2 rounded-full border border-gray-200 hover:bg-gray-100">
              <i className="bx bxl-linkedin text-blue-700 text-xl"></i>
            </button>
            <button className="p-2 rounded-full border border-gray-200 hover:bg-gray-100">
              <i className="bx bxl-instagram text-purple-600 text-xl"></i>
            </button>
          </div>
        </form>

        <div className="text-center mt-6">
          <p className="text-gray-600">
            Already have an account?{' '}
            <Link href="/signin" className="text-blue-500 hover:underline">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}