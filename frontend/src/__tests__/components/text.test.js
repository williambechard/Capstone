import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Text from '../../../components/Text/Text';
import { colors } from '../../../components';
import userEvent from '@testing-library/user-event';
import React from 'react';

describe('Text Component Tests', () => {
  it('should render a default Text component', () => {
    render(<Text>test</Text>);
    const textComponent = screen.getByText('test');
    expect(textComponent).toBeInTheDocument();
    expect(textComponent).toHaveTextContent('test');
    expect(textComponent).toHaveStyle(
      'display: inline-block',
      'font-size: 1rem',
      `@media screen and (min-width: 300px) {
        font-size: 1.5rem;
      }`,
      `@media screen and (min-width: 800px) {
      font-size: 2rem;
      }`,
      'font-weight: bold',
      'font-family: Poppins, serif',
      `background-color:white`,
      `color:black`,
      'font-weight:400',
      'margin:0',
      'overflow:hidden',
      'maxHeight:40vh'
    );
  });
  it('should render a uniquely styled Text component', () => {
    render(
      <Text
        fontWeight={'200'}
        bgColor={colors.mono[1]}
        fColor={colors.mono[0]}
        margin={'10'}
        overflow={'auto'}
        maxHeight={'20vh'}
      >
        test Content
      </Text>
    );
    const textComponent = screen.getByText('test Content');
    expect(textComponent).toBeInTheDocument();
    expect(textComponent).toHaveStyle(
      'font-weight: 200',
      `background-color:#dfdfdf`,
      `color:white`,
      'margin:10',
      'overflow:auto',
      'maxHeight:20vh'
    );
  });
  it('should respond to a user click event', async () => {
    const mockCallBack = jest.fn();

    render(
      <Text
        fontWeight={'200'}
        bgColor={colors.mono[1]}
        fColor={colors.mono[0]}
        margin={'10'}
        overflow={'auto'}
        maxHeight={'20vh'}
        onClick={mockCallBack}
      >
        test Content
      </Text>
    );

    const textComponent = screen.getByText('test Content');
    expect(textComponent).toBeInTheDocument();
    await userEvent.click(textComponent);

    expect(mockCallBack).toHaveBeenCalledTimes(1);
  });
});
