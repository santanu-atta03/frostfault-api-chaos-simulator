import { useEffect, useState } from "react";
import api from "../api/api";

export default function Logs() {
  const [logs, setLogs] = useState([]);
  const [page, setPage] = useState(1);
  const limit = 10;

  const fetchLogs = async () => {
    try {
      const res = await api.get(
        `/api/analytics/logs?page=${page}&limit=${limit}`
      );
      setLogs(res.data);
    } catch (err) {
      console.error("Failed to load logs", err);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, [page]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Request Logs</h1>

      <table className="w-full border">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">Endpoint</th>
            <th className="border p-2">Method</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Latency (ms)</th>
            <th className="border p-2">Time</th>
          </tr>
        </thead>
        <tbody>
          {logs.map(log => (
            <tr key={log._id}>
              <td className="border p-2">{log.endpoint}</td>
              <td className="border p-2">{log.method}</td>
              <td
                className={`border p-2 font-bold ${
                  log.statusCode >= 400 ? "text-red-600" : "text-green-600"
                }`}
              >
                {log.statusCode}
              </td>
              <td className="border p-2">{log.latency}</td>
              <td className="border p-2">
                {new Date(log.createdAt).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex gap-4 mt-4">
        <button
          onClick={() => setPage(p => Math.max(1, p - 1))}
          className="px-4 py-2 border"
        >
          Previous
        </button>
        <span className="px-4 py-2">Page {page}</span>
        <button
          onClick={() => setPage(p => p + 1)}
          className="px-4 py-2 border"
        >
          Next
        </button>
      </div>
    </div>
  );
}
