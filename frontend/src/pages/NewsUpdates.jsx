import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

function NewsUpdates() {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  // Placeholder news data (replace with API call if available)
  const news = [
    {
      id: 1,
      title: 'New AI Model Enhances Fire Detection',
      excerpt: 'Our latest AI model improves fire detection accuracy by 20%.',
      date: '2025-07-20',
    },
    {
      id: 2,
      title: 'Partnership with Global Forest Watch',
      excerpt: 'We’ve teamed up to expand our monitoring capabilities.',
      date: '2025-07-15',
    },
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        className="py-16 text-center"
      >
        <h1 className="text-4xl font-bold text-gray-900 mb-4">News & Updates</h1>
        <p className="text-lg text-gray-700 max-w-2xl mx-auto">
          Stay updated with the latest from Forest Guard AI.
        </p>
      </motion.section>

      {/* News Section */}
      <section className="py-16 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div variants={fadeIn} initial="hidden" animate="visible">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Recent Updates</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {news.length > 0 ? (
              news.map((item) => (
                <div
                  key={item.id}
                  className="bg-white p-6 rounded-lg shadow-sm hover:scale-105 transition-transform duration-300"
                >
                  <h3 className="text-xl font-semibold text-gray-900">{item.title}</h3>
                  <p className="text-gray-700 mt-2">{item.excerpt}</p>
                  <p className="text-gray-600 text-sm mt-2">{new Date(item.date).toLocaleDateString()}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-700 col-span-full text-center">No updates available.</p>
            )}
          </div>
        </motion.div>
      </section>
    </div>
  );
}

export default NewsUpdates;