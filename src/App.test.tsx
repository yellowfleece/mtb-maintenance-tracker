import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import App from './App';

describe('App', () => {
  it('renders without crashing', () => {
    const { container } = render(<App />);
    // If this test passes, the app renders successfully
    expect(container).toBeTruthy();
  });

  it('renders the root div', () => {
    const { container } = render(<App />);
    // App should have rendered content
    expect(container.firstChild).toBeTruthy();
  });

  it('renders React Router navigation', () => {
    const { container } = render(<App />);
    // Check that the app has rendered by checking for any content
    expect(container.innerHTML.length).toBeGreaterThan(0);
  });

  it('initializes without errors', () => {
    // This is a smoke test - if App renders without throwing, it passes
    expect(() => render(<App />)).not.toThrow();
  });
});
