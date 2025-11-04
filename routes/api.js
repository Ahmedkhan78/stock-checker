"use strict";

const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));
const crypto = require("crypto");

module.exports = function (app) {
  const stockLikesDB = {}; // Stores Set of IP hashes for each stock

  // Anonymize IP using SHA256
  function anonymizeIP(ip) {
    if (!ip) return "unknown";
    return crypto.createHash("sha256").update(ip).digest("hex");
  }

  // Fetch stock price from FCC proxy
  async function getStockPrice(symbol) {
    const url = `https://stock-price-checker-proxy.freecodecamp.rocks/v1/stock/${symbol}/quote`;
    const res = await fetch(url);
    const data = await res.json();
    if (!data || !data.symbol) throw new Error("Invalid stock symbol");
    return { stock: data.symbol, price: data.latestPrice };
  }

  app.route("/api/stock-prices").get(async (req, res) => {
    try {
      let { stock, like } = req.query;
      if (!stock)
        return res.status(400).json({ error: "stock query param required" });

      const ip =
        req.headers["x-forwarded-for"]?.split(",")[0] ||
        req.socket.remoteAddress;
      const ipHash = anonymizeIP(ip);
      const likeBool = like === "true";

      // Handle single or multiple stocks
      const stocks = Array.isArray(stock)
        ? stock.map((s) => s.toUpperCase())
        : [stock.toUpperCase()];

      const stockDataPromises = stocks.map(async (symbol) => {
        const data = await getStockPrice(symbol);

        if (!stockLikesDB[symbol]) stockLikesDB[symbol] = new Set();
        if (likeBool) stockLikesDB[symbol].add(ipHash);

        return {
          stock: data.stock,
          price: data.price,
          likes: stockLikesDB[symbol].size,
        };
      });

      const stockDataResults = await Promise.all(stockDataPromises);

      if (stockDataResults.length === 2) {
        const [s1, s2] = stockDataResults;
        return res.json({
          stockData: [
            {
              stock: s1.stock,
              price: s1.price,
              rel_likes: s1.likes - s2.likes,
            },
            {
              stock: s2.stock,
              price: s2.price,
              rel_likes: s2.likes - s1.likes,
            },
          ],
        });
      }

      res.json({ stockData: stockDataResults[0] });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Server error" });
    }
  });
};
