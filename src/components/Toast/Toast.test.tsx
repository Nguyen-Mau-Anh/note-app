import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Toast from './Toast';

describe('Toast Component', () => {
  const mockProps = {
    message: 'Test message',
    show: true,
    onClose: jest.fn()
  };

  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
    jest.useRealTimers();
  });

  it('renders toast message when show is true', () => {
    render(<Toast {...mockProps} />);
    expect(screen.getByText('Test message')).toBeInTheDocument();
  });

  it('does not render when show is false', () => {
    render(<Toast {...mockProps} show={false} />);
    expect(screen.queryByText('Test message')).not.toBeInTheDocument();
  });

  it('auto-closes after 3 seconds', () => {
    render(<Toast {...mockProps} />);
    jest.advanceTimersByTime(3000);
    expect(mockProps.onClose).toHaveBeenCalled();
  });
}); 