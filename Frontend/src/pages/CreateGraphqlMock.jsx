import { useState } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Plus, Code } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function CreateGraphqlMock() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    graphqlResponse: "{}",
    errorProbability: 0,
    latencyMin: 0,
    latencyMax: 0,
    rateLimit: 0,
    windowMs: 10000
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await api.post("/api/mock/create", {
        name: form.name,
        type: "GRAPHQL",
        graphqlResponse: JSON.parse(form.graphqlResponse),
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

      navigate("/mock-apis");
    } catch (err) {
      setError(err.response?.data?.error || "Failed to create GraphQL mock");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 p-6">
      <div className="max-w-3xl mx-auto">
        <button
          onClick={() => navigate("/mock-apis")}
          className="flex items-center gap-2 text-slate-400 hover:text-white mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>

        <h1 className="text-3xl font-bold text-white mb-6">
          Create GraphQL Mock API
        </h1>

        {error && (
          <Alert className="mb-6 bg-red-500/10 border-red-500/30 text-red-400">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label className="text-slate-300">API Name</Label>
            <Input
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              placeholder="User GraphQL API"
            />
          </div>

          <div>
            <Label className="text-slate-300 flex items-center gap-2">
              <Code className="w-4 h-4" />
              GraphQL Response (JSON)
            </Label>
            <textarea
              name="graphqlResponse"
              rows="6"
              value={form.graphqlResponse}
              onChange={handleChange}
              placeholder='{"users":[{"id":1,"name":"Ayan"}]}'
              className="w-full bg-slate-900 text-white p-3 rounded font-mono"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg"
          >
            {loading ? "Creating..." : "Create GraphQL Mock"}
          </button>
        </form>
      </div>
    </div>
  );
}
