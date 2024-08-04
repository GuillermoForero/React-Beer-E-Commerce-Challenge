import { render, screen } from "@testing-library/react";
import ProductList from "./index";
import { useProducts } from "@/context/ProductsContext";

// Mockea el hook useProducts
jest.mock("@/context/ProductsContext", () => ({
  useProducts: jest.fn(),
}));

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

// Función de setup para renderizar el componente
const setup = (products) => {
  useProducts.mockReturnValue({ products });
  render(<ProductList />);
};

describe("ProductList", () => {
  test("should render a list of products", () => {
    // Define productos mockeados
    const mockProducts = [
      { id: 1, brand: "Product 1", price: 10 },
      { id: 2, brand: "Product 2", price: 20 },
    ];

    // Usa el setup para renderizar el componente con los productos mockeados
    setup(mockProducts);

    // Verifica que los productos se rendericen
    mockProducts.forEach((product) => {
      expect(screen.getByText(product.brand)).toBeInTheDocument();
      expect(screen.getByText(`$${product.price}`)).toBeInTheDocument();
    });
  });

  test("should not render products if none are available", () => {
    // Usa el setup para renderizar el componente sin productos
    setup([]);

    // Verifica que no se renderiza ningún producto
    expect(screen.queryByText("Product 1")).toBeNull();
    expect(screen.queryByText("Product 2")).toBeNull();
  });
});
