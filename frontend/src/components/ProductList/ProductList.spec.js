import { render, screen } from "@testing-library/react";
import { useProducts } from "@/context/ProductsContext";

import ProductList from "./index";

jest.mock("@/context/ProductsContext", () => ({
  useProducts: jest.fn(),
}));

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

const setup = (products) => {
  useProducts.mockReturnValue({ products });
  render(<ProductList />);
};

describe("ProductList", () => {
  test("should render a list of products", () => {
    const mockProducts = [
      { id: 1, brand: "Product 1", price: 10 },
      { id: 2, brand: "Product 2", price: 20 },
    ];

    setup(mockProducts);

    mockProducts.forEach((product) => {
      expect(screen.getByText(product.brand)).toBeInTheDocument();
      expect(screen.getByText(`$${product.price}`)).toBeInTheDocument();
    });
  });

  test("should not render products if none are available", () => {
    setup([]);

    expect(screen.queryByText("Product 1")).toBeNull();
    expect(screen.queryByText("Product 2")).toBeNull();
  });
});
