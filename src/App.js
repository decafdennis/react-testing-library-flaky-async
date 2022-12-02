import { useEffect, useLayoutEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  const [cascadedCount, setCascadedCount] = useState(count);
  
  useEffect(() => {
    console.log('effect', count);
    setCascadedCount(count);
  }, [count]);

  console.log('render', count, cascadedCount);
  return (
    <>
      <span data-testid="count">{count}</span>
      <span data-testid="cascaded-count">{cascadedCount}</span>
      <button onClick={() => {
        setTimeout(() => {
          setCount((count) => count + 1)
        });
      }}>Increment</button>
    </>
  );
}

export default App;
