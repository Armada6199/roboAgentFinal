import { render } from "@testing-library/react";
import Loader from "./Loader";

describe("Loader component", () => {
  test("renders without crashing", () => {
    const { container } = render(<Loader />);
    expect(container.firstChild).toHaveClass("loader");
  });


});
