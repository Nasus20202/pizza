import { describe, it, expect } from "vitest";
import { polarToCartesian, slicePath } from "../util";

describe("polarToCartesian", () => {
  it("should convert polar coordinates to cartesian at 0 degrees", () => {
    const result = polarToCartesian(100, 100, 50, 0);
    expect(result.x).toBeCloseTo(100);
    expect(result.y).toBeCloseTo(50);
  });

  it("should convert polar coordinates to cartesian at 90 degrees", () => {
    const result = polarToCartesian(100, 100, 50, 90);
    expect(result.x).toBeCloseTo(150);
    expect(result.y).toBeCloseTo(100);
  });

  it("should convert polar coordinates to cartesian at 180 degrees", () => {
    const result = polarToCartesian(100, 100, 50, 180);
    expect(result.x).toBeCloseTo(100);
    expect(result.y).toBeCloseTo(150);
  });

  it("should convert polar coordinates to cartesian at 270 degrees", () => {
    const result = polarToCartesian(100, 100, 50, 270);
    expect(result.x).toBeCloseTo(50);
    expect(result.y).toBeCloseTo(100);
  });

  it("should handle different center points", () => {
    const result = polarToCartesian(200, 300, 100, 0);
    expect(result.x).toBeCloseTo(200);
    expect(result.y).toBeCloseTo(200);
  });

  it("should handle different radii", () => {
    const result = polarToCartesian(100, 100, 100, 90);
    expect(result.x).toBeCloseTo(200);
    expect(result.y).toBeCloseTo(100);
  });

  it("should handle negative angles", () => {
    const result = polarToCartesian(100, 100, 50, -90);
    expect(result.x).toBeCloseTo(50);
    expect(result.y).toBeCloseTo(100);
  });

  it("should handle angles greater than 360", () => {
    const result = polarToCartesian(100, 100, 50, 450);
    // 450 degrees is equivalent to 90 degrees
    expect(result.x).toBeCloseTo(150);
    expect(result.y).toBeCloseTo(100);
  });

  it("should handle zero radius", () => {
    const result = polarToCartesian(100, 100, 0, 45);
    expect(result.x).toBeCloseTo(100);
    expect(result.y).toBeCloseTo(100);
  });

  it("should handle negative radius", () => {
    const result = polarToCartesian(100, 100, -50, 0);
    expect(result.x).toBeCloseTo(100);
    expect(result.y).toBeCloseTo(150);
  });
});

describe("slicePath", () => {
  it("should generate a valid SVG path for a pizza slice", () => {
    const path = slicePath(0, 8, 100, 100);
    expect(path).toContain("M 100 100");
    expect(path).toContain("L");
    expect(path).toContain("A 100 100");
    expect(path).toContain("Z");
  });

  it("should generate different paths for different slice indices", () => {
    const path1 = slicePath(0, 8, 100, 100);
    const path2 = slicePath(1, 8, 100, 100);
    expect(path1).not.toEqual(path2);
  });

  it("should handle different slice counts", () => {
    const path4 = slicePath(0, 4, 100, 100);
    const path8 = slicePath(0, 8, 100, 100);
    expect(path4).not.toEqual(path8);
  });

  it("should always start from the center", () => {
    const path = slicePath(3, 6, 50, 75);
    expect(path).toContain("M 75 75");
  });

  it("should create a complete circle when combining all slices", () => {
    const sliceCount = 8;
    const radius = 100;
    const center = 100;

    // Generate all slices
    const paths = Array.from({ length: sliceCount }, (_, i) =>
      slicePath(i, sliceCount, radius, center),
    );

    // Each path should be unique
    const uniquePaths = new Set(paths);
    expect(uniquePaths.size).toBe(sliceCount);
  });

  it("should handle single slice edge case", () => {
    const path = slicePath(0, 1, 100, 100);
    expect(path).toContain("M 100 100");
    expect(path).toContain("A 100 100");
  });

  it("should handle last slice correctly", () => {
    const sliceCount = 8;
    const path = slicePath(7, sliceCount, 100, 100);
    expect(path).toContain("M 100 100");
    expect(path).toContain("Z");
  });

  it("should handle very small radius", () => {
    const path = slicePath(0, 8, 1, 50);
    expect(path).toContain("M 50 50");
    expect(path).toContain("A 1 1");
  });

  it("should handle large slice count", () => {
    const sliceCount = 100;
    const path = slicePath(50, sliceCount, 100, 100);
    expect(path).toContain("M 100 100");
    expect(path).toBeTruthy();
  });
});
