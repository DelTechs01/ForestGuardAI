import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import PropTypes from 'prop-types';
import { Component } from 'react';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

// Error Boundary Component
class DataChartErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="bg-white p-4 rounded-lg shadow-md text-red-500 text-center">
          <p>Unable to display chart. Please try again later.</p>
        </div>
      );
    }
    return this.props.children;
  }
}

DataChartErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
};

function DataChart({ data }) {
  // Ensure data is an array, provide fallback if not
  if (!Array.isArray(data) || data.length === 0) {
    return (
      <div className="bg-white p-4 rounded-lg shadow-md text-gray-500 text-center">
        <p>No data available for the chart.</p>
      </div>
    );
  }

  const chartData = {
    labels: data.map((d) => new Date(d.timestamp).toLocaleTimeString()),
    datasets: [
      {
        label: 'Temperature (°C)',
        data: data.map((d) => d.temperature),
        borderColor: 'red',
        fill: false,
      },
      {
        label: 'Humidity (%)',
        data: data.map((d) => d.humidity),
        borderColor: 'blue',
        fill: false,
      },
      {
        label: 'CO2 (ppm)',
        data: data.map((d) => d.co2),
        borderColor: 'green',
        fill: false,
      },
    ],
  };

  return (
    <DataChartErrorBoundary>
      <div className="bg-white p-4 rounded-lg shadow-md">
        <Line data={chartData} options={{ responsive: true, plugins: { legend: { position: 'top' } } }} />
      </div>
    </DataChartErrorBoundary>
  );
}

DataChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      timestamp: PropTypes.string.isRequired,
      temperature: PropTypes.number.isRequired,
      humidity: PropTypes.number.isRequired,
      co2: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default DataChart;