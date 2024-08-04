const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function fetchStockPrice(sku) {
  try {
    const response = await fetch(`${API_BASE_URL}/stock-price/${sku}`);
    if (!response.ok) {
      throw new Error("Failed to fetch stock price");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching stock price:", error);
    throw error;
  }
}

export async function fetchProducts() {
  try {
    const response = await fetch(`${API_BASE_URL}/products`);
    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
}
