import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

function NotFound() {
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
        className="text-center max-w-md mx-4"
      >
        <h1 className="text-5xl font-bold text-gray-900 mb-4">404</h1>
        <p className="text-lg text-gray-700 mb-6">Oops! The page you’re looking for doesn’t exist.</p>
        <div className="space-x-4">
          <Link
            to="/"
            className="inline-block bg-green-800 text-white px-6 py-3 rounded-lg hover:bg-green-200 hover:text-gray-900 transition-all duration-300"
          >
            Go Home
          </Link>
          <Link
            to="/contact"
            className="inline-block border border-green-800 text-green-800 px-6 py-3 rounded-lg hover:bg-green-200 hover:text-gray-900 transition-all duration-300"
          >
            Contact Support
          </Link>
        </div>
      </motion.div>
    </div>
  );
}

export default NotFound;