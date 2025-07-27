import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

function Signup() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!response.ok) throw new Error('Registration failed');
      const { token } = await response.json();
      localStorage.setItem('token', token);
      navigate('/');
    } catch (err) {
      setError('Signup failed. Try a different email.');
    }
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <div className="bg-gray-50 min-h-screen flex items-center justify-center">
      <motion.div
        variants={fadeIn}
        initial="hidden"
        animate="visible"
        className="max-w-md w-full mx-4 p-6 bg-white rounded-lg shadow-sm"
      >
        <h1 className="text-3xl font-bold text-gray-900 text-center mb-6">Sign Up</h1>
        {error && <p className="text-red-600 text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-gray-900 font-semibold mb-2">
              Name
            </label>
            <input
              id="name"
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-200 focus:border-green-800 transition-all duration-300"
              placeholder="Your Name"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-gray-900 font-semibold mb-2">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-200 focus:border-green-800 transition-all duration-300"
              placeholder="Your Email"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-gray-900 font-semibold mb-2">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-200 focus:border-green-800 transition-all duration-300"
              placeholder="Your Password"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-800 text-white p-3 rounded-lg hover:bg-green-200 hover:text-gray-900 transition-all duration-300"
          >
            Sign Up
          </button>
        </form>
        <p className="text-center text-gray-700 mt-4">
          Already have an account?{' '}
          <Link to="/login" className="text-green-800 hover:text-green-200 transition-colors duration-300">
            Login
          </Link>
        </p>
      </motion.div>
    </div>
  );
}

export default Signup;