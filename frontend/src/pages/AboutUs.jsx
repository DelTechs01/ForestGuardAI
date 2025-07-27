import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

function About() {
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
        className="bg-[url('/assets/forest-bg.jpg')] bg-cover bg-center h-96 flex items-center justify-center"
      >
        <div className="bg-green-800 bg-opacity-30 backdrop-blur-sm p-8 rounded-lg text-center max-w-2xl mx-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Our Mission</h1>
          <p className="text-lg md:text-xl text-white">
            Protecting forests with AI-driven insights and real-time monitoring.
          </p>
        </div>
      </motion.section>

      {/* Story Section */}
      <section className="py-16 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div variants={fadeIn} initial="hidden" animate="visible" className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Why We Exist</h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Forests are vital to our planet’s health, yet they face growing threats from fires and deforestation. Forest Guard AI empowers communities and conservationists with technology to monitor and protect these ecosystems.
          </p>
        </motion.div>
      </section>

      {/* Impact Section */}
      <section className="py-16 bg-green-800 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            className="text-3xl font-bold text-center mb-12"
          >
            Our Impact
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { value: '1M+', label: 'Hectares Monitored', icon: '🌍' },
              { value: '10K+', label: 'Alerts Issued', icon: '🔔' },
              { value: '500+', label: 'Partners Engaged', icon: '🤝' },
            ].map((stat, index) => (
              <motion.div
                key={index}
                variants={fadeIn}
                initial="hidden"
                animate="visible"
                className="bg-green-200 bg-opacity-30 backdrop-blur-sm p-6 rounded-lg text-center hover:scale-105 transition-transform duration-300"
              >
                <span className="text-4xl mb-2 block">{stat.icon}</span>
                <h3 className="text-2xl font-semibold">{stat.value}</h3>
                <p className="text-lg">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 text-center">
        <motion.div variants={fadeIn} initial="hidden" animate="visible" className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Join Our Mission</h2>
          <p className="text-lg text-gray-700 mb-6">
            Help protect forests by signing up for real-time monitoring and insights.
          </p>
          <Link
            to="/signup"
            className="inline-block bg-green-800 text-white px-6 py-3 rounded-lg hover:bg-green-200 hover:text-gray-900 transition-all duration-300"
          >
            Get Started
          </Link>
        </motion.div>
      </section>
    </div>
  );
}

export default About;