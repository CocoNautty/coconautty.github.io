// withScrollspy.js
import React from 'react';
import { useScrollspy } from './ScrollspyContext';

export const withScrollspy = (WrappedComponent, index) => {
  return (props) => {
    const { registerRef } = useScrollspy();
    const ref = React.useRef(null);

    React.useEffect(() => {
      if (ref.current) {
        registerRef(index, ref);
      }
    }, [registerRef]);

    return <WrappedComponent {...props} ref={ref} />;
  };
};
