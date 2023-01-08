import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { Table } from '../../../components';

import { debug } from 'jest-preview';

describe('Table component test', () => {
  it('should render a table with the provided data', () => {
    render(
      <Table
        columns={[
          {
            Header: 'Category',
            accessor: 'name' // accessor is the "key" in the data
          },
          {
            Header: 'Number Of Books',
            accessor: 'books.length'
          }
        ]}
        data={[
          {
            books: ['1'],
            id: 1,
            name: 'Fantasy'
          }
        ]}
      />
    );

    const table = screen.getByRole('table');
    expect(table).toBeInTheDocument();
    expect(screen.getByText(/Category/i)).toBeInTheDocument();
    expect(screen.getByText(/Fantasy/i)).toBeInTheDocument();
    expect(screen.getByText(/Number Of Books/i)).toBeInTheDocument();
    expect(screen.getByRole('cell', { name: '1' })).toBeInTheDocument();
    debug();
  });

  it('should have buttons for Prev and Next that should be disabled', () => {
    render(
      <Table
        columns={[
          {
            Header: 'Category',
            accessor: 'name' // accessor is the "key" in the data
          },
          {
            Header: 'Number Of Books',
            accessor: 'books.length'
          }
        ]}
        data={[
          {
            books: ['1'],
            id: 1,
            name: 'Fantasy'
          }
        ]}
      />
    );
    const prevButton = screen.getByRole('button', { name: 'Prev' });
    const nextButton = screen.getByRole('button', { name: 'Next' });
    expect(prevButton).toBeInTheDocument();
    expect(nextButton).toBeInTheDocument();
    expect(prevButton).toHaveAttribute('disabled');
    expect(nextButton).toHaveAttribute('disabled');
    debug();
  });
});
