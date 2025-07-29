import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';

function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = isLogin
      ? `${import.meta.env.VITE_API_URL}/auth/login`
      : `${import.meta.env.VITE_API_URL}/auth/register`;
    try {
      const res = await axios.post(url, isLogin ? formData : { ...formData, username: formData.username || formData.email });
      localStorage.setItem('token', res.data.token);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || `${isLogin ? 'Login' : 'Registration'} failed`);
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
        className="max-w-md w-full mx-4 p-8 bg-white rounded-xl shadow-lg"
      >
        <h1 className="text-3xl font-bold text-green-800 text-center mb-6">{isLogin ? 'Login' : 'Sign Up'}</h1>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-6">
          {!isLogin && (
            <div>
              <label htmlFor="username" className="block text-gray-900 font-semibold mb-2">
                Username
              </label>
              <input
                id="username"
                type="text"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                required={!isLogin}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-300 focus:border-green-800 transition-all"
                placeholder="Your Username"
              />
            </div>
          )}
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
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-300 focus:border-green-800 transition-all"
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
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-300 focus:border-green-800 transition-all"
              placeholder="Your Password"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-800 text-white p-3 rounded-lg hover:bg-green-700 focus:ring-2 focus:ring-green-300 transition-all"
          >
            {isLogin ? 'Login' : 'Sign Up'}
          </button>
        </form>
        <p className="text-center text-gray-700 mt-4">
          {isLogin ? 'Need an account?' : 'Already have an account?'}{' '}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-green-800 hover:text-green-600 transition-colors"
          >
            {isLogin ? 'Sign Up' : 'Login'}
          </button>
        </p>
      </motion.div>
    </div>
  );
}

export default Auth;