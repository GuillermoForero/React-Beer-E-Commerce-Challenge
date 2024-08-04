import { render, screen, fireEvent, act } from "@testing-library/react";
import { useProducts } from "@/context/ProductsContext";
import { fetchStockPrice } from "@/services/productsService";
import ProductDetails from "./index";

jest.mock("@/context/ProductsContext");
jest.mock("@/services/productsService");
jest.mock("next/link", () => {
  return ({ children }) => children;
});

const setup = (propsOverride) => {
  const defaultProps = {
    id: "1-modelo-especial",
    ...propsOverride,
  };

  const view = render(<ProductDetails {...defaultProps} />);
  return {
    ...view,
    defaultProps,
  };
};

describe("ProductDetails Component", () => {
  const mockProduct = {
    id: 1,
    name: "Modelo Especial",
    image: "test-image.jpg",
    origin: "Mexico",
    information:
      "Miller Lite is the great tasting, less filling beer that created the American light beer category in 1975. Triple-hops brewed for great pilsner taste, Miller Lite is the only beer to win four gold awards in the World Beer Cup for best American-Style light lager (2006, 2002, 1998 and 1996). It also won the gold medal for best American-style Lager or Light Lager at the 2010 Great American Beer Festival.",
    skus: [
      { code: "SKU1", name: "Small" },
      { code: "SKU2", name: "Medium" },
    ],
  };

  const mockProducts = [mockProduct];

  beforeEach(() => {
    useProducts.mockReturnValue({ products: mockProducts });
    fetchStockPrice.mockResolvedValue({ price: 10, stock: 100 });
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.useRealTimers();
  });

  it("renders loading state when product is not found", () => {
    setup({ id: "999-non-existent" });
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("renders product details when product is found", async () => {
    setup();

    await screen.findByText("Modelo Especial");
    expect(screen.getByText("Origin: Mexico")).toBeInTheDocument();
    expect(screen.getByText("Description")).toBeInTheDocument();
    expect(screen.getByText("Size")).toBeInTheDocument();
  });

  /* it("toggles description expansion", async () => {
    setup();

    await act(async () => {
      jest.advanceTimersByTime(1000);
    });
    const informationContainer = screen.getByTestId("information-container");
    const readMoreButton = screen.getByText("Read more");
    fireEvent.click(readMoreButton);
    expect(screen.getByText("Show less")).toBeInTheDocument();

    fireEvent.click(screen.getByText("Show less"));
    expect(screen.getByText("Read more")).toBeInTheDocument();
  });
  */

  it("selects SKU and fetches stock price", async () => {
    setup();

    const skuButton = screen.getByText("Small");
    fireEvent.click(skuButton);

    await screen.findByText("$10");
    expect(screen.getByText("Origin: Mexico | Stock: 100")).toBeInTheDocument();
  });

  it("updates stock price periodically", async () => {
    setup();

    const skuButton = screen.getByText("Small");
    fireEvent.click(skuButton);

    await screen.findByText("$10");

    fetchStockPrice.mockResolvedValue({ price: 12, stock: 95 });

    await act(async () => {
      jest.advanceTimersByTime(5000);
    });

    await screen.findByText("$12");
    expect(screen.getByText("Origin: Mexico | Stock: 95")).toBeInTheDocument();
  });
});
