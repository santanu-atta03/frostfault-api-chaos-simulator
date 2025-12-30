const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

exports.applyChaos = async (chaosConfig) => {
  // 1. Latency injection - ALWAYS applied if configured
  if (chaosConfig.latency?.max > 0) {
    const delay =
      Math.floor(
        Math.random() * (chaosConfig.latency.max - chaosConfig.latency.min + 1)
      ) + chaosConfig.latency.min;

    await sleep(delay);
  }

  // 2. Malformed response - check BEFORE error injection
  if (chaosConfig.malformedResponse && Math.random() < 0.5) {
    return {
      type: "MALFORMED",
    };
  }

  // 3. Error injection - probabilistic
  if (
    chaosConfig.errorProbability > 0 &&
    Math.random() < chaosConfig.errorProbability
  ) {
    return {
      type: "ERROR",
      statusCode: chaosConfig.errorStatusCode || 500,
    };
  }

  return { type: "SUCCESS" };
};
