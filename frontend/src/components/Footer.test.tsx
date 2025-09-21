import { render, screen } from "@testing-library/react";
import Footer from "./Footer";
import { describe, expect, it } from "vitest";

describe("Footer", () => {
  it("renders copyright", () => {
    render(<Footer />);
    expect(screen.getByText("© 2025 Abhijay")).toBeInTheDocument();
  });

  it("renders connect message", () => {
    render(<Footer />);
    expect(screen.getByText("Let's Connect 😊❤")).toBeInTheDocument();
  });
});
