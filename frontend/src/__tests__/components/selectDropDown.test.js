import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { SelectDropDown } from '../../../components';

describe('selectDropDown component test', () => {
  it('should show a standard select drop down component', () => {
    render(<SelectDropDown register={jest.fn()} />);
    const select = screen.getByRole('combobox');
    expect(select).toBeInTheDocument();
    expect(select).toHaveStyle(
      'color: black',
      'font-size: 1rem',
      'height: 2rem',
      'border-radius: 6px',
      'border: 1px solid grey',
      'padding-left: 0.5rem',
      'width: 100%',
      'box-sizing: border-box'
    );
    const labelHTML = screen.getByText('Label');

    expect(labelHTML).toBeInTheDocument();
    expect(labelHTML).toHaveStyle(`color:black`);
  });

  it('should show a modified select drop down component', () => {
    render(
      <SelectDropDown
        register={jest.fn()}
        labelText={'TestLabel'}
        name={'testName'}
        width={'50%'}
        bgColor={'black'}
        value={'-10'}
        options={[{ id: '1', name: 'n1' }]}
      />
    );
    const select = screen.getByRole('combobox');
    expect(select).toBeInTheDocument();
    expect(select).toHaveStyle(
      'color: black',
      'font-size: 1rem',
      'height: 2rem',
      'border-radius: 6px',
      'border: 1px solid grey',
      'padding-left: 0.5rem',
      'width: 50%',
      'box-sizing: border-box'
    );
    expect(select).toHaveAttribute('name', 'testName');
    expect(select).toHaveAttribute('id', 'testName');
    expect(select).toHaveAttribute('title', 'testName');

    const labelHTML = screen.getByText('TestLabel');

    expect(labelHTML).toBeInTheDocument();
    expect(labelHTML).toHaveStyle(
      'display:inline-block',
      'font-size:1',
      'font-weight:1000',
      'overflow:hidden'
    );

    const label = labelHTML.closest('label');
    expect(label).toBeInTheDocument();
    expect(label).toHaveAttribute('for', 'testName');
    expect(label).toHaveStyle('display:block');

    const option = screen.getAllByRole('option');
    expect(option[0]).toBeInTheDocument();
    expect(option[0]).toHaveAttribute('value', '-1');

    expect(option[1]).toBeInTheDocument();
    expect(option[1]).toHaveAttribute('value', '1');
  });
});
