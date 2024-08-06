import { useRouter } from "next/router";

import { render, screen, fireEvent } from "@testing-library/react";

import ProductListCard from "./index";

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

const setup = (propsOverride) => {
  const props = {
    image: "http://example.com/image.jpg",
    rating: 4.5,
    price: 29.99,
    id: "123",
    brand: "Brand Name",
    ...propsOverride,
  };

  const view = render(<ProductListCard {...props} />);

  return {
    props,
    view,
  };
};

describe("ProductListCard", () => {
  test("should render product details correctly", () => {
    const pushMock = jest.fn();
    useRouter.mockReturnValue({ push: pushMock });

    const { props } = setup();

    expect(screen.getByText(props.brand)).toBeInTheDocument();
    expect(screen.getByAltText(props.brand)).toHaveAttribute(
      "src",
      props.image
    );
    expect(screen.getByText(`${props.rating}`)).toBeInTheDocument();
    expect(screen.getByText(`$${props.price}`)).toBeInTheDocument();
  });

  test("should redirect to the product page on click", () => {
    const pushMock = jest.fn();
    useRouter.mockReturnValue({ push: pushMock });

    const { props } = setup();

    fireEvent.click(screen.getByRole("button"));

    expect(pushMock).toHaveBeenCalledWith(
      `/product/${props.id}-${props.brand.toLowerCase().replace(" ", "-")}`
    );
  });
});
