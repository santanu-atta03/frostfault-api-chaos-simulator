const rateStore = new Map();

module.exports = (req, res, next) => {
  const mockApi = req.mockApi;
  if (!mockApi || mockApi.rateLimit.limit === 0) return next();

  const key = `${req.ip}-${mockApi.endpoint}`;
  const now = Date.now();

  if (!rateStore.has(key)) {
    rateStore.set(key, []);
  }

  const windowStart = now - mockApi.rateLimit.windowMs;
  const timestamps = rateStore.get(key).filter(t => t > windowStart);
  timestamps.push(now);
  rateStore.set(key, timestamps);

  if (timestamps.length > mockApi.rateLimit.limit) {
    return res.status(429).json({
      error: "Too Many Requests (simulated)"
    });
  }

  next();
};
