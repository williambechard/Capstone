import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Toast from '../../../components/Toast/Toast';

describe('Toast component tests', () => {
  it('should render a Default Toast message', () => {
    render(<Toast message={'Hello World'} />);
    const toastComponent = screen.getByText('Hello World');
    expect(toastComponent).toBeInTheDocument();
    expect(toastComponent).toHaveStyle(
      'display: block',
      'flex-direction: row',
      'align-items: center',
      'gap: 0.5rem',
      'padding: 0.5rem 1rem',
      'border-radius: 0.5rem'
    );
  });
  it('should render a Success Toast', () => {
    render(<Toast type={'Success'} />);
    const toastComponent = screen.getByTestId('toast-1');
    expect(toastComponent).toBeInTheDocument();
    expect(toastComponent).toHaveStyle(
      'display: flex',
      'flex-direction: row',
      'align-items: center',
      'gap: 0.5rem',
      'padding: 0.5rem 1rem',
      'border-radius: 0.5rem',
      'background: #d4edda',
      'color: #155724',
      'border: 1px solid #c3e6cb'
    );
  });
  it('should render an Error Toast', () => {
    render(<Toast message={'Hello Wold'} />);
    const toastComponent = screen.getByTestId('toast-1');
    expect(toastComponent).toBeInTheDocument();
    expect(toastComponent).toHaveStyle(
      'display: flex',
      'flex-direction: row',
      'align-items: center',
      'gap: 0.5rem',
      'padding: 0.5rem 1rem',
      'border-radius: 0.5rem',
      'background: #f8d7da',
      'color: #721c24',
      'border: 1px solid #f5c6cb'
    );
  });
});
