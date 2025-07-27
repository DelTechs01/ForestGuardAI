import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false); // State for mobile menu toggle
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-green-900 bg-opacity-80 shadow-md fixed w-full z-10 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Navigation Links (Left) */}
          <div className="flex items-center space-x-8">
            <Link to="/" className="text-2xl font-bold text-white hover:text-green-300 transition-colors duration-300">
              Forest Guard AI
            </Link>
            <div className="hidden md:flex space-x-6">
              <Link to="/about" className="text-white text-lg hover:text-green-300 transition-colors duration-300">
                About
              </Link>
              <Link to="/live-monitoring" className="text-white text-lg hover:text-green-300 transition-colors duration-300">
                Live Monitoring
              </Link>
              <Link to="/contact" className="text-white text-lg hover:text-green-300 transition-colors duration-300">
                Contact
              </Link>
            </div>
          </div>

          {/* Authentication Options (Right) */}
          <div className="hidden md:flex items-center space-x-6">
            {token ? (
              <button
                onClick={handleLogout}
                className="text-white text-lg hover:text-green-300 transition-colors duration-300"
              >
                Logout
              </button>
            ) : (
              <>
                <Link to="/login" className="text-white text-lg hover:text-green-300 transition-colors duration-300">
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-green-700 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors duration-300"
                >
                  Signup
                </Link>
              </>
            )}
          </div>

          {/* Hamburger Menu Button (Mobile) */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="text-white focus:outline-none hover:text-green-300 transition-colors duration-300"
              aria-label="Toggle menu"
            >
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu (Collapsible) */}
        <div className={`${isOpen ? 'block' : 'hidden'} md:hidden bg-green-900 bg-opacity-90 px-4 pt-4 pb-6`}>
          <div className="flex flex-col space-y-4">
            <Link
              to="/about"
              onClick={toggleMenu}
              className="text-white text-lg hover:text-green-300 transition-colors duration-300"
            >
              About
            </Link>
            <Link
              to="/live-monitoring"
              onClick={toggleMenu}
              className="text-white text-lg hover:text-green-300 transition-colors duration-300"
            >
              Live Monitoring
            </Link>
            <Link
              to="/contact"
              onClick={toggleMenu}
              className="text-white text-lg hover:text-green-300 transition-colors duration-300"
            >
              Contact
            </Link>
            {token ? (
              <button
                onClick={() => {
                  handleLogout();
                  toggleMenu();
                }}
                className="text-white text-lg hover:text-green-300 transition-colors duration-300 text-left"
              >
                Logout
              </button>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={toggleMenu}
                  className="text-white text-lg hover:text-green-300 transition-colors duration-300"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  onClick={toggleMenu}
                  className="bg-green-700 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors duration-300 text-center"
                >
                  Signup
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;