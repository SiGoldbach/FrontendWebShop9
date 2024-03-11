import { render, screen } from "@testing-library/react";
import { describe, expect, it, test } from "vitest";
import App from "../Pages/App";
import { sum } from "../Pages/App";

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3)
})

describe(App.name, () => {
  it("should render", () => {
    render(<App />);
    expect(screen.getByLabelText("LinkToShoppingCart")).toBeInTheDocument();
  });
});
