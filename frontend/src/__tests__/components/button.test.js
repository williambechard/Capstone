import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from '../../../components';
import { colors } from '../../../components';
import React from 'react';

describe('Button  Component Tests', () => {
  it('should render a default Button component', () => {
    render(<Button />);
    const buttonComponent = screen.getByRole('button');
    expect(buttonComponent).toBeInTheDocument();
    expect(buttonComponent).toHaveStyle(
      'fontWeight:400',
      'fontSize:1',
      `background-color:white`,
      `color:black`,
      `border-color:black`,
      'margin:unset'
    );
  });
  it('should render a Button with a custom label', () => {
    render(<Button label={'button'} />);
    const buttonComponent = screen.getByRole('button');
    expect(buttonComponent).toBeInTheDocument();
  });
  it('should render a Button with a non-default style', () => {
    render(
      <Button
        fontWeight={'900'}
        fontSize={'2'}
        bgColor={colors.mono[1]}
        fColor={colors.mono[2]}
        borderColor={colors.mono[1]}
        margin={'1px'}
      />
    );
    const buttonComponent = screen.getByRole('button');
    expect(buttonComponent).toBeInTheDocument();
    expect(buttonComponent).toHaveStyle(
      'fontWeight:900',
      'fontSize:2',
      `background-color:#dfdfdf`,
      `color:#bfbfbf`,
      `border-color:#dfdfdf`,
      'margin:1px'
    );
  });
  it('should respond to a user click event', async () => {
    const mockCallBack = jest.fn();

    render(<Button onClick={mockCallBack} />);

    const buttonComponent = screen.getByRole('button');
    expect(buttonComponent).toBeInTheDocument();
    await userEvent.click(buttonComponent);

    expect(mockCallBack).toHaveBeenCalledTimes(1);
  });
});
