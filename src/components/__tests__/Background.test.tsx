import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import Background from '../Background';

describe('Background', () => {
  it('should render without crashing', () => {
    const { container } = render(<Background />);
    const div = container.querySelector('div');
    expect(div).toBeInTheDocument();
  });

  it('should have fixed positioning', () => {
    const { container } = render(<Background />);
    const div = container.querySelector('div');
    expect(div).toHaveClass('fixed');
  });

  it('should cover full screen', () => {
    const { container } = render(<Background />);
    const div = container.querySelector('div');
    expect(div).toHaveClass('w-full');
    expect(div).toHaveClass('h-full');
  });

  it('should be positioned at top-left', () => {
    const { container } = render(<Background />);
    const div = container.querySelector('div');
    expect(div).toHaveClass('top-0');
    expect(div).toHaveClass('left-0');
  });

  it('should have gradient background classes', () => {
    const { container } = render(<Background />);
    const div = container.querySelector('div');
    expect(div).toHaveClass('bg-linear-to-br');
    expect(div).toHaveClass('from-cyan-400');
    expect(div).toHaveClass('to-pink-400');
  });

  it('should have negative z-index', () => {
    const { container } = render(<Background />);
    const div = container.querySelector('div');
    expect(div).toHaveClass('-z-100');
  });
});
