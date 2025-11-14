export async function parseCSV(fileUrl) {
  const res = await fetch(fileUrl);
  const text = await res.text();

  const rows = text.split("\n").map((r) => r.split(","));

  const headers = rows[0];
  const data = rows.slice(1);

  return { headers, data };
}
