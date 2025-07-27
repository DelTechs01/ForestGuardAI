import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

function Partners() {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        className="py-16 text-center"
      >
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Partners</h1>
        <p className="text-lg text-gray-700 max-w-2xl mx-auto">
          Collaborating with organizations to protect forests worldwide.
        </p>
      </motion.section>

      {/* Partners Section */}
      <section className="py-16 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {[
            { name: 'Green Earth Foundation', logo: 'https://www.greenearthactionfoundation.org/_next/static/media/new_logo.a889e8f2.png' },
            { name: 'Tech for Nature', logo: 'http://iucngreenlist.org/wp-content/themes/greenlist/images/gl-logo-b.png' },
            { name: 'Global Forest Watch', logo: 'https://via.placeholder.com/150?text=Global+Forest' },
          ].map((partner, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-sm hover:scale-105 transition-transform duration-300 text-center"
            >
              <img src={partner.logo} alt={partner.name} className="h-12 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900">{partner.name}</h3>
            </div>
          ))}
                  </motion.div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-green-800 text-white text-center">
        <motion.div variants={fadeIn} initial="hidden" animate="visible" className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-4">Become a Partner</h2>
          <Link
            to="/contact"
            className="inline-block bg-white text-green-800 px-6 py-3 rounded-lg hover:bg-green-200 transition-all duration-300"
          >
            Get in Touch
          </Link>
        </motion.div>
      </section>
    </div>
  );
}

export default Partners;