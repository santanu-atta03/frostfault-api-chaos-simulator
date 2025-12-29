export default function MockApiCard({ api }) {
  return (
    <div className="bg-white shadow rounded p-4">
      <h3 className="font-bold text-lg">{api.name}</h3>

      <p className="text-sm text-gray-600 mt-1">
        <strong>Endpoint:</strong> {api.endpoint}
      </p>

      <p className="text-sm mt-1">
        <strong>Method:</strong>{" "}
        <span className="bg-gray-200 px-2 py-1 rounded">
          {api.method}
        </span>
      </p>

      <div className="mt-2 text-sm">
        <p>
          <strong>Error Probability:</strong>{" "}
          {api.chaosConfig?.errorProbability}
        </p>
        <p>
          <strong>Latency:</strong>{" "}
          {api.chaosConfig?.latency?.min}–{api.chaosConfig?.latency?.max} ms
        </p>
        <p>
          <strong>Rate Limit:</strong>{" "}
          {api.rateLimit?.limit || "∞"} /{" "}
          {(api.rateLimit?.windowMs || 0) / 1000}s
        </p>
      </div>
    </div>
  );
}
