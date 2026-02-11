import { describe, it, expect, vi } from "vitest";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import PizzaSlice from "../PizzaSlice";

describe("PizzaSlice", () => {
  const defaultProps = {
    index: 0,
    size: 1800,
    sliceCount: 8,
    isAnimating: false,
    animationDuration: 600,
    onClick: vi.fn(),
  };

  it("should render without crashing", () => {
    const { container } = render(
      <svg>
        <PizzaSlice {...defaultProps} />
      </svg>,
    );
    const image = container.querySelector("image");
    expect(image).toBeInTheDocument();
  });

  it("should call onClick when clicked", async () => {
    const onClick = vi.fn();
    const user = userEvent.setup();

    const { container } = render(
      <svg>
        <PizzaSlice {...defaultProps} onClick={onClick} />
      </svg>,
    );

    const image = container.querySelector("image");
    if (image) {
      await user.click(image);
    }

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("should apply transform style when animating", () => {
    const { container } = render(
      <svg>
        <PizzaSlice {...defaultProps} isAnimating={true} />
      </svg>,
    );

    const group = container.querySelector("g");
    expect(group).toHaveStyle({ opacity: "0" });
  });

  it("should not have transform when not animating", () => {
    const { container } = render(
      <svg>
        <PizzaSlice {...defaultProps} isAnimating={false} />
      </svg>,
    );

    const group = container.querySelector("g");
    expect(group).toHaveStyle({ opacity: "1" });
  });

  it("should use correct clip path based on index", () => {
    const { container } = render(
      <svg>
        <PizzaSlice {...defaultProps} index={3} />
      </svg>,
    );

    const image = container.querySelector("image");
    expect(image).toHaveAttribute("clip-path", "url(#slice-3)");
  });

  it("should set correct width and height from size prop", () => {
    const { container } = render(
      <svg>
        <PizzaSlice {...defaultProps} size={2000} />
      </svg>,
    );

    const image = container.querySelector("image");
    expect(image).toHaveAttribute("width", "2000");
    expect(image).toHaveAttribute("height", "2000");
  });

  it("should handle different slice positions correctly", () => {
    const { container: container0 } = render(
      <svg>
        <PizzaSlice {...defaultProps} index={0} sliceCount={8} />
      </svg>,
    );
    const { container: container7 } = render(
      <svg>
        <PizzaSlice {...defaultProps} index={7} sliceCount={8} />
      </svg>,
    );

    const img0 = container0.querySelector("image");
    const img7 = container7.querySelector("image");

    expect(img0).toHaveAttribute("clip-path", "url(#slice-0)");
    expect(img7).toHaveAttribute("clip-path", "url(#slice-7)");
  });

  it("should calculate different transforms for different indices when animating", () => {
    const { container: container0 } = render(
      <svg>
        <PizzaSlice {...defaultProps} index={0} isAnimating={true} />
      </svg>,
    );
    const { container: container4 } = render(
      <svg>
        <PizzaSlice {...defaultProps} index={4} isAnimating={true} />
      </svg>,
    );

    const group0 = container0.querySelector("g");
    const group4 = container4.querySelector("g");

    const style0 = group0?.getAttribute("style");
    const style4 = group4?.getAttribute("style");

    // Transforms should be different for different indices
    expect(style0).not.toEqual(style4);
  });

  it("should use transition duration from prop", () => {
    const { container } = render(
      <svg>
        <PizzaSlice {...defaultProps} animationDuration={1200} />
      </svg>,
    );

    const group = container.querySelector("g");
    const style = group?.getAttribute("style");
    expect(style).toContain("1200ms");
  });
});
