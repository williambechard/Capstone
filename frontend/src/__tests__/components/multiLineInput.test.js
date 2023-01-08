import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { MultiLineInput } from '../../../components';

describe('Multi Line Text Input Component Tests', () => {
  it('should render a default Multi Line Input component', () => {
    render(<MultiLineInput register={jest.fn()} errors={jest.fn()} />);
    const textInputComponent = screen.getByRole('textbox');
    expect(textInputComponent).toBeInTheDocument();
    expect(textInputComponent).toHaveStyle(
      'width: 100%',
      'resize: none',
      'font-size: 1rem',
      'border-radius: 6px',
      `color: black`,
      `border: 1px solid grey`,
      'padding-left: 0.5rem',
      'box-sizing: border-box'
    );
  });
  it('should have a label that correctly points to its input', () => {
    render(<MultiLineInput register={jest.fn()} errors={jest.fn()} />);

    const labelNode = screen.getByText('Label');
    expect(labelNode).toBeInTheDocument();
    expect(labelNode.closest('label').getAttribute('for')).toBe('test');
    const InputNode = screen.getByRole('textbox');
    expect(InputNode.getAttribute('name')).toBe('test');
  });
  it('should show style with required error', () => {
    const mockError = () => {
      return {
        test: {
          type: 'required'
        }
      };
    };

    render(<MultiLineInput register={jest.fn()} errors={mockError()} />);

    const span = screen.getByText('Label');
    expect(span).toBeInTheDocument();
    expect(span).toHaveStyle('color:red');

    const errorText = screen.getByText('Input is Required');
    expect(errorText).toBeInTheDocument();
    expect(errorText).toHaveStyle('color:red');
    const textInputComponent = screen.getByRole('textbox');
    expect(textInputComponent).toBeInTheDocument();
  });
  it('should show style with maxLength error', () => {
    const mockError = () => {
      return {
        test: {
          type: 'maxLength'
        }
      };
    };

    render(<MultiLineInput register={jest.fn()} errors={mockError()} />);

    const labelComponent = screen.getByText('Label');
    expect(labelComponent).toBeInTheDocument();
    expect(labelComponent).toHaveStyle(`color:red`);
    const errorText = screen.getByText('Max length exceeded');
    expect(errorText).toBeInTheDocument();
    expect(errorText).toHaveStyle(`color:red`);
    const textInputComponent = screen.getByRole('textbox');
    expect(textInputComponent).toBeInTheDocument();
  });
});
