import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { io } from 'socket.io-client';
import ProtectedRoute from './ProtectedRoute';

const socket = io(import.meta.env.VITE_SOCKET_URL);

function LiveMonitoring() {
  const [sensorData, setSensorData] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/sensor-data`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        if (!response.ok) throw new Error('Failed to fetch sensor data');
        const data = await response.json();
        setSensorData(Array.isArray(data) ? data.slice(0, 10) : []);
      } catch (err) {
        setError('Unable to load sensor data.');
        setSensorData([]);
      }
    };
    fetchData();

    socket.on('sensorUpdate', (data) => {
      setSensorData((prev) => [data, ...prev.slice(0, 9)]);
    });
    socket.on('alertUpdate', (alert) => {
      setAlerts((prev) => [alert, ...prev.slice(0, 4)]);
    });

    return () => {
      socket.off('sensorUpdate');
      socket.off('alertUpdate');
    };
  }, []);

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <ProtectedRoute>
      <div className="bg-gray-50 min-h-screen">
        <motion.section
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="py-16 text-center"
        >
          <h1 className="text-4xl font-bold text-green-800 mb-4">Live Forest Monitoring</h1>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Real-time environmental data to detect and respond to forest threats instantly.
          </p>
        </motion.section>
        <section className="py-16 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {error && (
            <motion.div
              variants={fadeIn}
              initial="hidden"
              animate="visible"
              className="text-red-500 text-center mb-6"
            >
              {error}
            </motion.div>
          )}
          <motion.div variants={fadeIn} initial="hidden" animate="visible" className="mb-12">
            <h2 className="text-2xl font-semibold text-green-900 mb-4">Sensor Data</h2>
            <div className="bg-white p-6 rounded-xl shadow-md">
              {/* Placeholder for DataChart component */}
              <div className="h-64 flex items-center justify-center bg-gray-100 rounded-lg">
                <img
                  src="https://images.unsplash.com/photo-1516321310765-79d3a69dcbc0?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                  alt="Sensor Data Chart"
                  className="max-h-full rounded-lg"
                />
              </div>
            </div>
          </motion.div>
          <motion.div variants={fadeIn} initial="hidden" animate="visible">
            <h2 className="text-2xl font-semibold text-green-900 mb-4">Latest Alerts</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {alerts.length > 0 ? (
                alerts.map((alert) => (
                  <div
                    key={alert._id}
                    className="bg-green-100 p-6 rounded-xl shadow-md hover:scale-105 transition-transform duration-300"
                  >
                    <p className="text-green-900 font-semibold">{alert.severity}</p>
                    <p className="text-gray-700">{alert.location}</p>
                    <p className="text-gray-700">{alert.message}</p>
                    <p className="text-gray-600 text-sm">{new Date(alert.timestamp).toLocaleString()}</p>
                  </div>
                ))
              ) : (
                <p className="text-gray-700 col-span-full text-center">No alerts available.</p>
              )}
            </div>
          </motion.div>
        </section>
        <section className="py-16 bg-green-800 text-white">
          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
          >
            <h2 className="text-3xl font-bold mb-4">Interactive Map</h2>
            <div className="bg-gray-100 h-96 rounded-xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1454789476662-53eb23ba5907?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
                alt="Interactive Forest Map"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        </section>
      </div>
    </ProtectedRoute>
  );
}

export default LiveMonitoring;