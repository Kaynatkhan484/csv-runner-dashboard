"use client";

import { useState } from "react";
import Papa from "papaparse";

export default function UploadBox({ onUpload }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setLoading(true);
    setError("");

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const { data, errors, meta } = results;

        // Check headers
        const headers = meta.fields.map((h) => h.trim().toLowerCase());
        if (!headers.includes("date") || !headers.includes("person") || !headers.includes("miles")) {
          setError("CSV must have headers: date, person, miles");
          setLoading(false);
          return;
        }

        // Validate each row
        const parsedData = [];
        for (let row of data) {
          const miles = parseFloat(row.miles || row["miles run"] || row["miles_run"]);
          if (!row.date || !row.person || isNaN(miles)) {
            setError("Invalid row detected. Ensure date, person, and numeric miles are provided.");
            setLoading(false);
            return;
          }
          parsedData.push({ date: row.date, person: row.person, miles });
        }

        onUpload(parsedData);
        setLoading(false);
      },
      error: () => {
        setError("Failed to parse CSV. Please check file format.");
        setLoading(false);
      },
    });
  };

  return (
    <div className="glass-card p-6 mb-8">
      <h2 className="text-2xl font-bold mb-4">Upload CSV File</h2>
      <label className="block cursor-pointer p-6 border-2 border-dashed rounded-xl hover:border-cyan-400 transition">
        <input type="file" accept=".csv" className="hidden" onChange={handleUpload} />
        <p className="text-gray-300 text-center">
          Drag & drop your CSV here or <span className="text-cyan-400 font-semibold">browse</span>
        </p>
      </label>
      {loading && <p className="text-sm text-cyan-400 mt-2">Uploading...</p>}
      {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
    </div>
  );
}
