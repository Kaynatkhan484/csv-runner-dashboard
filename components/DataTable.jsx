"use client";
import { useEffect, useState } from "react";

export default function DataTable({ fileUrl }) {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    async function loadCSV() {
      const res = await fetch(fileUrl);
      const text = await res.text();
      const lines = text.split("\n").map((l) => l.split(","));
      setRows(lines);
    }
    loadCSV();
  }, [fileUrl]);

  if (rows.length === 0) return null;

  return (
    <div className="glass-card overflow-auto p-6 fade-in mt-6">
      <h2 className="text-2xl font-bold text-cyan-400 mb-4">📊 Uploaded CSV Data</h2>
      <table className="w-full border-collapse text-gray-300">
        <thead className="bg-black/40 sticky top-0">
          <tr>
            {rows[0].map((h, i) => <th key={i} className="px-4 py-2 text-left">{h}</th>)}
          </tr>
        </thead>
        <tbody>
          {rows.slice(1).map((r,i)=>(
            <tr key={i} className="hover:bg-white/10 transition-all">
              {r.map((c,j)=><td key={j} className="px-4 py-2">{c}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
