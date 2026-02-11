import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { render, waitFor } from '@testing-library/react';
import MainPage from '../MainPage';

describe('MainPage', () => {
  let originalTitle: string;

  beforeEach(() => {
    originalTitle = document.title;
  });

  afterEach(() => {
    document.title = originalTitle;
  });

  it('should render without crashing', () => {
    const { container } = render(<MainPage />);
    const mainDiv = container.querySelector('div');
    expect(mainDiv).toBeInTheDocument();
  });

  it('should set document title on mount', () => {
    render(<MainPage />);
    expect(document.title).toBe('Jeżowych Pizzawalentynek!');
  });

  it('should transition to opacity-100 after mounting', async () => {
    const { container } = render(<MainPage />);
    const mainDiv = container.querySelector('div');

    // After mounting and state update, should have opacity-100
    await waitFor(() => {
      expect(mainDiv).toHaveClass('opacity-100');
    });
  });

  it('should render the hedgehog pizza image', () => {
    const { container } = render(<MainPage />);
    const img = container.querySelector('img');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('alt', 'Hedgehog Pizza');
  });

  it('should display correct text content', () => {
    const { container } = render(<MainPage />);
    const texts = container.querySelectorAll('.text-center');
    expect(texts.length).toBe(2);
    expect(texts[0].textContent).toBe('Jeżowych');
    expect(texts[1].textContent).toBe('Pizzawalentynek!');
  });

  it('should have correct styling classes', () => {
    const { container } = render(<MainPage />);
    const mainDiv = container.querySelector('div');
    expect(mainDiv).toHaveClass('absolute');
    expect(mainDiv).toHaveClass('bg-gray-100');
    expect(mainDiv).toHaveClass('rounded-xl');
    expect(mainDiv).toHaveClass('shadow-xl');
    expect(mainDiv).toHaveClass('flex');
    expect(mainDiv).toHaveClass('flex-col');
  });

  it('should have transition duration class', () => {
    const { container } = render(<MainPage />);
    const mainDiv = container.querySelector('div');
    expect(mainDiv).toHaveClass('duration-3000');
    expect(mainDiv).toHaveClass('ease-in-out');
  });

  it('should have indie-flower font class', () => {
    const { container } = render(<MainPage />);
    const mainDiv = container.querySelector('div');
    expect(mainDiv).toHaveClass('indie-flower-regular');
  });

  it('should have pink text color', () => {
    const { container } = render(<MainPage />);
    const mainDiv = container.querySelector('div');
    expect(mainDiv).toHaveClass('text-pink-700');
  });

  it('should be non-selectable', () => {
    const { container } = render(<MainPage />);
    const mainDiv = container.querySelector('div');
    expect(mainDiv).toHaveClass('select-none');
  });

  it('should have responsive text sizing', () => {
    const { container } = render(<MainPage />);
    const mainDiv = container.querySelector('div');
    expect(mainDiv).toHaveClass('text-2xl');
    expect(mainDiv).toHaveClass('sm:text-4xl');
    expect(mainDiv).toHaveClass('md:text-5xl');
    expect(mainDiv).toHaveClass('lg:text-6xl');
    expect(mainDiv).toHaveClass('xl:text-7xl');
  });

  it('should have correct dimensions', () => {
    const { container } = render(<MainPage />);
    const mainDiv = container.querySelector('div');
    expect(mainDiv).toHaveClass('w-3/4');
    expect(mainDiv).toHaveClass('h-3/4');
  });

  it('should render image with responsive classes', () => {
    const { container } = render(<MainPage />);
    const img = container.querySelector('img');
    expect(img).toHaveClass('max-w-full');
    expect(img).toHaveClass('max-h-full');
    expect(img).toHaveClass('object-contain');
    expect(img).toHaveClass('flex-1');
  });
});
