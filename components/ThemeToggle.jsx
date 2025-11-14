"use client";
import { useState } from "react";

export default function ThemeToggle() {
  const [dark, setDark] = useState(true);

  function toggleTheme() {
    const newDark = !dark;
    setDark(newDark);
    document.body.style.background = newDark
      ? "linear-gradient(135deg, #0f0c29, #302b63, #24243e)"
      : "linear-gradient(135deg, #e0f7ff, #d0f0ff, #f0faff)";
  }

  return (
    <button
      onClick={toggleTheme}
      className="px-4 py-2 rounded-xl border border-cyan-400 text-cyan-400 hover:bg-cyan-500 hover:text-black transition"
    >
      {dark ? "Dark Mode" : "Light Mode"}
    </button>
  );
}
