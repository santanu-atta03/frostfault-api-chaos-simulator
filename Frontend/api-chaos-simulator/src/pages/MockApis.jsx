import { useEffect, useState } from "react";
import api from "../api/api";
import MockApiCard from "../components/MockApiCard";

export default function MockApis() {
  const [apis, setApis] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch APIs
  const fetchApis = async () => {
    try {
      const res = await api.get("/api/mock");
      setApis(res.data);
    } catch (err) {
      console.error("Failed to load mock APIs", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApis();
  }, []);

  // ✅ COPY MOCK API URL
  const handleCopy = (apiData) => {
    const url = `http://localhost:5000/mock${apiData.endpoint}`;
    navigator.clipboard.writeText(url);
    alert("Mock API URL copied!");
  };

  // ✅ DELETE MOCK API
  const handleDelete = async (apiData) => {
    const confirmDelete = window.confirm(
      `Delete mock API "${apiData.name}"?`
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/api/mock/${apiData._id}`);
      alert("Mock API deleted");
      fetchApis(); // refresh list
    } catch (err) {
      alert("Failed to delete mock API");
    }
  };

  if (loading) {
    return <div className="p-6">Loading mock APIs...</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Mock APIs</h1>

      {apis.length === 0 ? (
        <p>No mock APIs created yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {apis.map(apiItem => (
            <MockApiCard
              key={apiItem._id}
              api={apiItem}
              onCopy={handleCopy}     // ✅ PASS COPY HANDLER
              onDelete={handleDelete} // ✅ PASS DELETE HANDLER
            />
          ))}
        </div>
      )}
    </div>
  );
}

