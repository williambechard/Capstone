import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { GlobalSearch } from '../../../components';
import { debug } from 'jest-preview';
import userEvent from '@testing-library/user-event';

describe('GlobalSearch component tests', () => {
  it('should show a search fiedl', async () => {
    let val;
    render(
      <GlobalSearch
        filter={'testInput'}
        setFilter={e => {
          val = e;
        }}
      />
    );
    const textInput = screen.getByRole('textbox');
    expect(textInput).toBeInTheDocument();
    expect(textInput.value).toBe('testInput');

    await userEvent.type(textInput, '2');
    expect(val).toBe('testInput2');

    debug();
  });
  it('should return a filter value of "" ', () => {
    render(<GlobalSearch />);
    const textInput = screen.getByRole('textbox');
    expect(textInput).toBeInTheDocument();
    expect(textInput.value).toBe('');
  });
});
