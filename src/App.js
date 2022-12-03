import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";
import "./App.css";

const assumedTimeSliceDuration = 5;

function App() {
  const [query, setQuery] = useState('');

  // Render an uncontrolled input whose change events are asynchronous (to simulate being debounced).
  return (
    <>
      <input type="text" data-testid="query-input" defaultValue={query} onChange={event => {
        setTimeout(() => {
          setQuery(event.target.value);
        });
      }} />
      <Counter query={query} />
    </>
  );
}

function Counter({ query }) {
  const [count, setCount] = useState(0);

  // Make this component take the whole time slice to render.
  let startTime = performance.now();
  while (performance.now() - startTime < assumedTimeSliceDuration) { }

  // Increment the count when the button is clicked.
  const onIncrementClick = () => {
    console.log('increment click', query, count);
    setCount((count) => {
      console.log('increment', query, count);
      return count + 1;
    });
  };

  // Reset the count when the query changes.
  useEffect(() => {
    console.log('effect', query);
    setCount(0);
  }, [query]);

  console.log('render', query, count);
  return (
    <>
      <span data-testid="query">{query}</span>
      <span data-testid="count">{count}</span>
      <button data-testid="increment" onClick={onIncrementClick}>Increment</button>
    </>
  );
}

export default App;
