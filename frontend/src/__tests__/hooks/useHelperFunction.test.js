import '@testing-library/jest-dom';
import { renderHook } from '@testing-library/react';
import { hasUncaughtExceptionCaptureCallback } from 'process';
import useHelperFunctions from '../../../hooks/useHelperFunctions';
describe('useHelperFunction hook test', () => {
  it('should sort text alphabetically ', () => {
    const { result } = renderHook(() => useHelperFunctions());

    expect(
      result.current.compareText(
        { values: { name: { props: { sort: 'b' } } } },
        { values: { name: { props: { sort: 'a' } } } }
      )
    ).toBe(1);

    expect(
      result.current.compareText(
        { values: { name: { props: { sort: 'a' } } } },
        { values: { name: { props: { sort: 'b' } } } }
      )
    ).toBe(-1);

    expect(
      result.current.compareText(
        { values: { name: { props: { sort: 'a' } } } },
        { values: { name: { props: { sort: 'a' } } } }
      )
    ).toBe(0);
  });
});
