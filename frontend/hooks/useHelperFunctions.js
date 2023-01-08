import React from 'react';

const useHelperFunctions = () => {
  const compareText = React.useMemo(() => {
    return (rowA, rowB) => {
      let a = rowA.values.name.props?.sort ?? 0;
      let b = rowB.values.name.props?.sort ?? 0;

      if (a > b) return 1;
      if (a < b) return -1;
      return 0;
    };
  }, []);

  return { compareText };
};

export default useHelperFunctions;
