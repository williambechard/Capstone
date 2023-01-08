import React from 'react';
import styled from '@emotion/styled';
import { useGlobalFilter, usePagination, useTable } from 'react-table';
import { useSortBy } from 'react-table';
import { Button } from '../index';
import GlobalSearch from '../GlobalSearch/GlobalSearch';
import { ContinuousDeployment } from '@carbon/icons-react';

const Styles = styled.div`
  padding: 2rem;

  table {
    table-layout: fixed;
    width: 100%;
    border-collapse: collapse;

    font-size: 0.9em;
    font-family: sans-serif;

    box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
    thead tr {
      background-color: #009879;
      color: #ffffff;
      text-align: left;
    }

    th,
    td {
      padding: 12px 15px;
      overflow-y: auto;
      overflow-x: hidden;
    }

    tbody tr {
      border-bottom: thin solid #dddddd;
      max-height: 220px;
    }
    tbody td {
      overflow: hidden;
    }
    tbody tr:nth-of-type(even) {
      background-color: #f3f3f3;
    }
  }
`;

const Table = ({ columns, data }) => {
  const tableInstance = useTable(
    {
      columns,
      data,
      disableSortRemove: true,
      defaultCanSort: true,
      initialState: {
        sortBy: [{ id: columns[0].accessor, desc: true }]
      }
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    prepareRow,
    pageOptions,
    state,
    setGlobalFilter,
    rows,
    preGlobalFilteredRows
  } = tableInstance;

  const { globalFilter, pageIndex } = state;

  return (
    <>
      <Styles>
        <div style={{ float: 'right', marginBottom: '10px' }}>
          <GlobalSearch filter={globalFilter} setFilter={setGlobalFilter} />
        </div>
        <table {...getTableProps()}>
          <thead>
            {
              // Loop over the header rows
              headerGroups.map(headerGroup => (
                // Apply the header row props
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {
                    // Loop over the headers in each row
                    headerGroup.headers.map(column => (
                      // Apply the header cell props
                      <th
                        {...column.getHeaderProps(
                          column.getSortByToggleProps()
                        )}
                      >
                        {
                          // Render the header
                          column.render('Header')
                        }
                        <span>
                          {column.isSorted
                            ? column.isSortedDesc
                              ? ' 🔽'
                              : ' 🔼'
                            : ''}
                        </span>
                      </th>
                    ))
                  }
                </tr>
              ))
            }
          </thead>
          {/* Apply the table body props */}
          <tbody {...getTableBodyProps()}>
            {
              // Loop over the table rows
              page.map(row => {
                // Prepare the row for display
                prepareRow(row);
                return (
                  // Apply the row props
                  <tr {...row.getRowProps()}>
                    {
                      // Loop over the rows cells
                      row.cells.map(cell => {
                        // Apply the cell props
                        return (
                          <td {...cell.getCellProps()}>
                            {
                              // Render the cell contents
                              cell.render('Cell')
                            }
                          </td>
                        );
                      })
                    }
                  </tr>
                );
              })
            }
          </tbody>
        </table>
        <div style={{ float: 'right' }}>
          <span>
            Page{' '}
            <strong>
              {pageIndex + 1} of {pageOptions.length}{' '}
            </strong>{' '}
          </span>
          <Button
            label={'Prev'}
            onClick={() => previousPage}
            padding={'5px'}
            disabled={!canPreviousPage}
          >
            Prev
          </Button>
          <Button
            label={'Next'}
            onClick={() => nextPage}
            margin={'5px 0px 5px 5px'}
            disabled={!canNextPage}
          >
            Next
          </Button>
        </div>
      </Styles>
    </>
  );
};
export default Table;
