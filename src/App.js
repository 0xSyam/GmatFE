import './App.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import React, { useState, useEffect } from 'react';
import Plot from "react-plotly.js";
import L from 'leaflet';

// Import gambar ikon Leaflet yang diperlukan
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';

// Mengatur ikon default untuk marker Leaflet
L.Icon.Default.mergeOptions({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const MAX_POINTS = 8; // Jumlah maksimum titik data yang akan ditampilkan di grafik

// Komponen untuk menampilkan grafik garis ganda (Latitude dan Longitude)
const DualLineChart = ({ time }) => {
  const [data1, setData1] = useState({
    x: [time],
    y: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
    type: "scatter",
    mode: "lines+markers",
    name: "Latitude",
    marker: { color: "blue" },
    line: { shape: "spline" } // Garis melengkung
  });

  const [data2, setData2] = useState({
    x: [time],
    y: [16],
    type: "scatter",
    mode: "lines+markers",
    name: "Longitude",
    marker: { color: "red" },
    line: { shape: "spline" } // Garis melengkung
  });

  useEffect(() => {
    setData1(prevData => {
      const newX = [...prevData.x, time];
      const newY = [...prevData.y, Math.floor(Math.random() * 70) + 1];
      return {
        ...prevData,
        x: newX.length > MAX_POINTS ? newX.slice(-MAX_POINTS) : newX,
        y: newY.length > MAX_POINTS ? newY.slice(-MAX_POINTS) : newY
      };
    });

    setData2(prevData => {
      const newX = [...prevData.x, time];
      const newY = [...prevData.y, Math.floor(Math.random() * 80) + 1];
      return {
        ...prevData,
        x: newX.length > MAX_POINTS ? newX.slice(-MAX_POINTS) : newX,
        y: newY.length > MAX_POINTS ? newY.slice(-MAX_POINTS) : newY
      };
    });
  }, [time]);

  const layout = {
    xaxis: { title: "Time" },
    yaxis: { title: "Value" },
    showlegend: true,
  };

  return (
    <Plot
      data={[data1, data2]}
      layout={layout}
      style={{ width: "100%", height: "100%" }}
    />
  );
};

// Komponen untuk menampilkan grafik garis tegangan
const VoltageLineChart = ({ time }) => {
  const [data, setData] = useState({
    x: [time],
    y: [10],
    type: "scatter",
    mode: "lines+markers",
    name: "Voltage",
    marker: { color: "blue" },
    line: { shape: "spline" } // Garis melengkung
  });

  useEffect(() => {
    setData(prevData => {
      const newX = [...prevData.x, time];
      const newY = [...prevData.y, Math.floor(Math.random() * 20) + 1];
      return {
        ...prevData,
        x: newX.length > MAX_POINTS ? newX.slice(-MAX_POINTS) : newX,
        y: newY.length > MAX_POINTS ? newY.slice(-MAX_POINTS) : newY
      };
    });
  }, [time]);

  const layout = {
    title: "Voltage Line Chart",
    xaxis: { title: "Time" },
    yaxis: { title: "Value" },
    showlegend: true,
  };

  return (
    <Plot
      data={[data]}
      layout={layout}
      style={{ width: "100%", height: "400px" }} // Pastikan grafik memiliki tinggi yang ditentukan
    />
  );
};

// Komponen untuk menampilkan grafik garis tekanan
const PressureLineChart = ({ time }) => {
  const [data, setData] = useState({
    x: [time],
    y: [10],
    type: "scatter",
    mode: "lines+markers",
    name: "Pressure",
    marker: { color: "green" },
    line: { shape: "spline" } // Garis melengkung
  });

  useEffect(() => {
    setData(prevData => {
      const newX = [...prevData.x, time];
      const newY = [...prevData.y, Math.floor(Math.random() * 20) + 1];
      return {
        ...prevData,
        x: newX.length > MAX_POINTS ? newX.slice(-MAX_POINTS) : newX,
        y: newY.length > MAX_POINTS ? newY.slice(-MAX_POINTS) : newY
      };
    });
  }, [time]);

  const layout = {
    title: "Pressure Line Chart",
    xaxis: { title: "Time" },
    yaxis: { title: "Value" },
    showlegend: true,
  };

  return (
    <Plot
      data={[data]}
      layout={layout}
      style={{ width: "100%", height: "400px" }} // Pastikan grafik memiliki tinggi yang ditentukan
    />
  );
};

// Komponen untuk menampilkan grafik garis ketinggian
const AltitudeLineChart = ({ time }) => {
  const [data, setData] = useState({
    x: [time],
    y: [10],
    type: "scatter",
    mode: "lines+markers",
    name: "Altitude",
    marker: { color: "red" },
    line: { shape: "spline" } // Garis melengkung
  });

  useEffect(() => {
    setData(prevData => {
      const newX = [...prevData.x, time];
      const newY = [...prevData.y, Math.floor(Math.random() * 20) + 1];
      return {
        ...prevData,
        x: newX.length > MAX_POINTS ? newX.slice(-MAX_POINTS) : newX,
        y: newY.length > MAX_POINTS ? newY.slice(-MAX_POINTS) : newY
      };
    });
  }, [time]);

  const layout = {
    title: "Altitude Line Chart",
    xaxis: { title: "Time" },
    yaxis: { title: "Value" },
    showlegend: true,
  };

  return (
    <Plot
      data={[data]}
      layout={layout}
      style={{ width: "100%", height: "400px" }} // Pastikan grafik memiliki tinggi yang ditentukan
    />
  );
};

// Komponen utama aplikasi
function App() {
  const position = [51.505, -0.09]; // Posisi default untuk peta
  const [time, setTime] = useState(0); // State untuk waktu

  // Menggunakan useEffect untuk memperbarui waktu setiap detik
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(prevTime => prevTime + 1);
    }, 1000);

    return () => clearInterval(interval); // Membersihkan interval saat komponen unmount
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="bg-gradient-to-r from-blue-600 to-blue-900 text-white p-4 flex justify-between items-center">
        <h1 className="text-2xl">GMAT</h1>
        <div>
          ID Team : 12345
          <span className="ml-4">Time: {time}s</span>
        </div>
      </header>
      
      <main className="flex-1 p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="bg-white p-4 rounded shadow">
            <h3 className="text-lg">GPS</h3>
            <MapContainer center={position} zoom={13} style={{ height: "400px", width: "100%" }}>
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              <Marker position={position}>
                <Popup>
                  Location
                </Popup>
              </Marker>
            </MapContainer>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <h3 className="text-lg">Latitude, Longitude</h3>
            <DualLineChart time={time} />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded shadow" style={{ height: "100%" }}>
            <h3 className="text-lg">Voltage</h3>
            <VoltageLineChart time={time} />
          </div>
          <div className="bg-white p-4 rounded shadow">
            <h3 className="text-lg">Pressure</h3>
            <PressureLineChart time={time} />
          </div>
          <div className="bg-white p-4 rounded shadow">
            <h3 className="text-lg">Altitude</h3>
            <AltitudeLineChart time={time} />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;