import { render, screen } from "@testing-library/react";
import { ProductsProvider, useProducts } from "./ProductsContext";

const TestComponent = () => {
  const { products } = useProducts();
  return (
    <div>
      {products.map((product) => (
        <div key={product.id}>{product.name}</div>
      ))}
    </div>
  );
};

describe("ProductsContext", () => {
  test("should provide products through context", () => {
    const initialProducts = [
      { id: 1, name: "Product 1" },
      { id: 2, name: "Product 2" },
    ];

    render(
      <ProductsProvider productsList={initialProducts}>
        <TestComponent />
      </ProductsProvider>
    );

    // Verify that the products are rendered
    initialProducts.forEach((product) => {
      expect(screen.getByText(product.name)).toBeInTheDocument();
    });
  });
});
