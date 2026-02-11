import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import Hedgehog from '../Hedgehog';

describe('Hedgehog', () => {
  beforeEach(() => {
    // Reset any window event listeners before each test
  });

  afterEach(() => {
    // Cleanup
  });

  it('should render with default size', () => {
    const { container } = render(<Hedgehog />);
    const img = container.querySelector('img');
    expect(img).toBeInTheDocument();
    expect(img).toHaveStyle({ width: '100px', height: '100px' });
  });

  it('should render with custom size', () => {
    const { container } = render(<Hedgehog size={150} />);
    const img = container.querySelector('img');
    expect(img).toHaveStyle({ width: '150px', height: '150px' });
  });

  it('should start at off-screen position', () => {
    const { container } = render(<Hedgehog size={100} />);
    const img = container.querySelector('img');
    // Initial position is -size, -size, then offset by -size/2, so: -100 - 50 = -150
    expect(img).toHaveStyle({ left: '-150px', top: '-150px' });
  });

  it('should have fixed positioning and pointer-events-none', () => {
    const { container } = render(<Hedgehog />);
    const img = container.querySelector('img');
    expect(img).toHaveClass('fixed');
    expect(img).toHaveClass('pointer-events-none');
    expect(img).toHaveClass('z-100');
  });

  it('should have correct alt text', () => {
    const { container } = render(<Hedgehog />);
    const img = container.querySelector('img');
    expect(img).toHaveAttribute('alt', 'Hedgehog');
  });

  it('should update position on mouse move', () => {
    const { container } = render(<Hedgehog size={100} />);
    const img = container.querySelector('img');

    // Simulate mouse move
    fireEvent.mouseMove(window, { clientX: 200, clientY: 300 });

    // Position should be centered on cursor (clientX - size/2, clientY - size/2)
    expect(img).toHaveStyle({ left: '150px', top: '250px' });
  });

  it('should follow mouse cursor continuously', () => {
    const { container } = render(<Hedgehog size={100} />);
    const img = container.querySelector('img');

    // First mouse move
    fireEvent.mouseMove(window, { clientX: 100, clientY: 100 });
    expect(img).toHaveStyle({ left: '50px', top: '50px' });

    // Second mouse move
    fireEvent.mouseMove(window, { clientX: 400, clientY: 500 });
    expect(img).toHaveStyle({ left: '350px', top: '450px' });
  });

  it('should change image on left mouse button down', () => {
    const { container } = render(<Hedgehog />);
    const img = container.querySelector('img');

    const initialSrc = img?.getAttribute('src');

    // Simulate left mouse button down (button: 0)
    fireEvent.mouseDown(window, { button: 0 });

    const altSrc = img?.getAttribute('src');
    expect(altSrc).not.toBe(initialSrc);
  });

  it('should revert image on left mouse button up', () => {
    const { container } = render(<Hedgehog />);
    const img = container.querySelector('img');

    const initialSrc = img?.getAttribute('src');

    // Mouse down
    fireEvent.mouseDown(window, { button: 0 });
    const altSrc = img?.getAttribute('src');
    expect(altSrc).not.toBe(initialSrc);

    // Mouse up
    fireEvent.mouseUp(window, { button: 0 });
    const finalSrc = img?.getAttribute('src');
    expect(finalSrc).toBe(initialSrc);
  });

  it('should not change image on non-left mouse button', () => {
    const { container } = render(<Hedgehog />);
    const img = container.querySelector('img');

    const initialSrc = img?.getAttribute('src');

    // Simulate right mouse button down (button: 2)
    fireEvent.mouseDown(window, { button: 2 });
    const afterRightClick = img?.getAttribute('src');
    expect(afterRightClick).toBe(initialSrc);

    // Simulate middle mouse button down (button: 1)
    fireEvent.mouseDown(window, { button: 1 });
    const afterMiddleClick = img?.getAttribute('src');
    expect(afterMiddleClick).toBe(initialSrc);
  });

  it('should cleanup event listeners on unmount', () => {
    const { unmount } = render(<Hedgehog />);

    // Get initial listener count by checking if events still fire after unmount
    unmount();

    // After unmount, moving mouse shouldn't cause any errors
    expect(() => {
      fireEvent.mouseMove(window, { clientX: 100, clientY: 100 });
      fireEvent.mouseDown(window, { button: 0 });
      fireEvent.mouseUp(window, { button: 0 });
    }).not.toThrow();
  });

  it('should calculate position offset correctly with different sizes', () => {
    const { container } = render(<Hedgehog size={80} />);
    const img = container.querySelector('img');

    fireEvent.mouseMove(window, { clientX: 200, clientY: 200 });

    // With size 80, offset should be 40 (size/2)
    expect(img).toHaveStyle({ left: '160px', top: '160px' });
  });

  it('should handle rapid mouse movements', () => {
    const { container } = render(<Hedgehog size={100} />);
    const img = container.querySelector('img');

    // Rapid fire mouse moves
    for (let i = 0; i < 10; i++) {
      fireEvent.mouseMove(window, { clientX: i * 10, clientY: i * 10 });
    }

    // Should be at the last position
    expect(img).toHaveStyle({ left: '40px', top: '40px' });
  });

  it('should handle mouse down and up cycles', () => {
    const { container } = render(<Hedgehog />);
    const img = container.querySelector('img');

    const initialSrc = img?.getAttribute('src');

    // Multiple down/up cycles
    for (let i = 0; i < 3; i++) {
      fireEvent.mouseDown(window, { button: 0 });
      const downSrc = img?.getAttribute('src');
      expect(downSrc).not.toBe(initialSrc);

      fireEvent.mouseUp(window, { button: 0 });
      const upSrc = img?.getAttribute('src');
      expect(upSrc).toBe(initialSrc);
    }
  });

  it('should handle zero size gracefully', () => {
    const { container } = render(<Hedgehog size={0} />);
    const img = container.querySelector('img');
    expect(img).toBeInTheDocument();
    expect(img).toHaveStyle({ width: '0px', height: '0px' });
  });

  it('should handle very large size', () => {
    const { container } = render(<Hedgehog size={500} />);
    const img = container.querySelector('img');
    expect(img).toHaveStyle({ width: '500px', height: '500px' });
  });

  it('should position correctly at extreme coordinates', () => {
    const { container } = render(<Hedgehog size={100} />);
    const img = container.querySelector('img');

    // Move to extreme position
    fireEvent.mouseMove(window, { clientX: 10000, clientY: 10000 });

    expect(img).toHaveStyle({ left: '9950px', top: '9950px' });
  });

  it('should position correctly at negative coordinates', () => {
    const { container } = render(<Hedgehog size={100} />);
    const img = container.querySelector('img');

    // Move to negative position
    fireEvent.mouseMove(window, { clientX: -100, clientY: -100 });

    expect(img).toHaveStyle({ left: '-150px', top: '-150px' });
  });

  it('should handle mouse events on same coordinates', () => {
    const { container } = render(<Hedgehog size={100} />);
    const img = container.querySelector('img');

    // Move to same position multiple times
    fireEvent.mouseMove(window, { clientX: 200, clientY: 200 });
    fireEvent.mouseMove(window, { clientX: 200, clientY: 200 });
    fireEvent.mouseMove(window, { clientX: 200, clientY: 200 });

    expect(img).toHaveStyle({ left: '150px', top: '150px' });
  });
});
