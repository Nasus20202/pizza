import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, fireEvent, act } from '@testing-library/react';
import App from '../App';

describe('App', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.useRealTimers();
  });

  it('should render without crashing', () => {
    const { container } = render(<App />);
    expect(container).toBeInTheDocument();
  });

  it('should render Background component', () => {
    const { container } = render(<App />);
    const background = container.querySelector(
      '.bg-linear-to-br.from-cyan-400.to-pink-400'
    );
    expect(background).toBeInTheDocument();
  });

  it('should render Hedgehog component', () => {
    const { container } = render(<App />);
    const hedgehog = container.querySelector('img[alt="Hedgehog"]');
    expect(hedgehog).toBeInTheDocument();
  });

  it('should render PizzaPage component', () => {
    const { container } = render(<App />);
    // Check for Pizza clip paths
    const clipPaths = container.querySelectorAll('clipPath');
    expect(clipPaths.length).toBe(8);
  });

  it('should not render MainPage initially', () => {
    const { container } = render(<App />);
    const mainPageText = container.querySelector('.indie-flower-regular');
    expect(mainPageText).not.toBeInTheDocument();
  });

  it('should have cursor-none class on main container', () => {
    const { container } = render(<App />);
    const mainDiv = container.querySelector('.cursor-none');
    expect(mainDiv).toBeInTheDocument();
    expect(mainDiv).toHaveClass('relative');
    expect(mainDiv).toHaveClass('min-h-screen');
  });

  it('should center content with flex', () => {
    const { container } = render(<App />);
    const mainDiv = container.querySelector('div');
    expect(mainDiv).toHaveClass('flex');
    expect(mainDiv).toHaveClass('items-center');
    expect(mainDiv).toHaveClass('justify-center');
  });

  it('should show MainPage after clicking Plate', () => {
    const { container } = render(<App />);

    // Initially MainPage should not be visible
    let mainPageText = container.querySelector('.indie-flower-regular');
    expect(mainPageText).not.toBeInTheDocument();

    // Find and click the plate
    const plateDiv = container.querySelector('.w-screen.h-screen');
    if (plateDiv) {
      fireEvent.click(plateDiv);
    }

    // MainPage should now be visible
    mainPageText = container.querySelector('.indie-flower-regular');
    expect(mainPageText).toBeInTheDocument();
  });

  it('should render all layers in correct order', () => {
    const { container } = render(<App />);
    const divs = container.querySelectorAll('div');

    // Background should be fixed
    const background = container.querySelector('.fixed');
    expect(background).toBeInTheDocument();

    // Main container should be relative
    const mainContainer = divs[0];
    expect(mainContainer).toHaveClass('relative');
  });

  it('should handle plate click and show main page', () => {
    const { container } = render(<App />);

    // Click the plate
    const plateDiv = container.querySelector('.w-screen.h-screen');
    expect(plateDiv).toBeInTheDocument();

    act(() => {
      if (plateDiv) {
        fireEvent.click(plateDiv);
      }
    });

    // Check that MainPage appears
    const mainPageContainer = container.querySelector('.indie-flower-regular');
    expect(mainPageContainer).toBeInTheDocument();
    expect(mainPageContainer?.textContent).toContain('Jeżowych');
    expect(mainPageContainer?.textContent).toContain('Pizzawalentynek!');
  });

  it('should have hedgehog cursor following enabled', () => {
    const { container } = render(<App />);
    const hedgehog = container.querySelector('img[alt="Hedgehog"]');

    expect(hedgehog).toBeInTheDocument();
    expect(hedgehog).toHaveClass('fixed');
    expect(hedgehog).toHaveClass('pointer-events-none');
  });

  it('should maintain state after showing MainPage', () => {
    const { container } = render(<App />);

    // Click to show MainPage
    const plateDiv = container.querySelector('.w-screen.h-screen');
    if (plateDiv) {
      fireEvent.click(plateDiv);
    }

    // Both PizzaPage and MainPage should be present
    const clipPaths = container.querySelectorAll('clipPath');
    expect(clipPaths.length).toBe(8); // PizzaPage still rendered

    const mainPage = container.querySelector('.indie-flower-regular');
    expect(mainPage).toBeInTheDocument(); // MainPage also rendered
  });

  it('should render components in correct DOM order', () => {
    const { container } = render(<App />);
    const mainDiv = container.querySelector('div');

    // Background should be one of the first children
    const background = mainDiv?.querySelector('.bg-linear-to-br');
    expect(background).toBeInTheDocument();

    // Hedgehog should be present
    const hedgehog = mainDiv?.querySelector('img[alt="Hedgehog"]');
    expect(hedgehog).toBeInTheDocument();
  });
});
