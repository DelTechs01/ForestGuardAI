import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import Features from './pages/Features';
import LiveMonitoring from './pages/LiveMonitoring';
import FireAlerts from './pages/FireAlerts';
import DeforestationReports from './pages/DeforestationReports';
import AIDashboard from './pages/AIDashboard';
import ConservationTips from './pages/ConservationTips';
import NewsUpdates from './pages/NewsUpdates';
import Partners from './pages/Partners';
import ContactUs from './pages/ContactUs';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import FAQ from './pages/FAQ';
import NotFound from './pages/NotFound';

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/features" element={<Features />} />
          <Route path="/live-monitoring" element={<LiveMonitoring />} />
          <Route path="/fire-alerts" element={<FireAlerts />} />
          <Route path="/deforestation-reports" element={<DeforestationReports />} />
          <Route path="/ai-dashboard" element={<AIDashboard />} />
          <Route path="/conservation-tips" element={<ConservationTips />} />
          <Route path="/news-updates" element={<NewsUpdates />} />
          <Route path="/partners" element={<Partners />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
