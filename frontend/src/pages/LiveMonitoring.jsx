import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { io } from 'socket.io-client';
import DataChart from '../components/DataChart';

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
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        className="py-16 text-center"
      >
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Live Forest Monitoring</h1>
        <p className="text-lg text-gray-700 max-w-2xl mx-auto">
          Real-time environmental data to detect and respond to forest threats instantly.
        </p>
      </motion.section>

      {/* Chart and Alerts Section */}
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
        <motion.div variants={fadeIn} initial="hidden" animate="visible" className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Sensor Data</h2>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <DataChart data={sensorData} />
          </div>
        </motion.div>
        <motion.div variants={fadeIn} initial="hidden" animate="visible">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Latest Alerts</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {alerts.length > 0 ? (
              alerts.map((alert) => (
                <div
                  key={alert._id}
                  className="bg-green-200 bg-opacity-30 backdrop-blur-sm p-6 rounded-lg shadow-sm hover:scale-105 transition-transform duration-300"
                >
                  <p className="text-gray-900 font-semibold">{alert.severity}</p>
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

      {/* Map Placeholder Section */}
      <section className="py-16 bg-green-800 text-white">
        <motion.div
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        >
          <h2 className="text-3xl font-bold mb-4">Interactive Map</h2>
          <p className="text-lg mb-6">Visualize forest threats in real-time (Map coming soon).</p>
          <div className="bg-gray-50 h-64 rounded-lg flex items-center justify-center text-gray-700">
            Map Placeholder
          </div>
        </motion.div>
      </section>
    </div>
  );
}

export default LiveMonitoring;