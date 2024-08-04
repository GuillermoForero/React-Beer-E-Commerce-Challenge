import { fetchStockPrice, fetchProducts } from "./productsService";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

describe("fetchStockPrice", () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  test("should fetch stock price successfully", async () => {
    const mockResponse = { price: 100 };
    fetch.mockResponseOnce(JSON.stringify(mockResponse));

    const sku = "12345";
    const data = await fetchStockPrice(sku);

    expect(fetch).toHaveBeenCalledWith(`${API_BASE_URL}/stock-price/${sku}`);
    expect(data).toEqual(mockResponse);
  });

  test("should throw an error when the fetch fails", async () => {
    fetch.mockReject(new Error("Failed to fetch stock price"));

    const sku = "12345";

    await expect(fetchStockPrice(sku)).rejects.toThrow(
      "Failed to fetch stock price"
    );
  });
});

describe("fetchProducts", () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  test("should fetch products successfully", async () => {
    const mockResponse = [
      { id: 1, name: "Product 1" },
      { id: 2, name: "Product 2" },
    ];
    fetch.mockResponseOnce(JSON.stringify(mockResponse));

    const data = await fetchProducts();

    expect(fetch).toHaveBeenCalledWith(`${API_BASE_URL}/products`);
    expect(data).toEqual(mockResponse);
  });

  test("should throw an error when the fetch fails", async () => {
    fetch.mockReject(new Error("Failed to fetch products"));

    await expect(fetchProducts()).rejects.toThrow("Failed to fetch products");
  });
});
