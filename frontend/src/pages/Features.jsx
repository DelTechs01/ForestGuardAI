import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

function Features() {
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
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Features</h1>
        <p className="text-lg text-gray-700 max-w-2xl mx-auto">
          Discover how Forest Guard AI empowers conservation with cutting-edge tools.
        </p>
      </motion.section>

      {/* Features Grid */}
      <section className="py-16 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {[
            {
              title: 'Real-Time Monitoring',
              description: 'Track temperature, humidity, and CO2 levels live.',
              icon: '📊',
              link: '/live-monitoring',
            },
            {
              title: 'Fire Alerts',
              description: 'Instant notifications for fire risks.',
              icon: '🔔',
              link: '/fire-alerts',
            },
            {
              title: 'Deforestation Reports',
              description: 'Detailed insights on forest health.',
              icon: '📋',
              link: '/deforestation-reports',
            },
            {
              title: 'AI Dashboard',
              description: 'Actionable insights powered by AI.',
              icon: '🧠',
              link: '/ai-dashboard',
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              variants={fadeIn}
              initial="hidden"
              animate="visible"
              className="bg-white p-6 rounded-lg shadow-sm hover:scale-105 transition-transform duration-300 text-center"
            >
              <span className="text-4xl mb-4 block">{feature.icon}</span>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-700">{feature.description}</p>
              <Link
                to={feature.link}
                className="mt-4 inline-block text-green-800 hover:text-green-200 transition-colors duration-300"
              >
                Learn More
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-green-800 text-white text-center">
        <motion.div variants={fadeIn} initial="hidden" animate="visible" className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-4">Start Protecting Forests Today</h2>
          <Link
            to="/signup"
            className="inline-block bg-white text-green-800 px-6 py-3 rounded-lg hover:bg-green-200 transition-all duration-300"
          >
            Get Started
          </Link>
        </motion.div>
      </section>
    </div>
  );
}

export default Features;