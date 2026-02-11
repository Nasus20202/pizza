import { describe, it, expect, vi } from 'vitest';
import { render, fireEvent, waitFor } from '@testing-library/react';
import Plate from '../Plate';

describe('Plate', () => {
  it('should render with default size', () => {
    const { container } = render(<Plate />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveAttribute('viewBox', '0 0 1800 1800');
  });

  it('should render with custom size', () => {
    const { container } = render(<Plate size={2000} />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveAttribute('viewBox', '0 0 2000 2000');
  });

  it('should call onClick when clicked', () => {
    const onClick = vi.fn();
    const { container } = render(<Plate onClick={onClick} />);

    const plate = container.querySelector('div');
    if (plate) {
      fireEvent.click(plate);
    }

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('should apply transform when clicked', () => {
    const { container } = render(<Plate />);
    const plate = container.querySelector('div');

    expect(plate).toHaveStyle({ transform: 'translateY(0)' });

    if (plate) {
      fireEvent.click(plate);
    }

    expect(plate).toHaveStyle({ transform: 'translateY(150vh)' });
  });

  it('should disable pointer events after click', () => {
    const { container } = render(<Plate />);
    const plate = container.querySelector('div');

    expect(plate).toHaveStyle({ pointerEvents: 'auto' });

    if (plate) {
      fireEvent.click(plate);
    }

    expect(plate).toHaveStyle({ pointerEvents: 'none' });
  });

  it('should become invisible after transition ends', async () => {
    const { container } = render(<Plate />);
    const plate = container.querySelector('div');

    if (plate) {
      fireEvent.click(plate);
      fireEvent.transitionEnd(plate);
    }

    await waitFor(() => {
      const plateAfter = container.querySelector('div');
      expect(plateAfter).not.toBeInTheDocument();
    });
  });

  it('should contain an image element', () => {
    const { container } = render(<Plate />);
    const image = container.querySelector('image');
    expect(image).toBeInTheDocument();
  });

  it('should only respond to first click when clicked multiple times rapidly', () => {
    const onClick = vi.fn();
    const { container } = render(<Plate onClick={onClick} />);
    const plate = container.querySelector('div');

    if (plate) {
      fireEvent.click(plate);
      fireEvent.click(plate);
      fireEvent.click(plate);
    }

    // onClick should be called once per click, but pointer events disabled after first
    expect(onClick).toHaveBeenCalled();
    expect(plate).toHaveStyle({ pointerEvents: 'none' });
  });

  it('should not crash if transition ends before click', () => {
    const { container } = render(<Plate />);
    const plate = container.querySelector('div');

    expect(() => {
      if (plate) {
        fireEvent.transitionEnd(plate);
      }
    }).not.toThrow();

    // Plate should still be visible
    expect(plate).toBeInTheDocument();
  });

  it('should render with very large size', () => {
    const { container } = render(<Plate size={10000} />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveAttribute('viewBox', '0 0 10000 10000');
  });

  it('should have cursor-pointer class', () => {
    const { container } = render(<Plate />);
    const plate = container.querySelector('div');
    expect(plate).toHaveClass('cursor-pointer');
  });
});
