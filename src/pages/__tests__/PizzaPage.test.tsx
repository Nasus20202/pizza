import { describe, it, expect, vi } from 'vitest';
import { render, act } from '@testing-library/react';
import PizzaPage from '../PizzaPage';

describe('PizzaPage', () => {
  it('should render without crashing', () => {
    const { container } = render(<PizzaPage />);
    expect(container).toBeInTheDocument();
  });

  it('should render Plate component', () => {
    const { container } = render(<PizzaPage />);
    // Check for the plate's SVG element
    const svgs = container.querySelectorAll('svg');
    expect(svgs.length).toBeGreaterThan(0);
  });

  it('should render Pizza component', () => {
    const { container } = render(<PizzaPage />);
    // Check for clip paths created by Pizza
    const clipPaths = container.querySelectorAll('clipPath');
    expect(clipPaths.length).toBe(8); // Default sliceCount
  });

  it('should pass handleClose to Plate onClick', () => {
    const handleClose = vi.fn();
    const { container } = render(<PizzaPage handleClose={handleClose} />);

    // Find the plate div and click it
    const plateDiv = container.querySelector('.w-screen.h-screen');
    if (plateDiv) {
      act(() => {
        plateDiv.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      });
    }

    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('should use size of 1800 for both components', () => {
    const { container } = render(<PizzaPage />);

    // Check SVG viewBox for Pizza
    const svgs = container.querySelectorAll('svg');
    const pizzaSvg = Array.from(svgs).find((svg) =>
      svg.querySelector('clipPath')
    );
    expect(pizzaSvg).toHaveAttribute('viewBox', '0 0 1800 1800');
  });

  it('should render with correct z-index layering', () => {
    const { container } = render(<PizzaPage />);

    // Check for absolute positioning on Plate container
    const plateContainer = container.querySelector('.absolute.inset-0');
    expect(plateContainer).toBeInTheDocument();

    // Check for relative z-10 on Pizza container
    const pizzaContainer = container.querySelector('.relative.z-10');
    expect(pizzaContainer).toBeInTheDocument();
  });

  it('should render 8 pizza slices', () => {
    const { container } = render(<PizzaPage />);

    // Check for 8 clip paths (sliceCount default)
    const clipPaths = container.querySelectorAll('clipPath');
    expect(clipPaths.length).toBe(8);

    // Verify clip path IDs
    for (let i = 0; i < 8; i++) {
      const clipPath = container.querySelector(`#slice-${i}`);
      expect(clipPath).toBeInTheDocument();
    }
  });

  it('should work without handleClose prop', () => {
    expect(() => {
      render(<PizzaPage />);
    }).not.toThrow();
  });

  it('should have Plate in background layer', () => {
    const { container } = render(<PizzaPage />);
    const plateContainer = container.querySelector('.absolute.inset-0');
    expect(plateContainer).toHaveClass('absolute');
    expect(plateContainer).toHaveClass('inset-0');
  });

  it('should have Pizza in foreground layer', () => {
    const { container } = render(<PizzaPage />);
    const pizzaContainer = container.querySelector('.relative.z-10');
    expect(pizzaContainer).toHaveClass('relative');
    expect(pizzaContainer).toHaveClass('z-10');
  });
});
