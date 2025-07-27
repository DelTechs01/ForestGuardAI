import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { io } from 'socket.io-client';

const socket = io(import.meta.env.VITE_SOCKET_URL);

function FireAlerts() {
  const [alerts, setAlerts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/alerts`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        if (!response.ok) throw new Error('Failed to fetch alerts');
        const data = await response.json();
        setAlerts(Array.isArray(data) ? data.filter((alert) => alert.type === 'fire').slice(0, 6) : []);
      } catch (err) {
        setError('Unable to load alerts.');
        setAlerts([]);
      }
    };
    fetchAlerts();

    socket.on('alertUpdate', (alert) => {
      if (alert.type === 'fire') {
        setAlerts((prev) => [alert, ...prev.slice(0, 5)]);
      }
    });

    return () => socket.off('alertUpdate');
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
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Fire Alerts</h1>
        <p className="text-lg text-gray-700 max-w-2xl mx-auto">
          Stay informed with real-time fire risk notifications.
        </p>
      </motion.section>

      {/* Alerts Section */}
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
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Latest Fire Alerts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {alerts.length > 0 ? (
              alerts.map((alert) => (
                <div
                  key={alert._id}
                  className="bg-white p-6 rounded-lg shadow-sm hover:scale-105 transition-transform duration-300"
                >
                  <p className="text-gray-900 font-semibold">{alert.severity}</p>
                  <p className="text-gray-700">{alert.location}</p>
                  <p className="text-gray-700">{alert.message}</p>
                  <p className="text-gray-600 text-sm">{new Date(alert.timestamp).toLocaleString()}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-700 col-span-full text-center">No fire alerts available.</p>
            )}
          </div>
        </motion.div>
      </section>
    </div>
  );
}

export default FireAlerts;