import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

function FAQ() {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const faqs = [
    {
      question: 'How does ForestGuardAI work?',
      answer: 'ForestGuardAI uses IoT sensors, satellite imagery, and AI-powered analytics to monitor forest conditions, detect illegal activities, and provide real-time alerts for conservation teams.',
      imageUrl: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
    },
    {
      question: 'Can I contribute to conservation efforts?',
      answer: 'Yes! You can sign up as a volunteer, report suspicious activity, or support reforestation initiatives through our community platform.',
      imageUrl: 'https://images.unsplash.com/photo-1611162617210-7d6731fd3bff?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
    },
    {
      question: 'Is the platform free to use?',
      answer: 'ForestGuardAI offers a free tier for basic monitoring and alerts. Premium features for organizations and NGOs are available through subscription.',
      imageUrl: 'https://images.unsplash.com/photo-1440342353244-1d8e08b1e2b0?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
    },
    {
      question: 'How is my data protected?',
      answer: 'We use end-to-end encryption and adhere to international data privacy standards to ensure your information remains secure. See our Privacy Policy for details.',
      imageUrl: 'https://images.unsplash.com/photo-1516321310765-79d3a69dcbc0?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
    },
    {
      question: 'How can local communities benefit?',
      answer: 'Local communities gain access to real-time alerts, educational tools, and conservation funding opportunities by integrating with our platform.',
      imageUrl: 'https://images.unsplash.com/photo-1542601098-8fc114e148e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
    },
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      <motion.section
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        className="py-16 text-center"
      >
        <h1 className="text-4xl font-bold text-green-800 mb-4">Frequently Asked Questions</h1>
        <p className="text-lg text-gray-700 max-w-2xl mx-auto">
          Find answers to common questions about ForestGuardAI and how it supports conservation efforts.
        </p>
      </motion.section>
      <section className="py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div variants={fadeIn} initial="hidden" animate="visible" className="space-y-6">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-md border border-green-100 hover:bg-green-50 transition-all duration-300 flex items-start space-x-4"
            >
              <img
                src={faq.imageUrl}
                alt={faq.question}
                className="w-24 h-24 object-cover rounded-lg"
              />
              <div>
                <h3 className="text-xl font-semibold text-green-900 mb-2">{faq.question}</h3>
                <p className="text-gray-700">{faq.answer}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </section>
      <section className="py-16 bg-green-800 text-white text-center">
        <motion.div variants={fadeIn} initial="hidden" animate="visible" className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-4">Still Have Questions?</h2>
          <Link
            to="/contact"
            className="inline-block bg-white text-green-800 px-6 py-3 rounded-lg hover:bg-green-200 transition-all duration-300"
          >
            Contact Us
          </Link>
        </motion.div>
      </section>
    </div>
  );
}

export default FAQ;