import "./globals.css";
import { theme } from "./theme";
import ThemeToggle from "@/components/ThemeToggle";

export const metadata = {
  title: "CSV Runner Dashboard",
  description: "Upload and view CSV files with futuristic glass UI",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
        <div className="min-h-screen flex">

          {/* Sidebar */}
          <aside className="w-64 bg-black/40 backdrop-blur-xl border-r border-white/10 p-6 hidden md:block">
            <h1 className="text-2xl font-bold tracking-wide mb-8">CSV Runner</h1>

            <nav className="space-y-4">
              <a className="block text-gray-300 hover:text-white transition">Dashboard</a>
              <a className="block text-gray-300 hover:text-white transition">Upload</a>
              <a className="block text-gray-300 hover:text-white transition">Saved Files</a>
            </nav>

            <div className="mt-8">
              <ThemeToggle />
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 p-8">{children}</main>
        </div>
      </body>
    </html>
  );
}
