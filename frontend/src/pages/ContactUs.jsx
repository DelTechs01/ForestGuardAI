// frontend/src/pages/ContactUs.jsx
import { useState } from 'react';
import { motion } from 'framer-motion';

function ContactUs() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Submitting...');
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'; // Fallback URL
    try {
      const response = await fetch(`${apiUrl}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!response.ok) throw new Error('Failed to send message');
      setStatus('Message sent successfully!');
      setFormData({ name: '', email: '', message: '' });
    } catch (err) {
      setStatus('Failed to send message. Try again.');
    }
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        className="py-16 bg-[url('https://images.unsplash.com/photo-1448375240586-882707db888b')] bg-cover bg-center h-64 flex items-center justify-center text-white"
      >
        <div className="text-center bg-green-800/30 backdrop-blur-sm p-6 rounded-lg">
          <h1 className="text-4xl font-bold mb-4 drop-shadow-lg">Contact Us</h1>
          <p className="text-lg max-w-2xl drop-shadow-lg">
            Have questions or want to join our mission? Reach out to us.
          </p>
        </div>
      </motion.section>

      {/* Contact Form and Image Section */}
      <section className="py-16 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form (Left) */}
          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            className="bg-white/80 backdrop-blur-md p-8 rounded-xl shadow-lg space-y-6"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">
              Send Us a Message
            </h2>
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
                  className="w-full p-3 bg-gray-50/50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-200 focus:border-green-800 transition-all duration-300 placeholder-gray-400"
                  placeholder="Your Name"
                  aria-required="true"
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
                  className="w-full p-3 bg-gray-50/50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-200 focus:border-green-800 transition-all duration-300 placeholder-gray-400"
                  placeholder="Your Email"
                  aria-required="true"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-gray-900 font-semibold mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  className="w-full p-3 bg-gray-50/50 border border-gray-200 rounded-lg h-32 focus:ring-2 focus:ring-green-200 focus:border-green-800 transition-all duration-300 placeholder-gray-400"
                  placeholder="Your Message"
                  aria-required="true"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-green-800 text-white p-3 rounded-lg hover:bg-green-200 hover:text-gray-900 transition-all duration-300 focus:ring-2 focus:ring-green-200 focus:outline-none"
              >
                Send Message
              </button>
              {status && (
                <p
                  className={`text-center ${status.includes('successfully') ? 'text-green-800' : 'text-red-600'}`}
                  role="status"
                >
                  {status}
                </p>
              )}
            </form>
          </motion.div>

          {/* Image with Overlaid Text (Right) */}
          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            className="relative h-96 lg:h-[600px] rounded-lg overflow-hidden hover:scale-[1.02] transition-transform duration-300"
          >
            <img
              src="https://images.unsplash.com/photo-1448375240586-882707db888b"
              alt="Serene forest landscape with mist"
              className="w-full h-full object-cover"
              onLoad={() => setImageLoaded(true)}
              onError={(e) => {
                setImageLoaded(false);
                e.target.src = 'https://via.placeholder.com/600x400?text=Fallback+Forest';
              }}
            />
            <div className="absolute inset-0 bg-green-800 bg-opacity-10 flex items-center justify-center rounded-lg">
              <div className="text-center text-white p-8">
                <h3 className="text-3xl font-bold mb-3 drop-shadow-lg">Join Our Mission</h3>
                <p className="text-lg max-w-sm drop-shadow-lg">
                  Together, we can protect forests for future generations using AI-driven insights.
                </p>
              </div>
            </div>
            {!imageLoaded && (
              <p className="absolute top-2 left-2 text-red-500 text-sm">Image failed to load</p>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  );
}

export default ContactUs;