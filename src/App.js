import { useEffect, useLayoutEffect, useRef, useState } from "react";
import "./App.css";

const assumedTimeSliceDuration = 5;

function App() {
  const [count, setCount] = useState(0);
  const [cascadedCount, setCascadedCount] = useState(count);

  // Make this component take the whole time slice to render.
  let startTime = performance.now();
  while (performance.now() - startTime < assumedTimeSliceDuration) {}
  
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
          setCount((count) => {
            console.log('increment', count);
            return count + 1;
          })
        }, 20);
      }}>Increment</button>
    </>
  );
}

export default App;
