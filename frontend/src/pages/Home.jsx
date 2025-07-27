import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { io } from 'socket.io-client';
import DataChart from '../components/DataChart';

const socket = io(import.meta.env.VITE_SOCKET_URL);

function Home() {
  const [sensorData, setSensorData] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [reports, setReports] = useState([]);
  const [error, setError] = useState(null); // Add state for error handling

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [sensorRes, alertRes, reportRes] = await Promise.all([
          axios.get(`${import.meta.env.VITE_API_URL}/sensor-data`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
          }).catch(() => ({ data: [] })), // Fallback to empty array
          axios.get(`${import.meta.env.VITE_API_URL}/alerts`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
          }).catch(() => ({ data: [] })), // Fallback to empty array
          axios.get(`${import.meta.env.VITE_API_URL}/reports`).catch(() => ({ data: [] })), // Fallback to empty array
        ]);

        // Ensure data is an array before filtering or slicing
        setSensorData(Array.isArray(sensorRes.data) ? sensorRes.data.slice(0, 10) : []);
        setAlerts(Array.isArray(alertRes.data) ? alertRes.data.filter((alert) => alert.type === 'fire').slice(0, 3) : []);
        setReports(Array.isArray(reportRes.data) ? reportRes.data.filter((report) => report.type === 'deforestation').slice(0, 3) : []);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to load data. Please try again later.');
        // Ensure states are reset to empty arrays on error
        setSensorData([]);
        setAlerts([]);
        setReports([]);
      }
    };
    fetchData();

    socket.on('sensorUpdate', (data) => {
      setSensorData((prev) => [data, ...prev.slice(0, 9)]);
    });
    socket.on('alertUpdate', (alert) => {
      if (alert.type === 'fire') {
        setAlerts((prev) => [alert, ...prev.slice(0, 2)]);
      }
    });

    return () => {
      socket.off('sensorUpdate');
      socket.off('alertUpdate');
    };
  }, []);

  if (error) {
    return (
      <div className="max-w-6xl mx-auto p-4 text-red-500 text-center">
        <p>{error}</p>
        <Link to="/" className="text-green-600 hover:underline">Try Again</Link>
      </div>
    );
  }

  return (
    <div className="bg-gray-100">
      {/* Hero Section */}
      <section className="bg-cover bg-center h-screen text-white flex items-center justify-center" style={{ backgroundImage: 'url(https://i.pinimg.com/736x/ee/0f/3a/ee0f3a01dbfd47cd9bb77ef534255a34.jpg)' }}>
        <div className="text-center">
          <h1 className="text-5xl font-bold mb-4">Forest Guard AI</h1>
          <p className="text-xl mb-6">Protecting forests with real-time AI-powered monitoring and actionable insights.</p>
          <div className="space-x-4">
            <Link to="/live-monitoring" className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700">Live Monitoring</Link>
            <Link to="/signup" className="border-2 border-white text-white px-6 py-3 rounded-lg hover:bg-white hover:text-green-800">Get Started</Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Our Features</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <svg className="w-12 h-12 mx-auto text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17V7m0 10h6m-6 0H3m6 0h6m0-10v10m0-10H9m6 0h6"></path></svg>
              <h3 className="text-xl font-semibold mt-4">Real-Time Monitoring</h3>
              <p>Track temperature, humidity, and CO2 levels live.</p>
            </div>
            <div className="text-center">
              <svg className="w-12 h-12 mx-auto text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              <h3 className="text-xl font-semibold mt-4">Fire Alerts</h3>
              <p>Instant notifications for fire risks.</p>
            </div>
            <div className="text-center">
              <svg className="w-12 h-12 mx-auto text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
              <h3 className="text-xl font-semibold mt-4">Deforestation Reports</h3>
              <p>Detailed insights on forest health.</p>
            </div>
            <div className="text-center">
              <svg className="w-12 h-12 mx-auto text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
              <h3 className="text-xl font-semibold mt-4">Conservation Tools</h3>
              <p>Resources to support forest preservation.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Live Data Preview */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Live Forest Monitoring</h2>
          <DataChart data={sensorData} />
        </div>
      </section>

      {/* AI Dashboard Teaser */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">AI-Powered Insights</h2>
          <p className="max-w-2xl mx-auto mb-6">Our AI Dashboard analyzes environmental data to detect threats like fires and deforestation, providing actionable insights for conservation.</p>
          <Link to="/ai-dashboard" className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700">Explore AI Dashboard</Link>
        </div>
      </section>

      {/* Alerts and Reports Summary */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Recent Activity</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Fire Alerts</h3>
              {alerts.length > 0 ? (
                alerts.map((alert) => (
                  <div key={alert._id} className="bg-white p-4 rounded-lg shadow-md mb-4">
                    <p><strong>Severity:</strong> {alert.severity}</p>
                    <p><strong>Location:</strong> {alert.location}</p>
                    <p><strong>Message:</strong> {alert.message}</p>
                    <p><strong>Time:</strong> {new Date(alert.timestamp).toLocaleString()}</p>
                  </div>
                ))
              ) : (
                <p>No fire alerts available.</p>
              )}
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Deforestation Reports</h3>
              {reports.length > 0 ? (
                reports.map((report) => (
                  <div key={report._id} className="bg-white p-4 rounded-lg shadow-md mb-4">
                    <h4 className="font-semibold">{report.title}</h4>
                    <p>{report.content.slice(0, 100)}...</p>
                    <p><strong>Time:</strong> {new Date(report.timestamp).toLocaleString()}</p>
                  </div>
                ))
              ) : (
                <p>No deforestation reports available.</p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Conservation Tips */}
      <section className="py-16 bg-white text-center">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-4">Join the Conservation Movement</h2>
          <p className="max-w-2xl mx-auto mb-6">Take action to protect our forests with these simple tips:</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
            <p>Reduce paper usage to decrease deforestation.</p>
            <p>Support reforestation initiatives in your community.</p>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Our Partners</h2>
          <div className="flex justify-center space-x-8">
            <img src="https://www.greenearthactionfoundation.org/_next/static/media/new_logo.a889e8f2.png" alt="Green Earth Foundation" className="h-12" />
            <img src="http://iucngreenlist.org/wp-content/themes/greenlist/images/gl-logo-b.png" alt="Tech for Nature" className="h-12" />
            <img src="data:image/png;base64,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" alt="Global Forest Watch" className="h-12" />
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-green-800 text-white text-center">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-4">Join Forest Guard AI Today</h2>
          <Link to="/signup" className="bg-white text-green-800 px-6 py-3 rounded-lg hover:bg-gray-200">Sign Up Now</Link>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-green-800 mb-8">Get in Touch</h2>
          <p className="text-center text-gray-600 mb-10">
            Have questions, suggestions, or want to collaborate? Fill out the form below and we’ll get back to you soon.
          </p>
          <form className="space-y-6 bg-white p-8 rounded-xl shadow-md border border-gray-200">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Your full name"
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 transition"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="your@email.com"
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 transition"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
              <textarea
                id="message"
                name="message"
                placeholder="Write your message here..."
                required
                className="w-full p-3 border border-gray-300 rounded-lg h-32 resize-none focus:outline-none focus:ring-2 focus:ring-green-600 transition"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-green-700 text-white font-semibold py-3 rounded-lg hover:bg-green-800 transition duration-300"
            >
              Send Message
            </button>
          </form>
        </div>
      </section>

    </div>
  );
}

export default Home;