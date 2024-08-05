const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function fetchStockPrice(sku) {
  try {
    const response = await fetch(`${API_BASE_URL}/stock-price/${sku}`);
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}

export async function fetchProducts() {
  try {
    const response = await fetch(`${API_BASE_URL}/products`);
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}
