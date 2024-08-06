import express from "express";
import cors from "cors";

import products from "./db/products.js";
import stockPrice from "./db/stock-price.js";

const app = express();

app.use(cors());

app.get("/api/products", (req, res) => {
  const productsWithPriceAndRating = products.map((product) => {
    const { price } = stockPrice[product.skus[0].code];
    return {
      ...product,
      price,
    };
  });
  res.json(productsWithPriceAndRating);
});

app.get("/api/stock-price/:sku", (req, res) => {
  const sku = req.params.sku;
  const stockInfo = stockPrice[sku];
  if (stockInfo) {
    res.json(stockInfo);
  } else {
    res.status(404).json({ error: "SKU not found" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
