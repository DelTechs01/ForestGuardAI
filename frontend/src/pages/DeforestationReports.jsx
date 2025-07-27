import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

function DeforestationReports() {
  const [reports, setReports] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/reports`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        if (!response.ok) throw new Error('Failed to fetch reports');
        const data = await response.json();
        setReports(Array.isArray(data) ? data.filter((report) => report.type === 'deforestation').slice(0, 6) : []);
      } catch (err) {
        setError('Unable to load reports.');
        setReports([]);
      }
    };
    fetchReports();
  }, []);

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
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Deforestation Reports</h1>
        <p className="text-lg text-gray-700 max-w-2xl mx-auto">
          In-depth insights to combat deforestation and protect forests.
        </p>
      </motion.section>

      {/* Reports Section */}
      <section className="py-16 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {error && (
          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            className="text-red-600 text-center mb-6"
          >
            {error}
          </motion.div>
        )}
        <motion.div variants={fadeIn} initial="hidden" animate="visible">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Latest Reports</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reports.length > 0 ? (
              reports.map((report) => (
                <div
                  key={report._id}
                  className="bg-white p-6 rounded-lg shadow-sm hover:scale-105 transition-transform duration-300"
                >
                  <h3 className="text-xl font-semibold text-gray-900">{report.title}</h3>
                  <p className="text-gray-700 mt-2">{report.content.slice(0, 100)}...</p>
                  <p className="text-gray-600 text-sm mt-2">{new Date(report.timestamp).toLocaleString()}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-700 col-span-full text-center">No reports available.</p>
            )}
          </div>
        </motion.div>
      </section>
    </div>
  );
}

export default DeforestationReports;