import React from "react";

export default function useWindowSize() {
  React.useLayoutEffect = React.useEffect;
    const [size, setSize] = React.useState(0);
    React.useLayoutEffect(() => {
      function updateSize() {
        setSize(window.innerWidth);
      }
      window.addEventListener('resize', updateSize);
      updateSize();
      return () => window.removeEventListener('resize', updateSize);
    }, []);
    return size;
  }
  