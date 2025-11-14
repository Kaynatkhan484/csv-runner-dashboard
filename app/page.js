"use client";

import { useState, useEffect } from "react";
import UploadBox from "../components/UploadBox";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, Legend, CartesianGrid,
  BarChart, Bar, PieChart, Pie, Cell,
} from "recharts";

export default function Home() {
  const [csvData, setCsvData] = useState([]);
  const [metrics, setMetrics] = useState({ min: 0, max: 0, avg: 0, totalPerPerson: {} });

  const COLORS = ["#00fff7", "#ff4d4d", "#ffaa00", "#9b59b6"];

  useEffect(() => {
    if (!csvData.length) return;

    const milesArray = csvData.map(d => d.miles);
    const min = Math.min(...milesArray);
    const max = Math.max(...milesArray);
    const avg = (milesArray.reduce((a, b) => a + b, 0) / milesArray.length).toFixed(2);

    const totalPerPerson = {};
    csvData.forEach(d => {
      if (!totalPerPerson[d.person]) totalPerPerson[d.person] = 0;
      totalPerPerson[d.person] += d.miles;
    });

    setMetrics({ min, max, avg, totalPerPerson });
  }, [csvData]);

  // Transform data for line chart
  const lineData = [];
  const datesMap = {};
  csvData.forEach(d => {
    if (!datesMap[d.date]) {
      datesMap[d.date] = { date: d.date };
      lineData.push(datesMap[d.date]);
    }
    datesMap[d.date][d.person] = d.miles;
  });

  const pieData = Object.entries(metrics.totalPerPerson).map(([person, miles]) => ({ name: person, value: miles }));

  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <h1 className="text-4xl font-bold mb-6">CSV Runner Dashboard</h1>

      <UploadBox onUpload={setCsvData} />

      {csvData.length === 0 && <p className="text-gray-400 mt-4">Upload a CSV to see metrics and charts.</p>}

      {csvData.length > 0 && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
            <div className="glass-card p-4">
              <h2 className="text-xl font-semibold">Overall Min Miles</h2>
              <p className="text-2xl">{metrics.min}</p>
            </div>
            <div className="glass-card p-4">
              <h2 className="text-xl font-semibold">Overall Max Miles</h2>
              <p className="text-2xl">{metrics.max}</p>
            </div>
            <div className="glass-card p-4">
              <h2 className="text-xl font-semibold">Overall Avg Miles</h2>
              <p className="text-2xl">{metrics.avg}</p>
            </div>
          </div>

          {/* Line Chart */}
          <div className="glass-card mb-8 p-4">
            <h2 className="text-xl font-semibold mb-4">Overall Miles Trend</h2>
            <LineChart width={700} height={300} data={lineData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" stroke="#00fff7" />
              <YAxis stroke="#00fff7" />
              <Tooltip />
              <Legend />
              {Object.keys(metrics.totalPerPerson).map((person, idx) => (
                <Line key={person} type="monotone" dataKey={person} name={person} stroke={COLORS[idx % COLORS.length]} strokeWidth={2} connectNulls />
              ))}
            </LineChart>
          </div>

          {/* Bar Chart */}
          <div className="glass-card mb-8 p-4">
            <h2 className="text-xl font-semibold mb-4">Total Miles Per Person</h2>
            <BarChart width={700} height={300} data={pieData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" stroke="#00fff7" />
              <YAxis stroke="#00fff7" />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#00fff7">
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </div>

          {/* Pie Chart */}
          <div className="glass-card mb-8 p-4">
            <h2 className="text-xl font-semibold mb-4">Miles Distribution</h2>
            <PieChart width={400} height={300}>
              <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} fill="#00fff7" label>
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </div>
        </>
      )}
    </div>
  );
}
