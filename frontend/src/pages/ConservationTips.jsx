import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

function ConservationTips() {
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
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Conservation Tips</h1>
        <p className="text-lg text-gray-700 max-w-2xl mx-auto">
          Simple actions you can take to protect our forests.
        </p>
      </motion.section>

      {/* Tips Section */}
      <section className="py-16 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div variants={fadeIn} initial="hidden" animate="visible" className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            {
              title: 'Reduce Paper Usage',
              description: 'Opt for digital documents and recycle paper products to decrease deforestation.',
              icon: '📄',
            },
            {
              title: 'Support Reforestation',
              description: 'Donate to or volunteer with organizations planting trees in your community.',
              icon: '🌱',
            },
            {
              title: 'Spread Awareness',
              description: 'Share Forest Guard AI’s mission to educate others about forest conservation.',
              icon: '📢',
            },
            {
              title: 'Sustainable Choices',
              description: 'Choose products certified by sustainable forestry initiatives.',
              icon: '🛒',
            },
          ].map((tip, index) => (
            <motion.div
              key={index}
              variants={fadeIn}
              initial="hidden"
              animate="visible"
              className="bg-white p-6 rounded-lg shadow-sm hover:scale-105 transition-transform duration-300"
            >
              <span className="text-4xl mb-4 block">{tip.icon}</span>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{tip.title}</h3>
              <p className="text-gray-700">{tip.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-green-800 text-white text-center">
        <motion.div variants={fadeIn} initial="hidden" animate="visible" className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-4">Join the Movement</h2>
          <Link
            to="/signup"
            className="inline-block bg-white text-green-800 px-6 py-3 rounded-lg hover:bg-green-200 transition-all duration-300"
          >
            Get Involved
          </Link>
        </motion.div>
      </section>
    </div>
  );
}

export default ConservationTips;