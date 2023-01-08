import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import AddCategoryForm from '../../../components/AddCategoryForm';

import userEvent from '@testing-library/user-event';
import { useAddCategory } from '../../../api/categories';

jest.mock('../../../api/categories');

describe('AddCategoryForm Component Tests', () => {
  beforeEach(() => {
    jest.resetAllMocks();
    useAddCategory.mockReturnValue({
      addCategory: jest.fn()
    });
  });
  it('should display the default AddCategoryForm', () => {
    render(<AddCategoryForm />);

    const addCategoryFormComponent = screen.getByRole('form');
    expect(addCategoryFormComponent).toBeInTheDocument();
    expect(addCategoryFormComponent).toHaveStyle('width: 100%', 'height: 100%');
  });
  it('should call the onClick function when Cancel Button is pressed', async () => {
    const mockCallBack = jest.fn();

    render(<AddCategoryForm onClick={mockCallBack} />);

    const cancelButton = screen.getByLabelText('closeAddCategoryForm');
    await userEvent.click(cancelButton);

    expect(mockCallBack).toHaveBeenCalledTimes(1);
  });
  it('alerts should display if non valid (blank) input', async () => {
    render(<AddCategoryForm />);

    const submitButton = screen.getByLabelText('submitAddCategoryForm');

    expect(submitButton).toBeInTheDocument();

    await userEvent.click(submitButton);

    expect(await screen.findAllByRole('alert')).toHaveLength(1);
  });
  it('should call addCategory when form is submitted', async () => {
    const addCategoryCallBack = useAddCategory.mockReturnValue({
      addCategory: () => Promise.resolve()
    });

    render(<AddCategoryForm />);

    const title = screen.getByRole('textbox', { name: /Category/i });
    expect(title).toBeInTheDocument();
    await userEvent.type(title, 'Horror');
    expect(title).toHaveValue('Horror');

    const submitButton = screen.getByLabelText('submitAddCategoryForm');
    await userEvent.click(submitButton);

    //loading takes care of 1 call, so the submittal call would be the 2nd
    expect(addCategoryCallBack).toHaveBeenCalledTimes(2);
  });
});
