import { render, screen, fireEvent } from "@testing-library/react";
import ButtonSize from "./index"; // Ajusta la ruta de importación según sea necesario

describe("ButtonSize Component", () => {
  const mockSetActive = jest.fn();

  const setup = (propsOverride) => {
    const props = {
      isActive: false,
      setActive: mockSetActive,
      sku: "SIZE_M",
      name: "M",
      ...propsOverride,
    };
    const view = render(<ButtonSize {...props} />);

    return {
      props,
      view,
    };
  };

  it("renders with the correct text", () => {
    setup();
    expect(screen.getByRole("button")).toHaveTextContent("M");
  });

  it("applies the correct class when active", () => {
    setup({ isActive: true });
    expect(screen.getByRole("button")).toHaveClass("button-size active");
  });

  it("applies the correct class when not active", () => {
    setup();
    expect(screen.getByRole("button")).toHaveClass("button-size");
    expect(screen.getByRole("button")).not.toHaveClass("active");
  });

  it("calls setActive with the correct SKU when clicked", () => {
    setup();
    fireEvent.click(screen.getByRole("button"));
    expect(mockSetActive).toHaveBeenCalledWith("SIZE_M");
  });
});
