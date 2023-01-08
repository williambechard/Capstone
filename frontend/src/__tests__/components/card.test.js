import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { Card } from '../../../components';
import userEvent from '@testing-library/user-event';

describe('Card Component Tests', () => {
  it('should render a default Card component', () => {
    render(<Card />);
    const cardComponent = screen.getByLabelText('Book Card Moby Dick');
    expect(cardComponent).toBeInTheDocument();
    expect(cardComponent).toHaveStyle(
      'padding: 20px 10px',
      'margin: 10px',
      'background-color: #bfbfbf',
      'width: 100px',
      'height: 150px',
      'box-shadow: 5px 5px 10px #a9a9a9'
    );
  });
  it('should label the Card with Book Card + label correctly', () => {
    render(<Card label={'Of Mice And Men'} />);

    const cardComponent = screen.getByLabelText('Book Card Of Mice And Men');
    expect(cardComponent).toBeInTheDocument();
  });
  it('should respond to a user click event', async () => {
    const mockCallBack = jest.fn();

    render(<Card onClick={mockCallBack} />);

    const cardComponent = screen.getByLabelText('Book Card Moby Dick');

    await userEvent.click(cardComponent);

    expect(mockCallBack).toHaveBeenCalledTimes(1);
  });
});
