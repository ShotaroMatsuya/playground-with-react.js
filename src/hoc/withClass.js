import React from 'react';
//jsxを返すだけの関数であることに注意(コンポーネントではない)
const withClass = (WrappedComponent, className) => {
  return props => (
    
    <div className={className}>
      <WrappedComponent {...props}/>
      {/* コンポーネントが持っている複数のpropsを継承するにはspread演算子を用いる必要がある */}
    </div>
  );
};

export default withClass;
