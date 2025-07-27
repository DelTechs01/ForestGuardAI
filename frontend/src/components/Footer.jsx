import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

function Footer() {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    // Placeholder for newsletter API call
    alert('Subscribed! (API call placeholder)');
  };

  return (
    <motion.footer
      initial="hidden"
      animate="visible"
      variants={fadeIn}
      className="bg-green-950 text-gray-200 border-t border-green-700 py-10"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div>
            <Link to="/" className="text-2xl font-bold text-white hover:text-green-200 transition-colors duration-300">
              Forest Guard AI
            </Link>
            <p className="mt-2 text-sm text-gray-400">
              Protecting forests with the power of AI.
            </p>
            <div className="mt-4 flex space-x-4">
              {[
                { name: 'LinkedIn', url: 'https://linkedin.com', icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-1.337-.026-3.058-1.867-3.058-1.867 0-2.152 1.459-2.152 2.965v5.697h-3v-11h2.882v1.509h.04c.401-.758 1.379-1.557 2.837-1.557 3.035 0 3.598 2 3.598 4.604v6.444z"/></svg> },
                { name: 'Twitter', url: 'https://x.com', icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg> },
                { name: 'GitHub', url: 'https://github.com', icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.164 6.839 9.489.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.153-1.109-1.46-1.109-1.46-.905-.619.069-.606.069-.606 1.002.07 1.53 1.03 1.53 1.03.892 1.529 2.341 1.088 2.91.832.092-.647.349-1.088.635-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.646 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.376.203 2.394.1 2.646.641.699 1.028 1.592 1.028 2.683 0 3.841-2.339 4.687-4.566 4.935.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12c0-5.523-4.477-10-10-10z"/></svg> },
              ].map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                  aria-label={`Follow us on ${social.name}`}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Explore</h3>
            <ul className="space-y-2">
              {[
                { to: '/', label: 'Home' },
                { to: '/about', label: 'About Us' },
                { to: '/features', label: 'Features' },
                { to: '/live-monitoring', label: 'Live Monitoring' },
                { to: '/ai-dashboard', label: 'AI Dashboard' },
              ].map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-gray-400 hover:text-white transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Resources</h3>
            <ul className="space-y-2">
              {[
                { to: '/contact', label: 'Contact' },
                { to: '/faq', label: 'FAQs' },
                { to: '/privacy-policy', label: 'Privacy Policy' },
                { to: '/terms', label: 'Terms & Conditions' },
              ].map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-gray-400 hover:text-white transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Get in Touch</h3>
            <ul className="space-y-2 mb-4">
              <li className="text-gray-400">Email: contact@forestguard.ai</li>
              <li className="text-gray-400">Phone: +1 (555) 123-4567</li>
              <li className="text-gray-400">Location: Green Valley, Earth</li>
            </ul>
            <h3 className="text-lg font-semibold text-white mb-4">Newsletter</h3>
            <form onSubmit={handleNewsletterSubmit} className="space-y-2">
              <input
                type="email"
                placeholder="Your Email"
                required
                className="w-full p-2 border border-gray-700 rounded-lg bg-green-900 text-gray-200 focus:ring-2 focus:ring-green-200 focus:border-transparent transition-all duration-300"
              />
              <button
                type="submit"
                className="w-full bg-green-800 text-white p-2 rounded-lg hover:bg-green-200 hover:text-gray-900 transition-all duration-300"
              >
                Subscribe
              </button>
              <p className="text-xs text-gray-400">We respect your privacy.</p>
            </form>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 pt-8 border-t border-green-700 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-400">© 2025 Forest Guard AI. All rights reserved.</p>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <span className="text-sm text-gray-400">Carbon-neutral servers 🌱</span>
            <button
              onClick={handleScrollToTop}
              className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-5 h-5 mr-1" /> Back to top
            </button>
          </div>
        </div>
      </div>
    </motion.footer>
  );
}

export default Footer;