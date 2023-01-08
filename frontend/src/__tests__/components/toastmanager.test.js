import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import ToastManager from '../../../components/ToastManager/ToastManager';
import Toast from '../../../components/Toast/Toast';
it('should render a Toast Manager component', () => {
  render(
    <ToastManager>
      <Toast />
    </ToastManager>
  );
});
