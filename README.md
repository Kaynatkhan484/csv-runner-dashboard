CSV Runner Dashboard
Overview:

The CSV Runner Dashboard is a Next.js web application that allows users to upload a CSV file containing running data (date, person, miles). The dashboard parses the CSV, validates the data, calculates metrics, and displays them with interactive charts for better visualization.
It is designed using Next.js, React, Tailwind CSS, shadcn/ui components, and Recharts for charts.

Features:
Upload CSV files with headers: date, person, miles
Automatic validation of CSV headers and data types
Calculation of overall metrics: Min, Max, Avg Miles
Grouped metrics per person

Interactive charts:
*Line Chart – Miles trend over time
*Bar Chart – Total miles per person
*Pie Chart – Miles distribution per person
User-friendly error messages for invalid CSVs
Responsive UI with modern styling

Assumptions:
CSV headers must exactly match: date, person, miles
miles must be a numeric value
Empty rows or invalid data will show error messages

Prerequisites:
Node.js v18+
npm v9+ (or yarn)

Setup & Installation:
1)Clone the repository
git clone <your-repo-url>
cd csv-runner-dashboard

2)Install dependencies
npm install

3)Run the development server
npm run dev

Open your browser at http://localhost:3000

Usage:
Click Upload CSV File.
Drag and drop your CSV or browse to select it.
Once uploaded, metrics and charts will appear.
Metrics include Overall Min, Max, Avg miles.
Charts include Line Chart (trend), Bar Chart (total per person), Pie Chart (distribution).

Sample CSV:
Save this as sample.csv:

date,person,miles
2025-11-01,Kaynat,3.5
2025-11-01,Ali,5.2
2025-11-01,Sara,4.0
2025-11-02,Kaynat,4.2
2025-11-02,Ali,3.8
2025-11-02,Sara,5.5
2025-11-03,Kaynat,6.0
2025-11-03,Ali,4.5
2025-11-03,Sara,3.9
2025-11-04,Kaynat,5.2
2025-11-04,Ali,6.1
2025-11-04,Sara,4.7

Project Structure
csv-runner-dashboard/
├─ app/
│  ├─ page.js       # Main dashboard page
├─ components/
│  ├─ UploadBox.jsx # CSV upload and parsing component
├─ package.json
├─ tailwind.config.js
└─ ...

Architecture Notes
UploadBox.jsx handles file upload, CSV parsing using PapaParse, and validation.
page.js stores CSV data in state, calculates metrics, and renders charts dynamically.
Charts use Recharts and are responsive to CSV data changes.

Responsive layo
