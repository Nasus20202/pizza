import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, fireEvent, act } from "@testing-library/react";
import Pizza from "../Pizza";

describe("Pizza", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.useRealTimers();
  });

  it("should render with default 8 slices", () => {
    const { container } = render(<Pizza />);
    const slices = container.querySelectorAll("clipPath");
    expect(slices.length).toBe(8);
  });

  it("should render with custom slice count", () => {
    const { container } = render(<Pizza sliceCount={6} />);
    const slices = container.querySelectorAll("clipPath");
    expect(slices.length).toBe(6);
  });

  it("should render with custom size", () => {
    const { container } = render(<Pizza size={2000} />);
    const svg = container.querySelector("svg");
    expect(svg).toHaveAttribute("viewBox", "0 0 2000 2000");
  });

  it("should animate slice when clicked", () => {
    const { container } = render(<Pizza sliceCount={4} />);

    const images = container.querySelectorAll("image");
    expect(images.length).toBe(4);

    // Click the first slice
    fireEvent.click(images[0]);

    // Check that slice is animating (opacity should be 0)
    const group = images[0].closest("g");
    expect(group).toHaveStyle({ opacity: "0" });
  });

  it("should hide slice after animation completes", () => {
    const { container } = render(<Pizza sliceCount={4} />);

    let images = container.querySelectorAll("image");
    expect(images.length).toBe(4);

    // Click the first slice
    act(() => {
      fireEvent.click(images[0]);
    });

    // Fast-forward timers to complete animation
    act(() => {
      vi.advanceTimersByTime(600);
    });

    images = container.querySelectorAll("image");
    expect(images.length).toBe(3);
  });

  it("should return null when all slices are hidden", () => {
    const { container } = render(<Pizza sliceCount={2} />);

    const images = container.querySelectorAll("image");

    // Click both slices
    act(() => {
      fireEvent.click(images[0]);
      fireEvent.click(images[1]);
    });

    // Fast-forward timers
    act(() => {
      vi.advanceTimersByTime(600);
    });

    const svg = container.querySelector("svg");
    expect(svg).not.toBeInTheDocument();
  });

  it("should handle multiple clicks on different slices", () => {
    const { container } = render(<Pizza sliceCount={4} />);

    let images = container.querySelectorAll("image");

    // Click first two slices
    act(() => {
      fireEvent.click(images[0]);
      fireEvent.click(images[1]);
    });

    // Both should be animating
    const group0 = images[0].closest("g");
    const group1 = images[1].closest("g");
    expect(group0).toHaveStyle({ opacity: "0" });
    expect(group1).toHaveStyle({ opacity: "0" });

    // Advance timers
    act(() => {
      vi.advanceTimersByTime(600);
    });

    images = container.querySelectorAll("image");
    expect(images.length).toBe(2);
  });

  it("should create clip paths for all slices", () => {
    const { container } = render(<Pizza sliceCount={6} />);

    for (let i = 0; i < 6; i++) {
      const clipPath = container.querySelector(`#slice-${i}`);
      expect(clipPath).toBeInTheDocument();
    }
  });

  it("should cleanup timeouts on unmount", () => {
    const { container, unmount } = render(<Pizza />);

    const images = container.querySelectorAll("image");
    // Click a slice to create a timeout
    fireEvent.click(images[0]);

    const clearTimeoutSpy = vi.spyOn(globalThis, "clearTimeout");
    unmount();

    // clearTimeout should be called for cleanup
    expect(clearTimeoutSpy).toHaveBeenCalled();
  });

  it("should handle clicking same slice multiple times", () => {
    const { container } = render(<Pizza sliceCount={4} />);

    const images = container.querySelectorAll("image");
    const initialCount = images.length;

    // Click the same slice multiple times rapidly
    act(() => {
      fireEvent.click(images[0]);
      fireEvent.click(images[0]);
      fireEvent.click(images[0]);
    });

    // Should still only be animating once
    const group = images[0].closest("g");
    expect(group).toHaveStyle({ opacity: "0" });

    // After animation completes
    act(() => {
      vi.advanceTimersByTime(600);
    });

    // Should only remove one slice, not multiple
    const remainingImages = container.querySelectorAll("image");
    expect(remainingImages.length).toBe(initialCount - 1);
  });

  it("should handle single slice edge case", () => {
    const { container } = render(<Pizza sliceCount={1} />);

    const clipPaths = container.querySelectorAll("clipPath");
    expect(clipPaths.length).toBe(1);

    const images = container.querySelectorAll("image");
    expect(images.length).toBe(1);
  });

  it("should render with custom radius and center", () => {
    const { container } = render(
      <Pizza size={2000} radius={800} center={1000} sliceCount={6} />,
    );

    const svg = container.querySelector("svg");
    expect(svg).toHaveAttribute("viewBox", "0 0 2000 2000");

    const clipPaths = container.querySelectorAll("clipPath");
    expect(clipPaths.length).toBe(6);
  });

  it("should return null with zero slices (all hidden)", () => {
    const { container } = render(<Pizza sliceCount={0} />);
    const svg = container.querySelector("svg");
    // With 0 slices, all are "hidden" so component returns null
    expect(svg).not.toBeInTheDocument();
  });
});
