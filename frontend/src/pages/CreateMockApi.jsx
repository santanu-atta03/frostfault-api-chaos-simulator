import { useState } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";

export default function CreateMockApi() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    endpoint: "",
    method: "GET",
    successResponse: "{}",
    errorProbability: 0,
    latencyMin: 0,
    latencyMax: 0,
    rateLimit: 0,
    windowMs: 10000
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/api/mock/create", {
        name: form.name,
        endpoint: form.endpoint,
        method: form.method,
        successResponse: JSON.parse(form.successResponse),
        chaosConfig: {
          errorProbability: Number(form.errorProbability),
          latency: {
            min: Number(form.latencyMin),
            max: Number(form.latencyMax)
          },
          malformedResponse: false
        },
        rateLimit: {
          limit: Number(form.rateLimit),
          windowMs: Number(form.windowMs)
        }
      });

      alert("Mock API created successfully");
      navigate("/mock-apis");
    } catch (err) {
      alert(err.response?.data?.error || "Failed to create mock API");
    }
  };

  return (
    <div className="p-6 max-w-2xl">
      <h1 className="text-2xl font-bold mb-6">Create Mock API</h1>

      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          className="border p-2 w-full"
          name="name"
          placeholder="API Name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <input
          className="border p-2 w-full"
          name="endpoint"
          placeholder="/api/users"
          value={form.endpoint}
          onChange={handleChange}
          required
        />

        <select
          className="border p-2 w-full"
          name="method"
          value={form.method}
          onChange={handleChange}
        >
          <option>GET</option>
          <option>POST</option>
          <option>PUT</option>
          <option>DELETE</option>
        </select>

        <textarea
          className="border p-2 w-full"
          rows="4"
          name="successResponse"
          placeholder='{"message":"Hello"}'
          value={form.successResponse}
          onChange={handleChange}
          required
        />

        <div>
          <label>Error Probability (0–1)</label>
          <input
            type="number"
            step="0.1"
            min="0"
            max="1"
            name="errorProbability"
            value={form.errorProbability}
            onChange={handleChange}
            className="border p-2 w-full"
          />
        </div>

        <div className="flex gap-4">
          <input
            type="number"
            name="latencyMin"
            placeholder="Latency Min (ms)"
            value={form.latencyMin}
            onChange={handleChange}
            className="border p-2 w-full"
          />
          <input
            type="number"
            name="latencyMax"
            placeholder="Latency Max (ms)"
            value={form.latencyMax}
            onChange={handleChange}
            className="border p-2 w-full"
          />
        </div>

        <input
          type="number"
          name="rateLimit"
          placeholder="Rate Limit (requests)"
          value={form.rateLimit}
          onChange={handleChange}
          className="border p-2 w-full"
        />

        <input
          type="number"
          name="windowMs"
          placeholder="Rate Limit Window (ms)"
          value={form.windowMs}
          onChange={handleChange}
          className="border p-2 w-full"
        />

        <button className="bg-black text-white px-6 py-2 rounded">
          Create API
        </button>
      </form>
    </div>
  );
}
