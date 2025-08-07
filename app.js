import React, { useState, useEffect } from 'react';

// Main App component for the HVAC dashboard
const App = () => {
  // State to hold all the sensor data
  const [hvacData, setHvacData] = useState({
    outdoor: {
      compressorAmps: 0.0,
      capacitorReading: 0.0,
      condenserFanAmps: 0.0,
      dischargeTemp: 0.0,
      suctionTemp: 0.0,
    },
    indoor: {
      indoorBlowerAmps: 0.0,
      deltaT: 0.0,
      staticPressure: 0.0,
    },
  });

  // A function to simulate new data from the sensors
  // In a real-world scenario, this would be replaced with a call to your physical device
  const fetchSensorData = () => {
    // Generate some random, realistic-looking data for simulation
    const newOutdoorData = {
      compressorAmps: (Math.random() * 20 + 5).toFixed(2), // 5-25 Amps
      capacitorReading: (Math.random() * 5 + 40).toFixed(1), // 40-45 Microfarads
      condenserFanAmps: (Math.random() * 2 + 1).toFixed(2), // 1-3 Amps
      dischargeTemp: (Math.random() * 15 + 120).toFixed(1), // 120-135°F
      suctionTemp: (Math.random() * 5 + 40).toFixed(1), // 40-45°F
    };

    const newIndoorData = {
      indoorBlowerAmps: (Math.random() * 1.5 + 2).toFixed(2), // 2-3.5 Amps
      supplyTemp: (Math.random() * 5 + 50).toFixed(1), // To calculate delta T
      returnTemp: (Math.random() * 5 + 70).toFixed(1), // To calculate delta T
      staticPressure: (Math.random() * 0.2 + 0.3).toFixed(2), // 0.3-0.5 InH2O
    };

    // Calculate Delta T
    const deltaT = (newIndoorData.returnTemp - newIndoorData.supplyTemp).toFixed(1);

    // Update the state with the new simulated data
    setHvacData({
      outdoor: newOutdoorData,
      indoor: {
        ...newIndoorData,
        deltaT: deltaT,
      },
    });
  };

  // Use useEffect to fetch data every 2 seconds, mimicking real-time updates
  useEffect(() => {
    const interval = setInterval(fetchSensorData, 2000); // Poll for data every 2 seconds
    return () => clearInterval(interval); // Cleanup function to clear the interval
  }, []);

  // Helper component to render a single data point
  const DataPoint = ({ label, value, unit }) => (
    <div className="flex flex-col items-center p-4 m-2 bg-white/10 backdrop-blur-sm rounded-xl shadow-lg">
      <span className="text-sm font-semibold text-gray-300">{label}</span>
      <span className="mt-1 text-2xl font-bold text-white">
        {value}
        <span className="text-base font-normal text-gray-400">{unit}</span>
      </span>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-8 flex items-center justify-center font-sans">
      <div className="max-w-4xl w-full bg-gray-800 p-8 rounded-3xl shadow-2xl">
        <header className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-white leading-tight">
            HVAC System Monitor
          </h1>
          <p className="mt-2 text-lg text-gray-400">
            Real-time diagnostics for your home's comfort system.
          </p>
        </header>

        {/* Outdoor Unit Section */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
            <svg className="w-6 h-6 mr-2 text-green-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 2a8 8 0 100 16 8 8 0 000-16zM5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z" />
            </svg>
            Outdoor Unit
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <DataPoint label="Compressor Amps" value={hvacData.outdoor.compressorAmps} unit=" A" />
            <DataPoint label="Capacitor Reading" value={hvacData.outdoor.capacitorReading} unit=" µF" />
            <DataPoint label="Condenser Fan Amps" value={hvacData.outdoor.condenserFanAmps} unit=" A" />
            <DataPoint label="Discharge Temp" value={hvacData.outdoor.dischargeTemp} unit="°F" />
            <DataPoint label="Suction Temp" value={hvacData.outdoor.suctionTemp} unit="°F" />
          </div>
        </section>

        {/* Indoor Unit Section */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
            <svg className="w-6 h-6 mr-2 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 2a8 8 0 100 16 8 8 0 000-16zM8.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4a1 1 0 00-1.414-1.414L10 11.586l-1.293-1.293z" />
            </svg>
            Indoor Unit
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <DataPoint label="Indoor Blower Amps" value={hvacData.indoor.indoorBlowerAmps} unit=" A" />
            <DataPoint label="Delta T" value={hvacData.indoor.deltaT} unit="°F" />
            <DataPoint label="Static Pressure" value={hvacData.indoor.staticPressure} unit=" inH₂O" />
          </div>
        </section>

        <footer className="mt-10 text-center text-gray-500">
          <p className="text-sm">Data refreshes every 2 seconds.</p>
        </footer>
      </div>
    </div>
  );
};

export default App;
