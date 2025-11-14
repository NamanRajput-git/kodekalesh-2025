const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

app.post("/api/detect", (req, res) => {
const transaction = req.body;

if (!transaction || typeof transaction !== "object") {
    res.status(400).json({ error: "Invalid transaction payload" });
    return;
}

(async () => {
    try {
        const result = await checkFraud(transaction);

        if (result.success) {
            res.status(200).json({
                message: "Fraud check completed",
                fraud: result.fraud,
                score: result.score,
                raw: result.raw,
            });
        } else {
            res.status(502).json({
                error: result.error || "Fraud check failed",
            });
        }
    } catch (err) {
        res.status(500).json({ error: err.message || String(err) });
    }
})();

return;
});

async function checkFraud(transaction) {
  const url =
    process.env.FRAUD_API_URL || "https://vercel-namanrajput-authBackend/api/fraud-check";
  if (typeof fetch !== "function") {
    throw new Error(
      "fetch is not available in this Node runtime. Use Node 18+ or polyfill fetch (e.g., node-fetch) or set FRAUD_API_URL accordingly."
    );
  }

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(transaction),
      timeout: 10000,
    });

    if (!res.ok) {
      const text = await res.text().catch(() => "");
      throw new Error(`Fraud API responded with status ${res.status}: ${text}`);
    }

    const payload = await res.json().catch(() => null);
    return {
      success: true,
      fraud: !!(payload && payload.fraud),
      score:
        payload && typeof payload.score === "number" ? payload.score : null,
      raw: payload,
    };
  } catch (err) {
    return { success: false, error: err.message || String(err) };
  }
}

app.listen(PORT, () => {
  console.log(`Detection service listening on port ${PORT}`);
});

module.exports = app;
